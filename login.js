function login() {
  let email = document.getElementById('login_email').value;
  let password = document.getElementById('login_pass').value;
  let registered = localStorage.getItem(`user_${email}`);

  if(registered === 'registered') {
    alert("✅ Login successful!");
    window.location.href = 'dashboard.html';
  } else {
    alert("❌ No account found with this email. Please register first.");
  }
}
