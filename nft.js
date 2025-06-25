// NFT Purchase Logic

const nftPlans = {
  "basic": { amount: 1, daily: 40 },
  "silver": { amount: 10, daily: 100 },
  "gold": { amount: 50, daily: 250 },
  "elite": { amount: 100, daily: 400 }
};

function purchaseNFT(planKey) {
  if (!nftPlans[planKey]) {
    alert("Invalid Plan Selected");
    return;
  }

  const confirmPurchase = confirm(
    `🛒 Confirm Purchase:\nPlan: ${planKey.toUpperCase()}\nPrice: $${nftPlans[planKey].amount}`
  );

  if (!confirmPurchase) return;

  // Save purchase data
  localStorage.setItem("userNFTKey", planKey);
  localStorage.setItem("lastNFTReward", "0");

  alert(`✅ NFT Plan "${planKey.toUpperCase()}" Activated Successfully!\nYou will receive ${nftPlans[planKey].daily} tokens daily.`);
}
