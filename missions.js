let startTimes = {};

const TASK_IDS = ['task1', 'task2', 'task3', 'task4'];
const HIDE_DURATION_HOURS = 24; // آپ یہاں 12 بھی کر سکتے ہو

// یہ function چیک کرے گا کہ ویڈیو hide ہونی چاہیے یا نہیں
function checkTaskVisibility() {
  const now = new Date().getTime();

  TASK_IDS.forEach(id => {
    const taskElement = document.getElementById(id);
    const lastWatched = localStorage.getItem("watchedTime-" + id);

    if (lastWatched) {
      const diff = now - parseInt(lastWatched); // milliseconds
      const hoursPassed = diff / (1000 * 60 * 60); // convert to hours

      if (hoursPassed < HIDE_DURATION_HOURS) {
        taskElement.style.display = "none"; // ابھی hide رہے گا
      } else {
        // 24 گھنٹے ہو گئے، دوبارہ show کرو اور پرانا localStorage ہٹاؤ
        taskElement.style.display = "block";
        localStorage.removeItem("watchedTime-" + id);
      }
    } else {
      taskElement.style.display = "block"; // پہلی بار ہے یا reset ہو چکا
    }
  });
}

function startTask(url, id) {
  startTimes[id] = new Date().getTime(); // Save start time
  window.open(url, '_blank'); // Open YouTube video
  document.getElementById("verify-" + id).style.display = "inline-block";
}

function verifyTask(id) {
  const now = new Date().getTime();
  const elapsed = (now - startTimes[id]) / 1000; // time in seconds

  if (elapsed >= 30) {
    alert("✅ Success! 1 Token Added.");
    document.getElementById("verify-" + id).style.display = "none";

    // ✅ ویڈیو کو hide کریں، اور وقت save کریں
    localStorage.setItem("watchedTime-" + id, now);
    document.getElementById(id).style.display = "none";
  } else {
    alert("❌ Please watch at least 30 seconds before verifying.");
  }
}

// جب page load ہو → ویڈیوز چیک کریں کون سی hide ہونی چاہیے
document.addEventListener("DOMContentLoaded", checkTaskVisibility);
