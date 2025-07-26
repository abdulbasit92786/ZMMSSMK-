// File: nft.js

// ✅ 1. Firebase Config (Update this with your real config)
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  databaseURL: "https://YOUR_PROJECT.firebaseio.com",
  projectId: "YOUR_PROJECT",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "123456789",
  appId: "APP_ID"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// ✅ 2. Current User ID (replace this with Telegram UserID or logic)
const userId = "12345678"; // Replace dynamically

// ✅ 3. Plans Configuration
const plans = [
  { name: "Free", type: "USDT", price: 0, duration: 9999 },
  { name: "Basic", type: "USDT", price: 10, duration: 30 },
  { name: "Silver", type: "USDT", price: 25, duration: 30 },
  { name: "Gold", type: "USDT", price: 50, duration: 30 },
  { name: "Diamond", type: "USDT", price: 100, duration: 30 },
  { name: "Lifetime", type: "USDT", price: 500, duration: 99999 },
  { name: "ZMM Basic", type: "ZMM", price: 1000, duration: 30 },
  { name: "ZMM Gold", type: "ZMM", price: 3000, duration: 30 },
];

// ✅ 4. Load Wallet Balances
function loadWallet() {
  db.ref(`users/${userId}/nftData`).once('value').then(snapshot => {
    const data = snapshot.val() || {};
    document.getElementById("usdtBalance").innerText = data.usdtBalance ?? 0;
    document.getElementById("zmmBalance").innerText = data.zmmBalance ?? 0;
  });
}

// ✅ 5. Load Plans
function loadPlans() {
  db.ref(`users/${userId}/nftData/activePlan`).once('value').then(snap => {
    const activePlan = snap.val();
    const now = Date.now();
    const plansHTML = plans.map(plan => {
      const isActive = activePlan?.name === plan.name && activePlan?.status === "active";
      const expired = activePlan?.startDate && (now > activePlan.startDate + plan.duration * 86400000);
      const remainingDays = Math.max(0, Math.ceil(((activePlan?.startDate + plan.duration * 86400000) - now) / 86400000));

      if (isActive && !expired) {
        return `
          <div class="plan-card">
            <h3>${plan.name} (${plan.type})</h3>
            <p>⏳ ${remainingDays} days remaining</p>
            <button onclick="cancelPlan('${plan.name}')">Cancel</button>
          </div>
        `;
      } else {
        return `
          <div class="plan-card">
            <h3>${plan.name} (${plan.type})</h3>
            <p>💵 Price: ${plan.price}</p>
            <button onclick="buyPlan('${plan.name}')">Buy</button>
          </div>
        `;
      }
    }).join('');

    document.getElementById("plansContainer").innerHTML = plansHTML;
  });
}

// ✅ 6. Buy Plan
function buyPlan(planName) {
  const plan = plans.find(p => p.name === planName);
  db.ref(`users/${userId}/nftData`).once('value').then(snap => {
    const user = snap.val() || {};
    const balance = plan.type === "USDT" ? (user.usdtBalance ?? 0) : (user.zmmBalance ?? 0);

    if (balance >= plan.price) {
      const newBalance = balance - plan.price;
      const updates = {
        [`nftData/${plan.type === "USDT" ? 'usdtBalance' : 'zmmBalance'}`]: newBalance,
        [`nftData/activePlan`]: {
          type: plan.type,
          name: plan.name,
          price: plan.price,
          startDate: Date.now(),
          durationDays: plan.duration,
          status: "active"
        }
      };
      db.ref(`users/${userId}`).update(updates).then(() => {
        alert(`✅ ${plan.name} Plan Activated`);
        loadWallet();
        loadPlans();
      });
    } else {
      alert("❌ Insufficient Balance");
    }
  });
}

// ✅ 7. Cancel Plan
function cancelPlan(planName) {
  const confirmCancel = confirm("❗ Are you sure to cancel this plan?");
  if (!confirmCancel) return;

  db.ref(`users/${userId}/nftData/activePlan`).update({
    status: "cancelled"
  }).then(() => {
    alert("🚫 Plan Cancelled");
    loadPlans();
  });
}

// ✅ 8. Initial Calls
loadWallet();
loadPlans();
