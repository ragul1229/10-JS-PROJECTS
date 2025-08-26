let timer;
let totalSeconds;
let isPaused = false;

const display = document.getElementById("display");
const message = document.getElementById("message");

document.getElementById("start").addEventListener("click", () => {
  if (!isPaused) {
    const minutes = parseInt(document.getElementById("minutes").value) || 0;
    const seconds = parseInt(document.getElementById("seconds").value) || 0;
    totalSeconds = minutes * 60 + seconds;
  }

  if (totalSeconds > 0) {
    isPaused = false;
    clearInterval(timer);
    timer = setInterval(updateTimer, 1000);
  }
});

document.getElementById("pause").addEventListener("click", () => {
  clearInterval(timer);
  isPaused = true;
});

document.getElementById("reset").addEventListener("click", () => {
  clearInterval(timer);
  display.textContent = "00:00";
  message.textContent = "";
  isPaused = false;
});

function updateTimer() {
  if (totalSeconds <= 0) {
    clearInterval(timer);
    display.textContent = "00:00";
    message.textContent = "⏰ Time’s up!";
    return;
  }

  totalSeconds--;
  let minutes = Math.floor(totalSeconds / 60);
  let seconds = totalSeconds % 60;

  display.textContent = 
    String(minutes).padStart(2, "0") + ":" + String(seconds).padStart(2, "0");
}
