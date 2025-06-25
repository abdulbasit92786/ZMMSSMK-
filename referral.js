function applyReferral(ref) {
  if (!ref || ref === "") return;

  // Save referral for new user
  localStorage.setItem("user_referral", ref);

  // Give bonus to invited user (new user)
  let myBalance = parseInt(localStorage.getItem("user_balance") || "0");
  myBalance += 2;
  localStorage.setItem("user_balance", myBalance.toString());

  // Record that referrer earned (In real app, store to server/database)
  alert(`🎉 You got 2 tokens as welcome bonus!\nReferral: ${ref}`);

  // Simulate bonus to referrer (this is just UI simulation for now)
  let log = JSON.parse(localStorage.getItem("ref_logs") || "[]");
  log.push({ referrer: ref, earned: 5 });
  localStorage.setItem("ref_logs", JSON.stringify(log));
}
