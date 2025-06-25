// Daily NFT Reward Logic

const nftPlans = {
  "basic": { amount: 1, daily: 40 },
  "silver": { amount: 10, daily: 100 },
  "gold": { amount: 50, daily: 250 },
  "elite": { amount: 100, daily: 400 }
};

function giveNFTReward() {
  const planKey = localStorage.getItem("userNFTKey");
  const lastReward = localStorage.getItem("lastNFTReward");
  const now = Date.now();

  if (!planKey || !nftPlans[planKey]) {
    console.log("No NFT Plan purchased");
    return;
  }

  if (lastReward && now - parseInt(lastReward) < 24 * 60 * 60 * 1000) {
    console.log("NFT reward already claimed today");
    return;
  }

  let balance = parseInt(localStorage.getItem("balance")) || 0;
  balance += nftPlans[planKey].daily;
  localStorage.setItem("balance", balance);
  localStorage.setItem("lastNFTReward", now);

  alert(`🎉 NFT Daily Reward Claimed!\n+${nftPlans[planKey].daily} Tokens`);
}

// Call this on dashboard or app load
giveNFTReward();
