function submitWithdraw() {
  const wallet = document.getElementById("walletAddress").value;
  const amount = parseFloat(document.getElementById("withdrawAmount").value);

  if (!wallet || isNaN(amount) || amount <= 0) {
    alert("❌ Please enter a valid wallet and amount.");
    return;
  }

  alert(`✅ Withdrawal of ${amount} ZMM to ${wallet} requested!`);
}
