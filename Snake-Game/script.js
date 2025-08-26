// ===== Config =====
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
const tileSize = 20; // grid cell size
const tilesX = canvas.width / tileSize; // 400 / 20 = 20
const tilesY = canvas.height / tileSize; // 400 / 20 = 20

const scoreEl = document.getElementById("score");
const highScoreEl = document.getElementById("highScore");
const pauseBtn = document.getElementById("pauseBtn");
const restartBtn = document.getElementById("restartBtn");

// ===== State =====
let snake; // array of {x, y}
let dir; // {x, y} velocity per tick
let nextDir; // queued direction
let food; // {x, y}
let score;
let highScore = parseInt(localStorage.getItem("snakeHighScore") || "0", 10);
let running = false;
let paused = false;
let speedMs; // interval ms (speeds up as you grow)
let loopId = null;

highScoreEl.textContent = highScore.toString();

// ===== Helpers =====
function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function spawnFood() {
  while (true) {
    const f = { x: randInt(0, tilesX - 1), y: randInt(0, tilesY - 1) };
    if (!snake.some(s => s.x === f.x && s.y === f.y)) {
      return f;
    }
  }
}

function resetGame() {
  snake = [
    { x: 9, y: 10 },
    { x: 8, y: 10 },
    { x: 7, y: 10 }
  ];
  dir = { x: 1, y: 0 };
  nextDir = { x: 1, y: 0 };
  food = spawnFood();
  score = 0;
  scoreEl.textContent = score.toString();
  speedMs = 200; // start speed
  running = true;
  paused = false;
  clearInterval(loopId);
  loopId = setInterval(tick, speedMs);
}

// ===== Game Loop =====
function tick() {
  if (!running || paused) return;

  dir = nextDir;
  const head = { x: snake[0].x + dir.x, y: snake[0].y + dir.y };

  // collision with wall
  if (head.x < 0 || head.x >= tilesX || head.y < 0 || head.y >= tilesY) {
    return gameOver();
  }

  // collision with self
  if (snake.some(s => s.x === head.x && s.y === head.y)) {
    return gameOver();
  }

  snake.unshift(head);

  // check food
  if (head.x === food.x && head.y === food.y) {
    score++;
    scoreEl.textContent = score.toString();

    if (score > highScore) {
      highScore = score;
      highScoreEl.textContent = highScore.toString();
      localStorage.setItem("snakeHighScore", highScore.toString());
    }

    food = spawnFood();

    // speed up slightly
    if (speedMs > 60) {
      speedMs -= 5;
      clearInterval(loopId);
      loopId = setInterval(tick, speedMs);
    }
  } else {
    snake.pop();
  }

  draw();
}

// ===== Drawing =====
function draw() {
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // draw snake
  ctx.fillStyle = "lime";
  snake.forEach(s => {
    ctx.fillRect(s.x * tileSize, s.y * tileSize, tileSize, tileSize);
  });

  // draw food
  ctx.fillStyle = "red";
  ctx.fillRect(food.x * tileSize, food.y * tileSize, tileSize, tileSize);
}

// ===== Controls =====
document.addEventListener("keydown", e => {
  if (e.key === "ArrowUp" && dir.y === 0) nextDir = { x: 0, y: -1 };
  else if (e.key === "ArrowDown" && dir.y === 0) nextDir = { x: 0, y: 1 };
  else if (e.key === "ArrowLeft" && dir.x === 0) nextDir = { x: -1, y: 0 };
  else if (e.key === "ArrowRight" && dir.x === 0) nextDir = { x: 1, y: 0 };
  else if (e.key === " ") togglePause(); // space for pause
});

pauseBtn.addEventListener("click", togglePause);
restartBtn.addEventListener("click", resetGame);

function togglePause() {
  if (!running) return;
  paused = !paused;
  pauseBtn.textContent = paused ? "Resume" : "Pause";
}

// ===== Game Over =====
function gameOver() {
  running = false;
  clearInterval(loopId);
  alert("Game Over! Your score: " + score);
}

// ===== Start =====
resetGame();
draw();
