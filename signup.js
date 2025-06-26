document.getElementById('signupForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const username = document.getElementById('username').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;

  if (!username || !email || !password) {
    alert('Please fill all fields');
    return;
  }

  const user = {
    username: username,
    email: email,
    password: password,
    balance: 0,
    token: "ZMM"
  };

  localStorage.setItem('zmm_user', JSON.stringify(user));

  alert('Signup successful!');

  window.location.href = 'dashboard.html';
});
