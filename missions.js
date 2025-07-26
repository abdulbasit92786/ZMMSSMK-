let startTimes = {};

const TASK_IDS = ['task1', 'task2', 'task3', 'task4'];
const HIDE_DURATION_HOURS = 24;

document.addEventListener("DOMContentLoaded", async () => {
  await initializeUserInFirebase();
  await showPlanInfo();
  checkTaskVisibility();
});

// ✅ Firebase میں یوزر کا ڈیٹا initialize کریں
async function initializeUserInFirebase() {
  const userId = getUserId();

  const userRef = firebase.database().ref('users/' + userId);

  const snapshot = await userRef.get();

  if (!snapshot.exists()) {
    await userRef.set({
      zmm_balance: 0,
      active_plan: "plan_nft_25"
    });
  }
}

// 🔐 یونیک یوزر ID لیں (آپ Telegram ID یا random لے سکتے ہیں)
function getUserId() {
  let uid = localStorage.getItem("uid");
  if (!uid) {
    uid = "user_" + Math.floor(Math.random() * 1000000);
    localStorage.setItem("uid", uid);
  }
  return uid;
}

// 🟢 پلان کے مطابق reward value return کریں
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

// ✅ پلان نیم اور ریوارڈ شو کریں
async function showPlanInfo() {
  const userId = getUserId();
  const userRef = firebase.database().ref('users/' + userId);
  const snapshot = await userRef.get();

  const userData = snapshot.val();
  const planKey = userData.active_plan;
  const reward = getRewardForPlan(planKey);

  const planNameElement = document.getElementById("plan-name");
  const planRewardElement = document.getElementById("plan-reward");

  if (!planKey || planKey === "free") {
    planNameElement.textContent = "Free Plan";
  } else {
    const parts = planKey.split("_");
    const type = parts[1] === "nft" ? "ZMM" : parts[1].toUpperCase();
    const value = parts[2];
    planNameElement.textContent = `${type} $${value}`;
  }

  planRewardElement.textContent = reward;
}

// ▶️ ویڈیو سٹارٹ
function startTask(url, id) {
  startTimes[id] = new Date().getTime();
  window.open(url, '_blank');
  document.getElementById("verify-" + id).style.display = "inline-block";
}

// ✅ ویریفائی کرنے پر reward دینا
async function verifyTask(id) {
  const now = new Date().getTime();
  const elapsed = (now - startTimes[id]) / 1000;

  if (elapsed >= 30) {
    const userId = getUserId();
    const userRef = firebase.database().ref('users/' + userId);
    const snapshot = await userRef.get();
    const userData = snapshot.val();

    const plan = userData.active_plan;
    const reward = getRewardForPlan(plan);

    let currentBalance = parseFloat(userData.zmm_balance || 0);
    currentBalance += reward;

    await userRef.update({ zmm_balance: currentBalance });

    alert(`✅ Success! You got ${reward} Token(s).`);
    document.getElementById("verify-" + id).style.display = "none";
    document.getElementById(id).style.display = "none";

    localStorage.setItem("watchedTime-" + id, now);
  } else {
    alert("❌ Please watch at least 30 seconds before verifying.");
  }
}

// ⏱️ hide/show ٹاسک
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
