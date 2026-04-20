import {
  getDoc,
  updateDoc,
  collection,
  addDoc,
  doc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

let currentUser = null;

// LOGIN UPDATE
window.login = async function () {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);

  const user = result.user;
  currentUser = user;

  document.getElementById("dashboard").style.display = "block";
  document.getElementById("userInfo").innerText = user.email;

  const userRef = doc(db, "users", user.uid);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) {
    await setDoc(userRef, {
      email: user.email,
      balance: 500 // TEST balance
    });
  }

  loadBalance();
};

// LOAD BALANCE
async function loadBalance() {
  const userRef = doc(db, "users", currentUser.uid);
  const data = await getDoc(userRef);

  document.getElementById("balance").innerText = data.data().balance;
}

// PLACE ORDER
window.placeOrder = async function () {
  const servicePrice = document.getElementById("service").value;
  const qty = document.getElementById("qty").value;
  const link = document.getElementById("link").value;

  const cost = (qty / 1000) * servicePrice;

  const userRef = doc(db, "users", currentUser.uid);
  const userSnap = await getDoc(userRef);

  let balance = userSnap.data().balance;

  if (balance < cost) {
    alert("Not enough balance");
    return;
  }

  // Deduct balance
  await updateDoc(userRef, {
    balance: balance - cost
  });

  // Save order
  await addDoc(collection(db, "orders"), {
    userId: currentUser.uid,
    service: servicePrice,
    link: link,
    qty: qty,
    status: "Pending"
  });

  alert("Order Placed!");

  loadBalance();
};
