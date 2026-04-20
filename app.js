let balance = Number(localStorage.getItem("balance")) || 1000;
let orders = JSON.parse(localStorage.getItem("orders")) || [];

function saveData() {
  localStorage.setItem("balance", balance);
  localStorage.setItem("orders", JSON.stringify(orders));
}

function showPage(id) {
  document.querySelectorAll(".page").forEach(p => p.style.display = "none");
  document.getElementById(id).style.display = "block";
}

function loadUI() {
  document.getElementById("balance").innerText = balance;
  document.getElementById("totalOrders").innerText = orders.length;

  let html = "";
  orders.forEach((o, i) => {
    html += `
      <tr>
        <td>${i+1}</td>
        <td>${o.service}</td>
        <td>${o.qty}</td>
        <td>${o.status}</td>
      </tr>
    `;
  });

  document.getElementById("ordersTable").innerHTML = html;
}

window.onload = function () {
  showPage("dashboard");
  loadUI();
};

// ORDER
function placeOrder() {
  const service = Number(document.getElementById("service").value);
  const qty = Number(document.getElementById("qty").value);
  const link = document.getElementById("link").value;

  if (!qty || !link) {
    alert("Fill all fields");
    return;
  }

  const cost = (qty / 1000) * service;

  if (balance < cost) {
    alert("Low balance");
    return;
  }

  balance -= cost;

  orders.push({
    service,
    qty,
    status: "Pending"
  });

  saveData();
  loadUI();

  alert("Order placed!");
}

// QR
function generateQR() {
  const amount = Number(document.getElementById("amount").value);

  if (!amount) {
    alert("Enter amount");
    return;
  }

  const canvas = document.getElementById("qr");
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const upi = `upi://pay?pa=yourupi@bank&pn=GrowUpSMM&am=${amount}&cu=INR`;

  QRCode.toCanvas(canvas, upi, function (err) {
    if (err) {
      alert("QR Error");
      console.error(err);
    }
  });
}
