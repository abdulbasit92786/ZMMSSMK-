document.getElementById("registerBtn").addEventListener("click", function () {
  const email = document.getElementById("email").value.trim();
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!email || !username || !password) {
    alert("❌ All fields are required");
    return;
  }

  const urlParams = new URLSearchParams(window.location.search);
  const referralBy = urlParams.get("start") || null;

  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      const userId = user.uid;

      const userData = {
        uid: userId,
        email: email,
        username: username,
        registeredAt: Date.now(),

        active_plan: "plan_free",

        wallet: {
          zmm: 0,
          usdt: 0
        },

        admob_views: {
          watched: 0,
          skipped: 0
        },

        referralBy: referralBy
      };

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
