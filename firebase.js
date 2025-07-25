// firebase.js
// ✅ Firebase Config and Initialization (Shared)

const firebaseConfig = {
  apiKey: "AIzaSyAL9a_aE-zpelXpMIl0iAWD4Abrxf8e_2U",
  authDomain: "zmmssmk.firebaseapp.com",
  databaseURL: "https://zmmssmk-default-rtdb.firebaseio.com",
  projectId: "zmmssmk",
  storageBucket: "zmmssmk.appspot.com",
  messagingSenderId: "677420760492",
  appId: "1:677420760492:web:2c27c0f0ed6490b8dfce09",
  measurementId: "G-7J7BEDY8H1"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();
