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

  // اگر پلان سیٹ نہیں تو default 'free' رکھیں
  if (localStorage.getItem("active_plan") === null) {
    localStorage.setItem("active_plan", "free");
  }
}

// 🟢 پلان کے مطابق reward value return کریں
function getRewardForPlan(plan) {
  switch (plan) {
    case "plan10": return 2;
    case "plan25": return 4;
    case "plan50": return 6;
    case "plan100": return 12;
    case "plan500": return 20;
    default: return 1; // فری پلان
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
    // ✔️ پلان چیک کرو
    const userPlan = localStorage.getItem("active_plan");
    const reward = getRewardForPlan(userPlan);

    // 🎉 بیلنس اپڈیٹ
    let currentBalance = parseFloat(localStorage.getItem("zmm_balance"));
    currentBalance += reward;
    localStorage.setItem("zmm_balance", currentBalance.toFixed(2));

    alert(`✅ Success! You got ${reward} Token(s).`);
    document.getElementById("verify-" + id).style.display = "none";
    document.getElementById(id).style.display = "none";

    // hide task for 24 hours
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
