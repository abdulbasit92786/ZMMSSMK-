// firebase.js
// ✅ Firebase Config and Initialization (Realtime DB + Auth)

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

// ✅ Get Instances
const database = firebase.database();
const auth = firebase.auth();

// ✅ Auth Listener – Track Login Status
auth.onAuthStateChanged(function (user) {
  if (user) {
    // 🔓 User logged in
    window.currentUserId = user.uid;
    console.log("✅ Logged in as:", window.currentUserId);

    // ✅ Store essential user data to Firebase
    const userRef = database.ref("users/" + user.uid);
    userRef.once("value").then((snapshot) => {
      if (!snapshot.exists()) {
        // 🔄 First time user, save basic profile
        userRef.set({
          uid: user.uid,
          email: user.email || "",
          username: user.displayName || "Anonymous",
          zmmToken: 0,
          usdtToken: 0,
          activePlan: "none",
          lastDailyClaim: 0,
          joinedAt: Date.now()
        });
      }
    });
  } else {
    // 🔒 Not logged in → redirect
    if (!window.location.href.includes("login.html") &&
        !window.location.href.includes("register.html")) {
      window.location.href = "login.html";
    }
  }
});

// ✅ Export for global access
window.database = database;
window.auth = auth;
