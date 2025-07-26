// ✅ Replace with your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyD***************",
  authDomain: "your-app.firebaseapp.com",
  databaseURL: "https://your-app.firebaseio.com",
  projectId: "your-app",
  storageBucket: "your-app.appspot.com",
  messagingSenderId: "********",
  appId: "1:********:web:********"
};

// ✅ Initialize Firebase
firebase.initializeApp(firebaseConfig);

// ✅ Set user ID (random or from Telegram login)
const userId = localStorage.getItem("wallet_user_id") || "user_" + Date.now();
localStorage.setItem("wallet_user_id", userId);

// ✅ Reference to user's wallet
const userRef = firebase.database().ref("wallets/" + userId);

// ✅ Default values
const ZMM_PRICE = 0.05;

function updateWalletUI(data) {
  document.getElementById("usdt-balance").innerText = `$${data.usdt.toFixed(2)}`;
  document.getElementById("zmm-balance").innerText = `${data.zmm.toFixed(2)} Tokens`;
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

function performSwap() {
  const direction = document.getElementById("swap-direction").value;
  const amount = parseFloat(document.getElementById("swap-amount").value);

  if (isNaN(amount) || amount <= 0) {
    alert("❌ Enter valid amount.");
    return;
  }

  userRef.once("value").then((snapshot) => {
    let wallet = snapshot.val() || {
      usdt: 0,
      zmm: 0,
      history: [],
      withdrawnToday: 0,
      lastWithdrawDate: new Date().toDateString()
    };

    if (direction === "zmm-to-usdt") {
      if (wallet.zmm < amount) {
        alert("❌ Not enough ZMM.");
        return;
      }
      const usdtAmount = amount * ZMM_PRICE;
      wallet.zmm -= amount;
      wallet.usdt += usdtAmount;

      wallet.history.push({
        type: "swap",
        from: "ZMM",
        to: "USDT",
        amount,
        result: usdtAmount,
        date: new Date().toLocaleString()
      });

    } else {
      if (wallet.usdt < amount) {
        alert("❌ Not enough USDT.");
        return;
      }
      const zmmAmount = amount / ZMM_PRICE;
      wallet.usdt -= amount;
      wallet.zmm += zmmAmount;

      wallet.history.push({
        type: "swap",
        from: "USDT",
        to: "ZMM",
        amount,
        result: zmmAmount,
        date: new Date().toLocaleString()
      });
    }

    userRef.set(wallet).then(() => {
      updateWalletUI(wallet);
      updateSwapPreview();
      alert("✅ Swap Successful!");
    });
  });
}

// ✅ Sync when page loads
document.addEventListener("DOMContentLoaded", () => {
  userRef.once("value").then((snapshot) => {
    let wallet = snapshot.val();
    if (!wallet) {
      wallet = {
        usdt: 0,
        zmm: 0,
        history: [],
        withdrawnToday: 0,
        lastWithdrawDate: new Date().toDateString()
      };
      userRef.set(wallet);
    }
    updateWalletUI(wallet);
    updateSwapPreview();
  });

  document.getElementById("swap-direction").addEventListener("change", updateSwapPreview);
  document.getElementById("swap-amount").addEventListener("input", updateSwapPreview);
});
