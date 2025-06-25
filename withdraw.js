function requestWithdraw() {
  const wallet = document.getElementById("wallet").value.trim();
  const amount = parseInt(document.getElementById("amount").value.trim());
  let balance = parseInt(localStorage.getItem("user_balance") || "0");

  if (!wallet || isNaN(amount)) {
    document.getElementById("result").innerText = "❌ Fill all fields.";
    return;
  }

  if (amount < 100) {
    document.getElementById("result").innerText = "❌ Minimum is 100 tokens.";
    return;
  }

  if (amount > balance) {
    document.getElementById("result").innerText = "❌ Not enough balance.";
    return;
  }

  // Simulate withdraw request (You should send it to admin/DB in real app)
  const history = JSON.parse(localStorage.getItem("withdrawals") || "[]");
  history.push({ wallet: wallet, amount: amount, date: new Date().toLocaleString() });
  localStorage.setItem("withdrawals", JSON.stringify(history));

  // Deduct balance
  balance -= amount;
  localStorage.setItem("user_balance", balance.toString());
  document.getElementById("bal").innerText = balance;
  document.getElementById("result").innerText = "✅ Request Submitted! Wait for admin approval.";
}

function goBack() {
  window.location.href = "dashboard.html";
}

window.onload = () => {
  const balance = parseInt(localStorage.getItem("user_balance") || "0");
  document.getElementById("bal").innerText = balance;
};
