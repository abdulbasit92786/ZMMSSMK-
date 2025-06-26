document.getElementById('loginForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;

  const savedUser = JSON.parse(localStorage.getItem('zmm_user'));

  if (!savedUser || savedUser.email !== email || savedUser.password !== password) {
    alert('Invalid email or password!');
    return;
  }

  alert('Login successful!');
  localStorage.setItem('zmm_loggedin', 'true');
  window.location.href = 'dashboard.html';
});
