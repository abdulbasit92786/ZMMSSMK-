function toggleMenu() {
  const sidebar = document.getElementById("sidebar");
  sidebar.style.left = (sidebar.style.left === "0px") ? "-250px" : "0px";
}

function signup() {
  const email = document.getElementById("signupEmail").value;
  const password = document.getElementById("signupPassword").value;

  if (!email || !password) {
    alert("Please enter all fields!");
    return;
  }

  const users = JSON.parse(localStorage.getItem("users") || "[]");
  const userExists = users.find(u => u.email === email);
  if (userExists) {
    alert("⚠️ Email already registered.");
    return;
  }

  users.push({ email, password, verified: false });
  localStorage.setItem("users", JSON.stringify(users));
  localStorage.setItem("pending_email", email);
  localStorage.setItem("vcode", "123456"); // Fake code
  window.location.href = "verify.html";
}

function verifyCode() {
  const code = document.getElementById("vcode").value;
  const vcode = localStorage.getItem("vcode");
  const email = localStorage.getItem("pending_email");

  if (code === vcode) {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const updated = users.map(u => {
      if (u.email === email) u.verified = true;
      return u;
    });
    localStorage.setItem("users", JSON.stringify(updated));
    alert("✅ Verified successfully!");
    window.location.href = "dashboard.html";
  } else {
    alert("❌ Invalid Code");
  }
}

function login() {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  const users = JSON.parse(localStorage.getItem("users") || "[]");
  const user = users.find(u => u.email === email && u.password === password && u.verified);

  if (user) {
    alert("✅ Login successful!");
    window.location.href = "dashboard.html";
  } else {
    alert("❌ Invalid credentials or not verified.");
  }
}
