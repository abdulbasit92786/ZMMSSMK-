// 6️⃣ login.js (Updated)
document.getElementById("loginBtn").addEventListener("click", function () {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  const userData = JSON.parse(localStorage.getItem(email));

  if (userData && userData.password === password) {
    alert("Login successful!");
    sessionStorage.setItem("loggedInEmail", email);
    window.location.href = "dashboard.html";  // 👉 Make sure this is correct page
  } else {
    alert("Incorrect email or password, or account not registered.");
  }
});
