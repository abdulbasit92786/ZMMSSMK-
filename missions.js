// ✅ Firebase init
const firebaseConfig = {
  apiKey: "AIzaSyBN4LbA8udE4POVTR-XlZgpHQOvuNcSMI4",
  authDomain: "zmmssmk.firebaseapp.com",
  databaseURL: "https://zmmssmk-default-rtdb.firebaseio.com",
  projectId: "zmmssmk",
  storageBucket: "zmmssmk.appspot.com",
  messagingSenderId: "677420760492",
  appId: "1:677420760492:web:2c27c0f0ed6490b8dfce09"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// ✅ Get user ID from localStorage
const userId = localStorage.getItem("telegram_user_id") || "guest_user";

// ✅ Store task start times
let startTimes = {};

const TASK_IDS = ['task1', 'task2', 'task3', 'task4'];
const HIDE_DURATION_HOURS = 24;

document.addEventListener("DOMContentLoaded", () => {
  checkTaskVisibility();
  showPlanInfo();
  showTotalEarned(); // ✅ show total earned
});

// ✅ ریوارڈ پلان کے حساب سے نکالیں
function getRewardForPlan(planKey) {
  if (!planKey || planKey === "free") return 1;

  const parts = planKey.split("_");
  if (parts.length !== 3) return 1;

  const amount = parseFloat(parts[2]);
  if (isNaN(amount)) return 1;

  switch (amount) {
    case 10:
    case 1000: return 2;
    case 25:
    case 2500: return 4;
    case 50:
    case 5000: return 6;
    case 100:
    case 10000: return 12;
    case 500:
    case 50000: return 20;
    default: return 1;
  }
}

// ✅ پلان کا نام اور ریوارڈ شو کریں
function showPlanInfo() {
  const planNameEl = document.getElementById("plan-name");
  const rewardEl = document.getElementById("plan-reward");

  db.ref("users/" + userId + "/activePlans/zmm").once("value").then(snapshot => {
    const planKey = snapshot.val() || "free";
    const reward = getRewardForPlan(planKey);

    if (!planKey || planKey === "free") {
      planNameEl.textContent = "Free Plan";
    } else {
      const parts = planKey.split("_");
      const type = parts[1] === "nft" ? "ZMM" : parts[1].toUpperCase();
      const value = parts[2];
      planNameEl.textContent = `${type} $${value}`;
    }

    rewardEl.textContent = reward;
  });
}

// ✅ ٹوٹل ارننگ شو کریں
function showTotalEarned() {
  const earnedEl = document.getElementById("total-earned");
  if (!earnedEl) return;

  db.ref("users/" + userId + "/wallet/zmm").once("value").then(snap => {
    const total = parseFloat(snap.val() || 0);
    earnedEl.innerText = total.toFixed(2);
  });
}

// ▶️ ویڈیو ٹاسک اوپن کریں
function startTask(url, id) {
  startTimes[id] = new Date().getTime();
  window.open(url, "_blank");
  document.getElementById("verify-" + id).style.display = "inline-block";
}

// ✅ ویریفائی پر reward دیں
function verifyTask(id) {
  const now = new Date().getTime();
  const elapsed = (now - startTimes[id]) / 1000;

  if (elapsed < 30) {
    alert("❌ Please watch at least 30 seconds before verifying.");
    return;
  }

  const planRef = db.ref(`users/${userId}/activePlans/zmm`);
  const balanceRef = db.ref(`users/${userId}/wallet/zmm`);
  const taskRef = db.ref(`users/${userId}/watchedTasks/${id}`);

  planRef.once("value").then(planSnap => {
    const planKey = planSnap.val() || "free";
    const reward = getRewardForPlan(planKey);

    balanceRef.once("value").then(balanceSnap => {
      let currentBalance = parseFloat(balanceSnap.val() || 0);
      currentBalance += reward;

      const updates = {
        [`users/${userId}/wallet/zmm`]: currentBalance.toFixed(2),
        [`users/${userId}/watchedTasks/${id}`]: now
      };

      db.ref().update(updates).then(() => {
        alert(`✅ Success! You got ${reward} Token(s).`);
        document.getElementById("verify-" + id).style.display = "none";
        document.getElementById(id).style.display = "none";
        showTotalEarned(); // ✅ update total earned after reward
      });
    });
  });
}

// ⏱️ ٹاسک visibility چیک کریں
function checkTaskVisibility() {
  const now = new Date().getTime();

  db.ref(`users/${userId}/watchedTasks`).once("value").then(snapshot => {
    const watchedTasks = snapshot.val() || {};

    TASK_IDS.forEach(id => {
      const taskElement = document.getElementById(id);
      const lastWatched = watchedTasks[id];

      if (lastWatched) {
        const diff = now - parseInt(lastWatched);
        const hoursPassed = diff / (1000 * 60 * 60);

        if (hoursPassed < HIDE_DURATION_HOURS) {
          taskElement.style.display = "none";
        } else {
          taskElement.style.display = "block";
          db.ref(`users/${userId}/watchedTasks/${id}`).remove(); // دوبارہ دیکھنے کے لیے remove
        }
      } else {
        taskElement.style.display = "block";
      }
    });
  });
      }
