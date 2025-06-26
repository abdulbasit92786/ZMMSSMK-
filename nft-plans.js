document.addEventListener("DOMContentLoaded", () => {
  const plans = [
    { name: "Free NFT", daily: 10, price: 0 },
    { name: "Starter NFT", daily: 25, price: 1 },
    { name: "Pro NFT", daily: 60, price: 3 },
    { name: "Ultra NFT", daily: 120, price: 5 },
    { name: "Legendary NFT", daily: 250, price: 10 }
  ];

  const plansContainer = document.getElementById("nftPlans");

  plans.forEach(plan => {
    const div = document.createElement("div");
    div.className = "card";
    div.innerHTML = `
      <h3>${plan.name}</h3>
      <p>Daily Earning: ${plan.daily} ZMM</p>
      <p>Price: $${plan.price}</p>
      <button class="btn">Activate</button>
    `;
    plansContainer.appendChild(div);
  });
});
