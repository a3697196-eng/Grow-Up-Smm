let balance = 1000;

function updateBalance() {
  document.getElementById("balance").innerText = balance;
}

// ORDER SYSTEM
function placeOrder() {
  const service = document.getElementById("service").value;
  const qty = document.getElementById("qty").value;
  const link = document.getElementById("link").value;

  if (!qty || !link) {
    alert("Fill all fields");
    return;
  }

  const cost = (qty / 1000) * service;

  if (balance < cost) {
    alert("Not enough balance");
    return;
  }

  balance -= cost;
  updateBalance();

  const li = document.createElement("li");
  li.innerText = `Order: ${qty} - Status: Pending`;

  document.getElementById("orders").appendChild(li);
}

// QR SYSTEM
function generateQR() {
  const amount = document.getElementById("amount").value;

  if (!amount) {
    alert("Enter amount");
    return;
  }

  const upi = `upi://pay?pa=yourupi@bank&pn=GrowUpSMM&am=${amount}&cu=INR`;

  QRCode.toCanvas(document.getElementById("qr"), upi);
}

updateBalance();
