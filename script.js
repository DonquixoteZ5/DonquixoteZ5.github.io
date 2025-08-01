const board = document.getElementById("board");
const message = document.getElementById("message");
const phraseEl = document.getElementById("phrase");
const closeBtn = document.getElementById("closeBtn");
const replayBtn = document.getElementById("replay");
const canvas = document.getElementById("heartsCanvas");
const ctx = canvas.getContext("2d");

const audio = document.getElementById("bgAudio");
const playPauseBtn = document.getElementById("playPause");
const volumeSlider = document.getElementById("volume");
const muteBtn = document.getElementById("mute");

let firstCard = null;
let secondCard = null;
let lock = false;
let matches = 0;
let startedAudio = false;

const phrases = [
  "Eres mi lugar favorito.",
  "Contigo todo es hermoso ✨.",
  "Los dias son bonitos porque tu estas en mi vida 🥺.",
  "Eres la razón de mis sonrisas ❤️‍🩹.",
  "El simple hecho de tu existencia es super bello 💘."
];

// tamaño canvas
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

// corazones animados
class Heart {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = canvas.height + 20;
    this.size = 10 + Math.random() * 14;
    this.speed = 1 + Math.random() * 2;
    this.opacity = 0.8;
    this.life = 0;
    this.maxLife = 120 + Math.random() * 60;
    this.vx = (Math.random() - 0.5) * 0.5;
  }
  update() {
    this.y -= this.speed;
    this.x += this.vx;
    this.life++;
    this.opacity = Math.max(0, 0.8 * (1 - this.life / this.maxLife));
  }
  draw() {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.scale(this.size / 30, this.size / 30);
    ctx.globalAlpha = this.opacity;
    ctx.fillStyle = "#E83613";
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(-15, -15, -30, 10, 0, 30);
    ctx.bezierCurveTo(30, 10, 15, -15, 0, 0);
    ctx.fill();
    ctx.restore();
  }
  isDead() {
    return this.life >= this.maxLife;
  }
}

let hearts = [];
let animatingHearts = false;
function animateHearts() {
  if (!animatingHearts) return;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (Math.random() < 0.3) hearts.push(new Heart());
  hearts.forEach(h => {
    h.update();
    h.draw();
  });
  hearts = hearts.filter(h => !h.isDead());
  requestAnimationFrame(animateHearts);
}

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function createBoard() {
  board.innerHTML = "";
  firstCard = null;
  secondCard = null;
  lock = false;
  matches = 0;
  hearts = [];
  animatingHearts = false;
  ctx.clearRect(0,0,canvas.width,canvas.height);
  const symbols = ["🤠","💕","😘","💖","🌷","😻"];
  const pairSet = shuffle([...symbols, ...symbols]);
  pairSet.forEach((symbol, i) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.symbol = symbol;
    card.innerHTML = `
      <div class="inner">
        <div class="face front">>"<</div>
        <div class="face back">
          <div class="heart">${symbol}</div>
          <div class="text">Mi princesa</div>
        </div>
      </div>
    `;
    card.addEventListener("click", () => flipCard(card));
    board.appendChild(card);
  });
}

function flipCard(card) {
  // iniciar audio en el primer clic si no ha comenzado
  if (!startedAudio) {
    audio.play().catch(() => {}); // el usuario ya interactuó
    updatePlayButton();
    startedAudio = true;
  }

  if (lock) return;
  if (card === firstCard) return;
  if (card.classList.contains("matched")) return;

  card.classList.add("flipped");

  if (!firstCard) {
    firstCard = card;
    return;
  }

  secondCard = card;
  lock = true;

  const a = firstCard.dataset.symbol;
  const b = secondCard.dataset.symbol;

  if (a === b) {
    firstCard.classList.add("matched");
    secondCard.classList.add("matched");
    matches += 1;
    resetTurn();
    if (matches === 6) {
      setTimeout(triggerWin, 700);
    }
  } else {
    setTimeout(() => {
      firstCard.classList.remove("flipped");
      secondCard.classList.remove("flipped");
      resetTurn();
    }, 900);
  }
}

function resetTurn() {
  [firstCard, secondCard] = [null, null];
  lock = false;
}

function triggerWin() {
  const phrase = phrases[Math.floor(Math.random() * phrases.length)];
  phraseEl.textContent = phrase;
  showMessage();
  startHearts();
}

function showMessage() {
  message.classList.remove("hidden");
}

function hideMessage() {
  message.classList.add("hidden");
  stopHearts();
}

closeBtn.addEventListener("click", () => {
  hideMessage();
});

replayBtn.addEventListener("click", () => {
  hideMessage();
  createBoard();
});

// audio: controles
function updatePlayButton() {
  if (audio.paused) {
    playPauseBtn.textContent = "▶️";
  } else {
    playPauseBtn.textContent = "⏸️";
  }
}

playPauseBtn.addEventListener("click", () => {
  if (audio.paused) {
    audio.play().catch(() => {});
  } else {
    audio.pause();
  }
  updatePlayButton();
});

volumeSlider.addEventListener("input", e => {
  audio.volume = parseFloat(e.target.value);
  if (audio.volume === 0) {
    muteBtn.textContent = "🔇";
  } else {
    muteBtn.textContent = "🔈";
  }
});

muteBtn.addEventListener("click", () => {
  if (audio.muted) {
    audio.muted = false;
    muteBtn.textContent = "🔈";
    volumeSlider.value = audio.volume;
  } else {
    audio.muted = true;
    muteBtn.textContent = "🔇";
    volumeSlider.value = 0;
  }
});

// valores iniciales
volumeSlider.value = 0.5;
audio.volume = 0.5;

audio.addEventListener("play", updatePlayButton);
audio.addEventListener("pause", updatePlayButton);

// animación de corazones
function startHearts() {
  if (animatingHearts) return;
  animatingHearts = true;
  animateHearts();
}

function stopHearts() {
  animatingHearts = false;
  hearts = [];
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// inicio
createBoard();
