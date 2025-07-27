let startTimes = {};
const TASK_IDS = ['task1', 'task2', 'task3', 'task4'];
const HIDE_DURATION_HOURS = 24;

document.addEventListener("DOMContentLoaded", async () => {
  await initializeUserInFirebase();
  await showPlanInfo();
  checkTaskVisibility();
});

// 🔐 یوزر ID: Telegram ID یا Random Local UID
function getUserId() {
  let uid = localStorage.getItem("uid");
  if (!uid) {
    uid = "user_" + Math.floor(Math.random() * 1000000);
    localStorage.setItem("uid", uid);
  }
  return uid;
}

// ✅ Firebase میں یوزر سیٹ کریں اگر نیا ہے
async function initializeUserInFirebase() {
  const userId = getUserId();
  const userRef = firebase.database().ref('users/' + userId);
  const snapshot = await userRef.get();

  if (!snapshot.exists()) {
    await userRef.set({
      zmm_balance: 0,
      active_plan: "plan_free", // default free plan
      missions_completed: {},
      total_earned: 0
    });
  }
}

// 🎁 پلان کے مطابق ریوارڈ نکالیں
function getRewardForPlan(planKey) {
  if (!planKey || planKey === "plan_free") return 0.25;

  const parts = planKey.split("_");
  const amount = parseFloat(parts[2]);

  if (isNaN(amount)) return 0.25;

  switch (amount) {
    case 10:
    case 1000: return 1;
    case 25:
    case 2500: return 2;
    case 50:
    case 5000: return 3;
    case 100:
    case 10000: return 5;
    case 500:
    case 50000: return 10;
    default: return 0.25;
  }
}

// 📦 پلان نیم اور ریوارڈ شو کریں UI میں
async function showPlanInfo() {
  const userId = getUserId();
  const userRef = firebase.database().ref('users/' + userId);
  const snapshot = await userRef.get();

  if (!snapshot.exists()) return;

  const userData = snapshot.val();
  const planKey = userData.active_plan;
  const reward = getRewardForPlan(planKey);

  const planNameElement = document.getElementById("plan-name");
  const planRewardElement = document.getElementById("plan-reward");

  if (!planKey || planKey === "plan_free") {
    planNameElement.textContent = "Free Plan";
  } else {
    const parts = planKey.split("_");
    const type = parts[1].toUpperCase();
    const value = parts[2];
    planNameElement.textContent = `${type} $${value}`;
  }

  planRewardElement.textContent = reward;
}

// ▶️ ویڈیو شروع، ٹائم اسٹارٹ
function startTask(url, id) {
  startTimes[id] = new Date().getTime();
  window.open(url, '_blank');
  document.getElementById("verify-" + id).style.display = "inline-block";
}

// ✅ Verify button پر کلک
async function verifyTask(id) {
  const now = new Date().getTime();
  const elapsed = (now - startTimes[id]) / 1000;

  if (elapsed < 30) {
    alert("❌ Please watch at least 30 seconds before verifying.");
    return;
  }

  const userId = getUserId();
  const userRef = firebase.database().ref('users/' + userId);
  const snapshot = await userRef.get();

  if (!snapshot.exists()) return;

  const userData = snapshot.val();
  const reward = getRewardForPlan(userData.active_plan);
  const completed = userData.missions_completed || {};

  if (completed[id]) {
    alert("⛔ Already verified today.");
    return;
  }

  let newBalance = (userData.zmm_balance || 0) + reward;
  let totalEarned = (userData.total_earned || 0) + reward;
  completed[id] = true;

  await userRef.update({
    zmm_balance: newBalance,
    total_earned: totalEarned,
    missions_completed: completed
  });

  localStorage.setItem("watchedTime-" + id, now);
  document.getElementById("verify-" + id).style.display = "none";
  document.getElementById(id).style.display = "none";

  alert(`✅ Success! You got ${reward} Token(s).`);
}

// ⏳ ہر مشن کو 24 گھنٹے بعد دکھاؤ
function checkTaskVisibility() {
  const now = new Date().getTime();

  TASK_IDS.forEach(id => {
    const taskElement = document.getElementById(id);
    const lastWatched = localStorage.getItem("watchedTime-" + id);

    if (lastWatched) {
      const diff = now - parseInt(lastWatched);
      const hoursPassed = diff / (1000 * 60 * 60);

      if (hoursPassed < HIDE_DURATION_HOURS) {
        taskElement.style.display = "none";
      } else {
        taskElement.style.display = "block";
        localStorage.removeItem("watchedTime-" + id);
      }
    } else {
      taskElement.style.display = "block";
    }
  });
                            }
