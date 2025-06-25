// main.js

document.addEventListener('DOMContentLoaded', () => {
  // Dummy user data
  let balance = 139.88;
  let rewardAmount = 33;
  let level = 61;
  let power = 73;
  let steps = 0.03;
  let nextTime = 4 * 3600; // 4 hours

  // Select DOM elements
  const balanceEl = document.getElementById('balance');
  const rewardEl = document.getElementById('rewardAmount');
  const levelEl = document.getElementById('userLevel');
  const powerEl = document.getElementById('userPower');
  const stepsEl = document.getElementById('steps');
  const timerEl = document.getElementById('timer');
  const manageBtn = document.getElementById('manageBtn');
  const manageSection = document.getElementById('manageSection');

  // Initialize content
  balanceEl.textContent = balance.toFixed(2);
  rewardEl.textContent = `+${rewardAmount}`;
  levelEl.textContent = level;
  powerEl.textContent = `${power}%`;
  stepsEl.textContent = `${steps} km`;

  let timerInterval = setInterval(() => {
    const h = Math.floor(nextTime / 3600);
    const m = Math.floor((nextTime % 3600) / 60);
    const s = nextTime % 60;
    timerEl.textContent = `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
    nextTime--;
    if (nextTime < 0) clearInterval(timerInterval);
  }, 1000);

  manageBtn.addEventListener('click', () => {
    manageSection.style.display = manageSection.style.display === 'none' ? 'block' : 'none';
  });
});
