// Check if user already claimed today
function hasClaimedToday(planKey) {
  const key = `nft_claimed_${planKey}`;
  const lastClaim = localStorage.getItem(key);
  const today = new Date().toDateString();
  return lastClaim === today;
}

// Claim reward for specific plan
function claimReward(plan) {
  if (hasClaimedToday(plan.key)) {
    alert("⏳ You already claimed today.");
    return;
  }

  // Update local storage to mark as claimed
  localStorage.setItem(`nft_claimed_${plan.key}`, new Date().toDateString());

  // Get current token balance
  let balance = parseInt(localStorage.getItem("token_balance") || "0");
  balance += plan.dailyTokens;

  localStorage.setItem("token_balance", balance);
  alert(`✅ Claimed ${plan.dailyTokens} tokens from ${plan.name}!`);
  updateBalanceDisplay();
}

// Optional: auto-update UI after claim
function updateBalanceDisplay() {
  const el = document.getElementById("tokenBalance");
  if (el) {
    el.innerText = localStorage.getItem("token_balance") || "0";
  }
    }
