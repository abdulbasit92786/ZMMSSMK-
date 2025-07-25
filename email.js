function sendCodeToEmail(email, code) {
  // ✅ Show the code via alert (for testing/demo)
  alert(`Verification code sent to ${email} is: ${code}`);

  // ✅ Save to Firebase Realtime Database
  const userId = localStorage.getItem("telegram_user_id") || "123456"; // fallback user ID
  const userRef = firebase.database().ref("emailVerification/" + userId);

  userRef.set({
    email: email,
    code: code,
    timestamp: Date.now()
  }).then(() => {
    console.log("✅ Email and code saved to Firebase");
  }).catch((error) => {
    console.error("❌ Error saving to Firebase:", error);
  });
}
