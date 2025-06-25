function showSignUp() {
  document.getElementById("signup-form").style.display = "block";
  document.getElementById("login-form").style.display = "none";
}

function showLogin() {
  document.getElementById("signup-form").style.display = "none";
  document.getElementById("login-form").style.display = "block";
}

// Simulated OTP system
let generatedOTP = null;

function sendOTP() {
  const email = document.getElementById("signup-email").value;
  const referral = document.getElementById("signup-referral").value;

  if (!email || !referral) {
    document.getElementById("message").innerText = "Email and referral are required!";
    return;
  }

  // Generate random 4-digit OTP
  generatedOTP = Math.floor(1000 + Math.random() * 9000).toString();
  alert("Your OTP: " + generatedOTP + " (Simulated)");

  document.getElementById("message").innerText = "OTP Sent to your email (simulated)";
}

function completeSignup() {
  const otp = document.getElementById("signup-otp").value;

  if (otp !== generatedOTP) {
    document.getElementById("message").innerText = "Incorrect OTP!";
    return;
  }

  // Store user info (simulation)
  const email = document.getElementById("signup-email").value;
  const password = document.getElementById("signup-password").value;
  const referral = document.getElementById("signup-referral").value;

  localStorage.setItem("user_email", email);
  localStorage.setItem("user_password", password);
  localStorage.setItem("user_referral", referral);
  localStorage.setItem("user_logged_in", "true");

  window.location.href = "dashboard.html";
}
