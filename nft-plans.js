const plans = [
  {
    name: "💎 NFT Bronze",
    price: 1,
    dailyTokens: 40,
    key: "bronze"
  },
  {
    name: "🔥 NFT Silver",
    price: 5,
    dailyTokens: 100,
    key: "silver"
  },
  {
    name: "🚀 NFT Gold",
    price: 10,
    dailyTokens: 200,
    key: "gold"
  },
  {
    name: "👑 NFT Diamond",
    price: 50,
    dailyTokens: 350,
    key: "diamond"
  },
  {
    name: "🌌 NFT Legendary",
    price: 100,
    dailyTokens: 400,
    key: "legendary"
  }
];

// Show all plans
const plansContainer = document.getElementById("plans");

plans.forEach(plan => {
  const card = document.createElement("div");
  card.className = "plan-card";

  card.innerHTML = `
    <h3>${plan.name}</h3>
    <p>💵 Price: $${plan.price}</p>
    <p>🎁 Daily Reward: ${plan.dailyTokens} tokens</p>
    <button onclick='claimReward(${JSON.stringify(plan)})'>🎉 Claim Daily</button>
  `;

  plansContainer.appendChild(card);
});
