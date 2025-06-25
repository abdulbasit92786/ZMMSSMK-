// nft-plans.js

const nftPlans = [
  { id: 1, price: 1, dailyTokens: 40 },
  { id: 2, price: 5, dailyTokens: 200 },
  { id: 3, price: 10, dailyTokens: 400 },
  { id: 4, price: 25, dailyTokens: 1000 },
  { id: 5, price: 50, dailyTokens: 2000 },
  { id: 6, price: 100, dailyTokens: 4000 }
];

// Check user NFT plan
function getUserNFTPlan(userId) {
  const userPlan = localStorage.getItem("nft_plan_" + userId);
  return userPlan ? JSON.parse(userPlan) : null;
}

// Set user NFT plan
function setUserNFTPlan(userId, planId) {
  const selectedPlan = nftPlans.find(p => p.id === planId);
  if (selectedPlan) {
    localStorage.setItem("nft_plan_" + userId, JSON.stringify(selectedPlan));
    alert("✅ NFT Plan Activated: $" + selectedPlan.price);
  } else {
    alert("❌ Invalid NFT Plan.");
  }
}

// Calculate daily reward
function getDailyNFTReward(userId) {
  const plan = getUserNFTPlan(userId);
  if (!plan) return 0;
  return plan.dailyTokens;
}

// UI Render for plans
function renderNFTPlans() {
  const container = document.getElementById("nftPlans");
  container.innerHTML = "";
  nftPlans.forEach(plan => {
    const btn = document.createElement("button");
    btn.className = "plan-btn";
    btn.innerText = `$${plan.price} Plan - ${plan.dailyTokens} tokens/day`;
    btn.onclick = () => {
      const confirmBuy = confirm(`Buy this NFT Plan for $${plan.price}?`);
      if (confirmBuy) {
        const userId = localStorage.getItem("user_id");
        setUserNFTPlan(userId, plan.id);
      }
    };
    container.appendChild(btn);
  });
}

// Call render on page load
document.addEventListener("DOMContentLoaded", renderNFTPlans);
