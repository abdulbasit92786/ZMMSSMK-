// 2️⃣ register.js
document.getElementById("registerBtn").addEventListener("click", function (e) {
  e.preventDefault();
  
  const email = document.getElementById("email").value;
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if (!email || !username || !password) {
    alert("Please fill all fields.");
    return;
  }

  // Store data
  const code = Math.floor(100000 + Math.random() * 900000); // 6-digit code
  localStorage.setItem(email + "_code", code);
  localStorage.setItem(email, JSON.stringify({ email, username, password }));
  sessionStorage.setItem("pendingEmail", email);

  // NOTE: sendCodeToEmail(email, code); ← یہ بعد میں ایمیل کنیکٹ کرتے وقت کریں گے
  alert("Code sent (temporarily): " + code); // وقتی حل جب تک email system نہ ہو

  window.location.href = "verify.html";
});
