function login() {
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  const savedEmail = localStorage.getItem("user_email");
  const savedPassword = localStorage.getItem("user_password");

  if (email === savedEmail && password === savedPassword) {
    localStorage.setItem("user_logged_in", "true");
    window.location.href = "dashboard.html";
  } else {
    document.getElementById("message").innerText = "Invalid email or password";
  }
}
