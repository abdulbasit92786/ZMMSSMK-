let startTimes = {};

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
    // Optional: Save that user completed this video so they can't repeat
    localStorage.setItem("watched-" + id, "done");
  } else {
    alert("❌ Please watch at least 30 seconds before verifying.");
  }
}
