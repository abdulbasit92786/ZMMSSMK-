// ✅ Firebase initialize
const firebaseConfig = {
  apiKey: "AIzaSyBN4LbA8udE4POVTR-XlZgpHQOvuNcSMI4",
  authDomain: "zmmssmk.firebaseapp.com",
  databaseURL: "https://zmmssmk-default-rtdb.firebaseio.com",
  projectId: "zmmssmk",
  storageBucket: "zmmssmk.appspot.com",
  messagingSenderId: "677420760492",
  appId: "1:677420760492:web:2c27c0f0ed6490b8dfce09"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// ✅ User ID (from localStorage set in start/main)
const userId = localStorage.getItem("telegram_user_id") || "guest_user";

// ✅ Available NFT Plans
const nftPlans = {
  free: { name: "Free Plan", price: 0, tokenEvery4h: 0.5, tokenPerAd: 1, duration: Infinity },
  plan10: { name: "$10 Plan", price: 10, tokenEvery4h: 2, tokenPerAd: 2, duration: 30 },
  plan25: { name: "$25 Plan", price: 25, tokenEvery4h: 4, tokenPerAd: 4, duration: 30 },
  plan50: { name: "$50 Plan", price: 50, tokenEvery4h: 8, tokenPerAd: 6, duration: 30 },
  plan100: { name: "$100 Plan", price: 100, tokenEvery4h: 16, tokenPerAd: 12, duration: 30 },
  plan500: { name: "$500 Lifetime Plan", price: 500, tokenEvery4h: 20, tokenPerAd: 24, duration: Infinity }
};

// ✅ اپ ڈیٹ کرنٹ پلان ویو
function updateCurrentPlanView() {
  db.ref(`users/${userId}/nftData`).once("value").then(snapshot => {
    const data = snapshot.val() || {
      walletBalance: 0,
      currentPlan: "free",
      planStart: null,
      totalTokens: 0
    };

    const plan = nftPlans[data.currentPlan];
    const planText = `${plan.name} — ${plan.duration === Infinity ? "Lifetime Plan" : plan.duration + " days"}\nStarted: ${data.planStart ? new Date(data.planStart).toLocaleDateString() : "N/A"}`;

    document.getElementById("current-plan").innerText = planText;
    document.getElementById("wallet-balance").innerText = data.walletBalance.toFixed(2);
  });
}

// ✅ پلان خریدنے کا فنکشن
function buyPlan(planKey) {
  const selectedPlan = nftPlans[planKey];

  const ref = db.ref(`users/${userId}/nftData`);
  ref.once("value").then(snapshot => {
    const data = snapshot.val() || {
      walletBalance: 0,
      currentPlan: "free",
      planStart: null,
      totalTokens: 0
    };

    if (data.currentPlan === "plan500") {
      alert("❌ Lifetime plan already active. Cannot buy new plans.");
      return;
    }

    if (data.walletBalance < selectedPlan.price) {
      alert("❌ Insufficient balance. Please add more funds.");
      return;
    }

    if (data.currentPlan !== "free") {
      const confirmReplace = confirm(`⚠️ You already have a plan. It will be replaced. Continue?`);
      if (!confirmReplace) return;
    }

    // ✅ اپ ڈیٹ ڈیٹا
    const updates = {
      walletBalance: data.walletBalance - selectedPlan.price,
      currentPlan: planKey,
      planStart: Date.now()
    };

    ref.update(updates).then(() => {
      alert(`✅ ${selectedPlan.name} activated successfully!`);
      updateCurrentPlanView();
    });
  });
}

// ✅ ڈمی فنڈز ایڈ کریں (Testing Only)
function addDummyFunds() {
  const ref = db.ref(`users/${userId}/nftData`);
  ref.child("walletBalance").once("value").then(snapshot => {
    const balance = parseFloat(snapshot.val() || 0);
    ref.update({ walletBalance: balance + 100 }).then(updateCurrentPlanView);
  });
}

// ✅ DOM لوڈ پر ویو اپڈیٹ
document.addEventListener("DOMContentLoaded", updateCurrentPlanView);
