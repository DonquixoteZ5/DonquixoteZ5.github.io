const gameArea = document.getElementById("game-area");
const scoreEl = document.getElementById("score");
const gameScreen = document.getElementById("game-screen");
const winScreen = document.getElementById("win-screen");
const finalScreen = document.getElementById("final-screen");
const floatingHearts = document.getElementById("floating-hearts");

let score = 0;
let gameActive = true;

const emojis = ["❤️", "💖", "💘", "💕", "😍", "🥰", "✨", "🌹"];

class MovingEmoji {
  constructor() {
    this.el = document.createElement("div");
    this.el.classList.add("emoji");
    this.el.textContent = emojis[Math.floor(Math.random() * emojis.length)];

    this.size = 32;
    this.x = Math.random() * (gameArea.clientWidth - this.size);
    this.y = Math.random() * (gameArea.clientHeight - this.size);
    this.vx = (Math.random() - 0.5) * 4;
    this.vy = (Math.random() - 0.5) * 4;

    this.el.style.left = this.x + "px";
    this.el.style.top = this.y + "px";

    this.el.addEventListener("click", () => this.catch());

    gameArea.appendChild(this.el);
    this.update();
  }

  update() {
    if (!gameActive) return;

    this.x += this.vx;
    this.y += this.vy;

    if (this.x <= 0 || this.x >= gameArea.clientWidth - this.size) this.vx *= -1;
    if (this.y <= 0 || this.y >= gameArea.clientHeight - this.size) this.vy *= -1;

    this.el.style.left = this.x + "px";
    this.el.style.top = this.y + "px";

    requestAnimationFrame(() => this.update());
  }

  catch() {
    if (!gameActive) return;
    score++;
    scoreEl.textContent = `Corazones atrapados: ${score} / 10`;
    this.el.remove();

    if (score >= 10) {
      gameActive = false;
      showWinScreen();
    }
  }
}

function spawnEmoji() {
  if (!gameActive) return;
  new MovingEmoji();
  setTimeout(spawnEmoji, 1000);
}

function showWinScreen() {
  gameScreen.classList.add("hidden");
  winScreen.classList.remove("hidden");

  // después de 3 segundos, pasa a la pantalla final
  setTimeout(() => {
    winScreen.classList.add("hidden");
    finalScreen.classList.remove("hidden");
    startFloatingHearts();
  }, 3000);
}

function startFloatingHearts() {
  setInterval(() => {
    const heart = document.createElement("div");
    heart.classList.add("heart");
    heart.textContent = "❤️";
    heart.style.left = Math.random() * 90 + "%";
    heart.style.fontSize = Math.random() * 20 + 20 + "px";
    floatingHearts.appendChild(heart);

    setTimeout(() => heart.remove(), 5000);
  }, 500);
}

// Iniciar juego
spawnEmoji();
