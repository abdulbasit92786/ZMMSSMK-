document.getElementById("registerBtn").addEventListener("click", function () {
  const email = document.getElementById("email").value.trim();
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!email || !username || !password) {
    alert("❌ All fields are required");
    return;
  }

  // ✅ Get referrer from URL if exists (e.g., ?start=refUserId)
  const urlParams = new URLSearchParams(window.location.search);
  const referralBy = urlParams.get("start") || null;

  // Step 1: Create Firebase Auth user
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      const userId = user.uid;

      // Step 2: Save full user data to Realtime Database
      return firebase.database().ref("users/" + userId).set({
        email: email,
        username: username,
        registeredAt: Date.now(),

        // ✅ Full user profile fields
        zmm_balance: 0,
        total_earned: 0,
        wallet_balance: 0,
        last_claim_time: 0,
        active_plan: "plan_nft_25", // یا "free" اگر مفت پلان ہو

        balance: 0,
        withdrawn: 0,
        referrals: 0,
        plan: "Free",
        referralBy: referralBy, // ✅ Save referrer ID from URL

        tasks: {
          task1: false,
          task2: false,
          task3: false,
          task4: false
        },
        nft: null
      });
    })
    .then(() => {
      alert("✅ Registration successful!");
      window.location.href = "login.html"; // Redirect to login
    })
    .catch((error) => {
      console.error("❌ Error:", error);
      alert("❌ " + error.message);
    });
});
