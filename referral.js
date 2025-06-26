function copyReferral() {
  const input = document.getElementById("referralLink");
  input.select();
  input.setSelectionRange(0, 99999);
  document.execCommand("copy");
  alert("Referral link copied! 📋");
}
