function verifyCode() {
  let inputCode = document.getElementById('code').value;
  if(inputCode === '123456') {
    alert("✅ Your account has been registered successfully!");
    let email = localStorage.getItem('register_email');
    localStorage.setItem(`user_${email}`, 'registered');
    window.location.href = 'login.html';
  } else {
    alert("❌ Incorrect code.");
  }
}
