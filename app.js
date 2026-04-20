import { auth, db } from "./firebase.js";

import {
  GoogleAuthProvider,
  signInWithPopup
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import {
  doc,
  setDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// LOGIN
window.login = async function () {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);

    const user = result.user;

    // Show dashboard
    document.getElementById("dashboard").style.display = "block";

    document.getElementById("userInfo").innerText =
      "Welcome: " + user.email;

    // Save user
    await setDoc(doc(db, "users", user.uid), {
      email: user.email,
      balance: 0
    });

  } catch (err) {
    alert("Login Failed");
    console.log(err);
  }
};