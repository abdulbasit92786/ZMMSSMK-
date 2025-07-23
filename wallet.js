let userWallet = JSON.parse(localStorage.getItem("walletData")) || {
  usdt: 0,
  zmm: 0,
  history: [],
  withdrawnToday: 0,
  lastWithdrawDate: new Date().toDateString()
};

const ZMM_PRICE = 0.05; // ✅ 1 ZMM = $0.05

function updateWalletUI() {
  document.getElementById("usdt-balance").innerText = `$${userWallet.usdt.toFixed(2)}`;
  document.getElementById("zmm-balance").innerText = `${userWallet.zmm} Tokens`;
}

function performSwap() {
  const direction = document.getElementById("swap-direction").value;
  const amount = parseFloat(document.getElementById("swap-amount").value);

  if (isNaN(amount) || amount <= 0) {
    alert("❌ Enter valid amount.");
    return;
  }

  if (direction === "zmm-to-usdt") {
    if (userWallet.zmm < amount) {
      alert("❌ Not enough ZMM.");
      return;
    }
    const usdtAmount = amount * ZMM_PRICE;
    userWallet.zmm -= amount;
    userWallet.usdt += usdtAmount;
  } else {
    if (userWallet.usdt < amount) {
      alert("❌ Not enough USDT.");
      return;
    }
    const zmmAmount = amount / ZMM_PRICE;
    userWallet.usdt -= amount;
    userWallet.zmm += zmmAmount;
  }

  localStorage.setItem("walletData", JSON.stringify(userWallet));
  updateWalletUI();
  updateSwapPreview(); // ✅ Recalculate after swap
  alert("✅ Swap Successful!");
}

function updateSwapPreview() {
  const direction = document.getElementById("swap-direction").value;
  const amount = parseFloat(document.getElementById("swap-amount").value);

  let result = "-";
  if (!isNaN(amount) && amount > 0) {
    if (direction === "zmm-to-usdt") {
      result = `$${(amount * ZMM_PRICE).toFixed(2)}`;
    } else {
      result = `${(amount / ZMM_PRICE).toFixed(2)} Tokens`;
    }
  }
  document.getElementById("calculated-output").innerText = `You will receive: ${result}`;
}

document.getElementById("swap-direction").addEventListener("change", updateSwapPreview);
document.getElementById("swap-amount").addEventListener("input", updateSwapPreview);

document.addEventListener("DOMContentLoaded", () => {
  updateWalletUI();
  updateSwapPreview();
});
