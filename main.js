function signUp() {
  const email = document.getElementById("email").value;
  const pass = document.getElementById("password").value;
  const ref = document.getElementById("referral").value;

  if (!email || !pass || !ref) {
    alert("All fields are required!");
    return;
  }

  localStorage.setItem("signupEmail", email);
  localStorage.setItem("signupPass", pass);
  localStorage.setItem("refCode", ref);

  // Simulate sending verification
  const code = Math.floor(100000 + Math.random() * 900000);
  localStorage.setItem("verifyCode", code);
  alert("Verification code sent: " + code);

  window.location.href = "verify.html";
}

function confirmCode() {
  const inputCode = document.getElementById("code").value;
  const storedCode = localStorage.getItem("verifyCode");

  if (inputCode === storedCode) {
    alert("Account Verified!");
    window.location.href = "dashboard.html";
  } else {
    alert("Wrong code!");
  }
}

function goToLogin() {
  const email = prompt("Enter your Email:");
  const pass = prompt("Enter your Password:");

  const storedEmail = localStorage.getItem("signupEmail");
  const storedPass = localStorage.getItem("signupPass");

  if (email === storedEmail && pass === storedPass) {
    alert("Login Successful!");
    window.location.href = "dashboard.html";
  } else {
    alert("Invalid credentials");
  }
}
