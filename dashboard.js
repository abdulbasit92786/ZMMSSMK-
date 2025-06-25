function logout() {
  localStorage.removeItem("user_logged_in");
  window.location.href = "index.html";
}

function loadDashboard() {
  const email = localStorage.getItem("user_email");
  const referral = localStorage.getItem("user_referral");

  if (!localStorage.getItem("user_logged_in")) {
    window.location.href = "index.html";
    return;
  }

  document.getElementById("welcome-msg").innerText = `Welcome, ${email}`;
  document.getElementById("ref-code").innerText = referral;
  document.getElementById("ref-link").innerText =
    `https://yourapp.com?ref=${referral}`;

  // Load balance
  const balance = parseInt(localStorage.getItem("user_balance") || "0");
  document.getElementById("balance").innerText = balance;
}

function claimReward() {
  const now = Date.now();
  const lastClaim = parseInt(localStorage.getItem("last_claim") || "0");

  const hours = 4 * 60 * 60 * 1000; // 4 hours in milliseconds
  if (now - lastClaim < hours) {
    const remaining = Math.ceil((hours - (now - lastClaim)) / 60000);
    document.getElementById("msg").innerText =
      `⏳ Please wait ${remaining} minutes before next claim.`;
    return;
  }

  let balance = parseInt(localStorage.getItem("user_balance") || "0");
  balance += 1; // FREE users get 1 token per 4 hours
  localStorage.setItem("user_balance", balance.toString());
  localStorage.setItem("last_claim", now.toString());

  document.getElementById("balance").innerText = balance;
  document.getElementById("msg").innerText = "✅ You earned 1 token!";
}

window.onload = loadDashboard;
