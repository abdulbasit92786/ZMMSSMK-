// register.js

document.getElementById("registerBtn").addEventListener("click", function () {
  const email = document.getElementById("email").value.trim();
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!email || !username || !password) {
    alert("❌ All fields are required");
    return;
  }

  // Step 1: Create Firebase Auth user
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      const userId = user.uid;

      // Step 2: Save additional data to Realtime Database
      return firebase.database().ref("users/" + userId).set({
        email: email,
        username: username,
        registeredAt: Date.now(),

        // ✅ New fields added:
        balance: 0,
        plan: "Free",
        referrals: 0,
        referralBy: null,
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
      window.location.href = "login.html"; // redirect to login
    })
    .catch((error) => {
      console.error("❌ Error:", error);
      alert("❌ " + error.message);
    });
});
