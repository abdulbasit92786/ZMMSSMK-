document.getElementById("registerBtn").addEventListener("click", function () {
  const email = document.getElementById("email").value.trim();
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const selectedPlan = document.getElementById("plan").value;

  if (!email || !username || !password) {
    alert("❌ All fields are required");
    return;
  }

  // optional referral system
  const urlParams = new URLSearchParams(window.location.search);
  const referralBy = urlParams.get("start") || null;

  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      const userId = user.uid;

      // ✅ Well-structured user data
      const userData = {
        uid: userId,
        username: username,
        email: email,
        active_plan: selectedPlan,
        registeredAt: Date.now(),
        admob_views: {
          watched: 0,
          skipped: 0
        },
        wallet: {
          zmm: 0,
          usdt: 0
        }
      };

      // ✅ If referral is passed, add it
      if (referralBy) {
        userData.referralBy = referralBy;
      }

      // ✅ Save to Firebase Database
      return firebase.database().ref("users/" + userId).set(userData);
    })
    .then(() => {
      alert("✅ Registration successful!");
      window.location.href = "login.html";
    })
    .catch((error) => {
      console.error("❌ Error:", error);
      alert("❌ " + error.message);
    });
});
