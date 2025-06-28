function sendVerificationCode() {
  let email = document.getElementById('email').value;
  // simulate code send
  localStorage.setItem('register_email', email);
  window.location.href = 'verify.html';
}
