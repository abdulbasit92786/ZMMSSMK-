// 6️⃣ login.js
document.getElementById("loginBtn").addEventListener("click", function () {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  const userData = JSON.parse(localStorage.getItem(email));

  if (userData && userData.password === password) {
    alert("Login successful!");
    sessionStorage.setItem("loggedInEmail", email);
    window.location.href = "home.html";
  } else {
    alert("Incorrect email or password, or account not registered.");
  }
});
