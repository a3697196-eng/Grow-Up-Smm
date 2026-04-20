let balance = localStorage.getItem("balance") || 1000;
let orders = JSON.parse(localStorage.getItem("orders")) || [];

function saveData() {
  localStorage.setItem("balance", balance);
  localStorage.setItem("orders", JSON.stringify(orders));
}

function showPage(id) {
  document.querySelectorAll(".page").forEach(p => p.style.display = "none");
  document.getElementById(id).style.display = "block";
}

// INIT
function loadUI() {
  document.getElementById("balance").innerText = balance;
  document.getElementById("totalOrders").innerText = orders.length;

  let html = "";
  orders.forEach((o, i) => {
    html += `<tr>
      <td>${i+1}</td>
      <td>${o.service}</td>
      <td>${o.qty}</td>
      <td>${o.status}</td>
    </tr>`;
  });

  document.getElementById("ordersTable").innerHTML = html;
}

showPage("dashboard");
loadUI();

// ORDER
function placeOrder() {
  const service = document.getElementById("service").value;
  const qty = document.getElementById("qty").value;

  const cost = (qty / 1000) * service;

  if (balance < cost) {
    alert("Low balance");
    return;
  }

  balance -= cost;

  orders.push({
    service: service,
    qty: qty,
    status: "Pending"
  });

  saveData();
  loadUI();

  alert("Order placed!");
}

// QR
function generateQR() {
  const amount = document.getElementById("amount").value;
  const upi = `upi://pay?pa=yourupi@bank&pn=GrowUpSMM&am=${amount}&cu=INR`;

  QRCode.toCanvas(document.getElementById("qr"), upi);
}
