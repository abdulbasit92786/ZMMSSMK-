// script.js

function showRegister() {
  document.getElementById("mainBox").innerHTML = `
    <h2>Register</h2>
    <input type="text" id="email" placeholder="Email" />
    <input type="text" id="username" placeholder="Username" />
    <input type="password" id="password" placeholder="Password" />
    <button onclick="sendVerification()">Submit</button>
    <a href="#" onclick="showLogin()">Already have an account? Login</a>
  `;
}

function showLogin() {
  document.getElementById("mainBox").innerHTML = `
    <h2>Login</h2>
    <input type="text" id="email" placeholder="Email" />
    <input type="password" id="password" placeholder="Password" />
    <button onclick="login()">Login</button>
    <a href="#" onclick="showRegister()">Don't have an account? Register</a>
  `;
}

function sendVerification() {
  const email = document.getElementById("email").value;
  if (!email) {
    alert("Please enter your email");
    return;
  }

  document.getElementById("mainBox").innerHTML = `
    <h2>Enter Verification Code</h2>
    <input type="text" id="code" placeholder="6-digit code" />
    <button onclick="verifyCode()">Verify</button>
  `;
}

function verifyCode() {
  const code = document.getElementById("code").value;
  if (code === "123456") {
    alert("Account created successfully!");
    showLogin();
  } else {
    alert("Invalid code.");
  }
}

function login() {
  const email = document.getElementById("email").value;
  const pass = document.getElementById("password").value;

  if (email === "user@example.com" && pass === "1234") {
    alert("Login successful!");
    document.getElementById("mainBox").innerHTML = "<h2>Welcome to ZMM</h2>";
  } else {
    alert("Wrong email or password");
  }
  }
