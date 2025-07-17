let userWallet = JSON.parse(localStorage.getItem("walletData")) || {
  usdt: 0,
  zmm: 0,
  history: [],
  withdrawnToday: 0,
  lastWithdrawDate: new Date().toDateString()
};

const ZMM_PRICE = 0.1; // 1 ZMM = 0.1 USDT

function updateWalletUI() {
  document.getElementById("usdt-balance").innerText = `$${userWallet.usdt.toFixed(2)}`;
  document.getElementById("zmm-balance").innerText = `${userWallet.zmm} Tokens`;

  const historyList = document.getElementById("withdraw-history");
  historyList.innerHTML = userWallet.history.length === 0 ? "<li>No history yet.</li>" : "";

  userWallet.history.forEach((item) => {
    const li = document.createElement("li");
    li.innerText = `Withdraw ${item.amount} USDT → ${item.status}`;
    historyList.appendChild(li);
  });
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
  alert("✅ Swap Successful!");
}

function withdrawFunds() {
  const addr = document.getElementById("withdraw-address").value.trim();
  const amt = parseFloat(document.getElementById("withdraw-amount").value);

  if (!addr || isNaN(amt) || amt <= 0) {
    alert("❌ Invalid input.");
    return;
  }

  // Check minimum
  if (amt < 10) {
    alert("❌ Minimum withdraw is $10.");
    return;
  }

  // Check max daily
  const today = new Date().toDateString();
  if (userWallet.lastWithdrawDate !== today) {
    userWallet.withdrawnToday = 0;
    userWallet.lastWithdrawDate = today;
  }

  if ((userWallet.withdrawnToday + amt) > 25) {
    alert("❌ Daily withdraw limit is $25.");
    return;
  }

  if (userWallet.usdt < amt) {
    alert("❌ Not enough USDT.");
    return;
  }

  userWallet.usdt -= amt;
  userWallet.withdrawnToday += amt;

  userWallet.history.push({
    amount: amt,
    address: addr,
    status: "Pending"
  });

  localStorage.setItem("walletData", JSON.stringify(userWallet));
  updateWalletUI();

  alert(`✅ Withdraw Request Sent.\nAddress: ${addr}\nAmount: $${amt}`);
}

document.addEventListener("DOMContentLoaded", updateWalletUI);
