let startTimes = {};

const TASK_IDS = ['task1', 'task2', 'task3', 'task4'];
const HIDE_DURATION_HOURS = 24;

document.addEventListener("DOMContentLoaded", () => {
  checkTaskVisibility();
  initializeBalance();
});

// ✅ بیلنس initialize کریں
function initializeBalance() {
  if (localStorage.getItem("zmm_balance") === null) {
    localStorage.setItem("zmm_balance", "0");
  }

  if (localStorage.getItem("active_plan") === null) {
    localStorage.setItem("active_plan", "free");
  }
}

// 🟢 پلان کے مطابق reward value return کریں
function getRewardForPlan(planKey) {
  if (!planKey || planKey === "free") return 1;

  // Example planKey: "plan_usdt_25"
  const parts = planKey.split("_");
  if (parts.length !== 3) return 1;

  const amount = parseFloat(parts[2]);
  if (isNaN(amount)) return 1;

  // Define reward by amount
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

// ▶️ ویڈیو سٹارٹ
function startTask(url, id) {
  startTimes[id] = new Date().getTime();
  window.open(url, '_blank');
  document.getElementById("verify-" + id).style.display = "inline-block";
}

// ✅ ویریفائی کرنے پر reward دینا
function verifyTask(id) {
  const now = new Date().getTime();
  const elapsed = (now - startTimes[id]) / 1000;

  if (elapsed >= 30) {
    const plan = localStorage.getItem("active_plan");
    const reward = getRewardForPlan(plan);

    let currentBalance = parseFloat(localStorage.getItem("zmm_balance"));
    currentBalance += reward;
    localStorage.setItem("zmm_balance", currentBalance.toFixed(2));

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
