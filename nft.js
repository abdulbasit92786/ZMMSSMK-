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
const userId = localStorage.getItem("telegram_user_id") || "guest_user";

const nftPlans = {
  free: { name: "Free Plan", price: 0, tokenEvery4h: 0.5, tokenPerAd: 1, duration: Infinity },
  plan10: { name: "$10 Plan", price: 10, tokenEvery4h: 2, tokenPerAd: 2, duration: 30 },
  plan25: { name: "$25 Plan", price: 25, tokenEvery4h: 4, tokenPerAd: 4, duration: 30 },
  plan50: { name: "$50 Plan", price: 50, tokenEvery4h: 8, tokenPerAd: 6, duration: 30 },
  plan100: { name: "$100 Plan", price: 100, tokenEvery4h: 16, tokenPerAd: 12, duration: 30 },
  plan500: { name: "$500 Lifetime Plan", price: 500, tokenEvery4h: 20, tokenPerAd: 24, duration: Infinity }
};

function updateView() {
  db.ref(`users/${userId}/nftData`).once("value").then(snapshot => {
    const data = snapshot.val() || {
      walletBalance: 0,
      currentPlan: "free",
      planStart: null,
      totalTokens: 0
    };

    const plan = nftPlans[data.currentPlan];
    const planText = `${plan.name} — ${plan.duration === Infinity ? "Lifetime" : plan.duration + " days"}\nStarted: ${data.planStart ? new Date(data.planStart).toLocaleDateString() : "N/A"}`;
    document.getElementById("current-plan").innerText = `🔐 Current Plan: ${planText}`;
    document.getElementById("wallet-balance").innerText = `💰 Wallet: ${data.walletBalance.toFixed(2)} ZMM`;

    renderPlans(data.walletBalance, data.currentPlan);
  });
}

function renderPlans(balance, currentPlan) {
  const container = document.getElementById("plans-container");
  container.innerHTML = "";

  for (const key in nftPlans) {
    const plan = nftPlans[key];
    const box = document.createElement("div");
    box.className = "plan-box";

    box.innerHTML = `
      <h3>${plan.name}</h3>
      <p>${plan.duration === Infinity ? "Lifetime" : plan.duration + " Days"} Access</p>
      <p>Every 4h: +${plan.tokenEvery4h} | Per Ad: +${plan.tokenPerAd}</p>
      <p>Price: ${plan.price} ZMM</p>
    `;

    const btn = document.createElement("button");
    btn.innerText = key === currentPlan ? "✔ Active" : "Buy Plan";
    btn.disabled = key === currentPlan || balance < plan.price;
    if (btn.innerText === "Buy Plan") {
      btn.onclick = () => buyPlan(key, plan.price);
    }

    box.appendChild(btn);
    container.appendChild(box);
  }
}

function buyPlan(planKey, price) {
  const ref = db.ref(`users/${userId}/nftData`);
  ref.once("value").then(snapshot => {
    const data = snapshot.val() || { walletBalance: 0, currentPlan: "free", planStart: null };

    if (data.walletBalance < price) {
      alert("❌ Insufficient balance.");
      return;
    }

    if (data.currentPlan !== "free" && planKey !== "plan500") {
      const confirmReplace = confirm("⚠ You already have a plan. Replace it?");
      if (!confirmReplace) return;
    }

    const updates = {
      walletBalance: data.walletBalance - price,
      currentPlan: planKey,
      planStart: Date.now()
    };

    ref.update(updates).then(() => {
      alert("✅ Plan purchased successfully!");
      updateView();
    });
  });
}

document.addEventListener("DOMContentLoaded", updateView);
