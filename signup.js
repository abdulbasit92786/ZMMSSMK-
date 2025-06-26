document.getElementById("signupForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  localStorage.setItem("zmm_user_email", email);
  localStorage.setItem("zmm_user_pass", password);

  alert("✅ Signup successful. Please login now.");
  window.location.href = "login.html";
});
