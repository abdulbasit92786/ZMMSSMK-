plans.forEach(plan => {
  const card = document.createElement("div");
  card.className = "plan-card";

  card.innerHTML = `
    <h3>${plan.name}</h3>
    <p>💵 Price: $${plan.price}</p>
    <p>🎁 Daily Reward: ${plan.dailyTokens} tokens</p>
    <button onclick="claimReward(${JSON.stringify(plan)})">🎉 Claim Daily</button>
  `;

  plansContainer.appendChild(card);
});
