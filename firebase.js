// firebase.js
// ✅ Firebase Config and Initialization (Shared)

const firebaseConfig = {
  apiKey: "AIzaSyBN4LbA8udE4POVTR-XlZgpHQOvuNcSMI4",
  authDomain: "zmmssmk.firebaseapp.com",
  databaseURL: "https://zmmssmk-default-rtdb.firebaseio.com",
  projectId: "zmmssmk",
  storageBucket: "zmmssmk.appspot.com",
  messagingSenderId: "677420760492",
  appId: "1:677420760492:web:2c27c0f0ed6490b8dfce09",
  measurementId: "G-7J7BEDY8H1"
};

// ✅ Initialize Firebase
firebase.initializeApp(firebaseConfig);

// ✅ Database & Auth Instances
const database = firebase.database();
const auth = firebase.auth();

// ✅ Automatically detect login and expose user ID globally
auth.onAuthStateChanged(function (user) {
  if (user) {
    // User is logged in
    window.currentUserId = user.uid;
    console.log("✅ Logged in as:", window.currentUserId);
  } else {
    // Not logged in → redirect to login
    if (!window.location.href.includes("login.html") && !window.location.href.includes("register.html")) {
      window.location.href = "login.html";
    }
  }
});
