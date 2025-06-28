// 4️⃣ verify.js
document.getElementById("verifyBtn").addEventListener("click", function () {
  const codeEntered = document.getElementById("verifyCode").value;
  const email = sessionStorage.getItem("pendingEmail");

  const correctCode = localStorage.getItem(email + "_code");

  if (codeEntered === correctCode) {
    alert("Verification successful!");
    sessionStorage.setItem("loggedInEmail", email);
    window.location.href = "home.html";
  } else {
    alert("Invalid code.");
  }
});
