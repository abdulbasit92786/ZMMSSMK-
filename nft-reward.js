function giveNFTDailyReward() {
  let plan = JSON.parse(localStorage.getItem("nft_plan") || "null");
  if (!plan) return;

  let lastReward = localStorage.getItem("last_nft_reward");
  let today = new Date().toLocaleDateString();

  if (lastReward === today) return; // already given today

  let balance = parseInt(localStorage.getItem("user_balance") || "0");
  balance += plan.daily;
  localStorage.setItem("user_balance", balance.toString());

  localStorage.setItem("last_nft_reward", today);
  alert(`🎁 NFT Daily Bonus: +${plan.daily} tokens added to your balance!`);
}
