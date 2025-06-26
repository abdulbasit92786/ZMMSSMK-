document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (email === "test@zmm.com" && password === "123456") {
    localStorage.setItem("zmm_logged_in", "true");
    window.location.href = "dashboard.html";
  } else {
    alert("❌ Invalid login details");
  }
});
