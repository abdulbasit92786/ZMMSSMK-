// nft.js

const nftPlans = {
  free: {
    name: "Free Plan",
    price: 0,
    tokenEvery4h: 0.5,
    tokenPerAd: 0,
    duration: Infinity
  },
  plan10: {
    name: "$10 Plan",
    price: 10,
    tokenEvery4h: 2,
    tokenPerAd: 2,
    duration: 30
  },
  plan25: {
    name: "$25 Plan",
    price: 25,
    tokenEvery4h: 4,
    tokenPerAd: 4,
    duration: 30
  },
  plan50: {
    name: "$50 Plan",
    price: 50,
    tokenEvery4h: 8,
    tokenPerAd: 8,
    duration: 30
  },
  plan100: {
    name: "$100 Plan",
    price: 100,
    tokenEvery4h: 15,
    tokenPerAd: 12,
    duration: 30
  },
  plan500: {
    name: "$500 Lifetime Plan",
    price: 500,
    tokenEvery4h: 50,
    tokenPerAd: 40,
    duration: Infinity
  }
};

// User data will be stored in localStorage for simulation
let userData = JSON.parse(localStorage.getItem("userData")) || {
  walletBalance: 0,
  currentPlan: "free",
  planStart: null,
  totalTokens: 0
};

function updateCurrentPlanView() {
  const plan = nftPlans[userData.currentPlan];
  document.getElementById("current-plan").innerText =
    `${plan.name} — ${plan.duration === Infinity ? "Lifetime" : plan.duration + " days"}`;
}

function buyPlan(planKey) {
  const selectedPlan = nftPlans[planKey];

  // Check lifetime lock
  if (userData.currentPlan === "plan500") {
    alert("❌ You already have the Lifetime Plan. You can't buy another plan.");
    return;
  }

  // Check wallet balance
  if (userData.walletBalance < selectedPlan.price) {
    alert("❌ Insufficient balance. Please deposit more to buy this plan.");
    return;
  }

  // Auto replace old plan (if not free)
  if (userData.currentPlan !== "free") {
    alert(`⚠️ ${nftPlans[userData.currentPlan].name} will be replaced.`);
  }

  // Deduct balance and activate plan
  userData.walletBalance -= selectedPlan.price;
  userData.currentPlan = planKey;
  userData.planStart = Date.now();

  localStorage.setItem("userData", JSON.stringify(userData));
  updateCurrentPlanView();

  alert(`✅ ${selectedPlan.name} activated successfully!`);
}

// Show current plan on page load
document.addEventListener("DOMContentLoaded", updateCurrentPlanView);
