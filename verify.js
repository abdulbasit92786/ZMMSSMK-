document.getElementById("verifyBtn").addEventListener("click", function () {
  const codeEntered = document.getElementById("verifyCode").value.trim();
  const email = sessionStorage.getItem("pendingEmail");

  if (!codeEntered || !email) {
    alert("❌ Code or email missing.");
    return;
  }

  // 🔎 Optional: Replace `@` and `.` in email to create a Firebase key
  const safeKey = email.replace(/\./g, "_").replace(/@/g, "_");

  // 🔁 Get code from Firebase
  const codeRef = firebase.database().ref("verifications/" + safeKey);

  codeRef.once("value").then((snapshot) => {
    const correctCode = snapshot.val();

    if (codeEntered === correctCode) {
      alert("✅ Verification successful!");
      sessionStorage.setItem("loggedInEmail", email);

      // Optional: mark user as verified
      firebase.database().ref("users/" + safeKey).update({
        verified: true
      });

      window.location.href = "home.html";
    } else {
      alert("❌ Invalid code. Try again.");
    }
  }).catch((error) => {
    console.error("Firebase error:", error);
    alert("❌ Could not verify. Please try later.");
  });
});
