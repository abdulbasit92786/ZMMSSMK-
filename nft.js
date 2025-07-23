// nft.js

const nftPlans = {
  free: { name: "Free Plan", price: 0, tokenEvery4h: 0.5, tokenPerAd: 0, duration: Infinity },
  plan10: { name: "$10 Plan", price: 10, tokenEvery4h: 2, tokenPerAd: 2, duration: 30 },
  plan25: { name: "$25 Plan", price: 25, tokenEvery4h: 4, tokenPerAd: 4, duration: 30 },
  plan50: { name: "$50 Plan", price: 50, tokenEvery4h: 8, tokenPerAd: 8, duration: 30 },
  plan100: { name: "$100 Plan", price: 100, tokenEvery4h: 15, tokenPerAd: 12, duration: 30 },
  plan500: { name: "$500 Lifetime Plan", price: 500, tokenEvery4h: 50, tokenPerAd: 40, duration: Infinity }
};

let userData = JSON.parse(localStorage.getItem("userData")) || {
  walletBalance: 0,
  currentPlan: "free",
  planStart: null,
  totalTokens: 0
};

function updateCurrentPlanView() {
  const plan = nftPlans[userData.currentPlan];
  const planText = `${plan.name} — ${plan.duration === Infinity ? "Lifetime Plan" : plan.duration + " days"}\nStarted: ${userData.planStart ? new Date(userData.planStart).toLocaleDateString() : "N/A"}`;
  document.getElementById("current-plan").innerText = planText;
  document.getElementById("wallet-balance").innerText = userData.walletBalance.toFixed(2);
}

function buyPlan(planKey) {
  const selectedPlan = nftPlans[planKey];

  if (userData.currentPlan === "plan500") {
    alert("❌ Lifetime plan already active. Cannot buy new plans.");
    return;
  }

  if (userData.walletBalance < selectedPlan.price) {
    alert("❌ Insufficient balance. Please add more funds.");
    return;
  }

  if (userData.currentPlan !== "free") {
    const confirmReplace = confirm(`⚠️ You already have a plan. It will be replaced. Continue?`);
    if (!confirmReplace) return;
  }

  userData.walletBalance -= selectedPlan.price;
  userData.currentPlan = planKey;
  userData.planStart = Date.now();

  localStorage.setItem("userData", JSON.stringify(userData));
  updateCurrentPlanView();

  alert(`✅ ${selectedPlan.name} activated successfully!`);
}

function addDummyFunds() {
  userData.walletBalance += 100;
  localStorage.setItem("userData", JSON.stringify(userData));
  updateCurrentPlanView();
}

document.addEventListener("DOMContentLoaded", updateCurrentPlanView);
