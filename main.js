function claimDailyReward() {
  alert("✅ You have claimed your daily reward! +10 ZMM");
}

function copyReferral() {
  const input = document.getElementById("referralLink");
  input.select();
  input.setSelectionRange(0, 99999);
  document.execCommand("copy");
  alert("📋 Referral link copied!");
}
