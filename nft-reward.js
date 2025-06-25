const userNFTKey = localStorage.getItem("userNFTKey") || null;
const claimedToday = JSON.parse(localStorage.getItem("nftDailyClaim") || "{}");

function claimReward(plan) {
  const today = new Date().toISOString().split("T")[0];

  // اگر یوزر نے کوئی NFT خریدا ہی نہیں
  if (!userNFTKey || userNFTKey !== plan.key) {
    alert("❌ You need to buy this NFT to claim rewards.");
    return;
  }

  if (claimedToday[plan.key] === today) {
    alert("✅ You already claimed today's reward.");
    return;
  }

  // Add tokens to local storage
  let tokens = parseInt(localStorage.getItem("tokens") || "0");
  tokens += plan.dailyTokens;
  localStorage.setItem("tokens", tokens.toString());

  claimedToday[plan.key] = today;
  localStorage.setItem("nftDailyClaim", JSON.stringify(claimedToday));

  alert(`🎉 You received ${plan.dailyTokens} tokens today!`);
  updateStatusBox();
}

function buyNFT(planKey) {
  localStorage.setItem("userNFTKey", planKey);
  alert(`✅ NFT Purchased: ${planKey.toUpperCase()}`);
  updateStatusBox();
}

function updateStatusBox() {
  const box = document.getElementById("statusBox");
  const currentNFT = localStorage.getItem("userNFTKey");
  if (currentNFT) {
    box.innerText = `🔐 Your Active NFT: ${currentNFT.toUpperCase()}`;
  } else {
    box.innerText = `❌ You have not purchased any NFT plan yet.`;
  }
}

// Buy button injection
window.addEventListener("load", () => {
  document.querySelectorAll(".plan-card").forEach((card, index) => {
    const plan = plans[index];
    const btn = document.createElement("button");
    btn.innerText = "💳 Buy NFT Plan";
    btn.onclick = () => buyNFT(plan.key);
    card.appendChild(btn);
  });
  updateStatusBox();
});
