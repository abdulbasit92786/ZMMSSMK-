let startTimes = {};

const TASK_IDS = ['task1', 'task2', 'task3', 'task4'];
const HIDE_DURATION_HOURS = 24;

// 🔁 جب پیج لوڈ ہو → ویڈیو visibility چیک کریں
document.addEventListener("DOMContentLoaded", () => {
  checkTaskVisibility();
  initializeBalance(); // Ensure balance exists
});

// 👉 بیلنس initialize کریں اگر موجود نہیں
function initializeBalance() {
  if (localStorage.getItem("zmm_balance") === null) {
    localStorage.setItem("zmm_balance", "0");
  }
}

// ✅ ٹاسک کو کھولیں اور verify بٹن شو کریں
function startTask(url, id) {
  startTimes[id] = new Date().getTime();
  window.open(url, '_blank');
  document.getElementById("verify-" + id).style.display = "inline-block";
}

// ✅ verify کرنے پر 1 token add کریں
function verifyTask(id) {
  const now = new Date().getTime();
  const elapsed = (now - startTimes[id]) / 1000;

  if (elapsed >= 30) {
    alert("✅ Success! 1 Token Added.");
    document.getElementById("verify-" + id).style.display = "none";
    document.getElementById(id).style.display = "none";

    // hide for 24 hours
    localStorage.setItem("watchedTime-" + id, now);

    // بیلنس میں 1 ٹوکن add کریں
    let currentBalance = parseFloat(localStorage.getItem("zmm_balance"));
    currentBalance += 1;
    localStorage.setItem("zmm_balance", currentBalance.toFixed(2));
  } else {
    alert("❌ Please watch at least 30 seconds before verifying.");
  }
}

// ⏱️ hide/show ٹاسک depending on last watch
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
