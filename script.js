function mostrarMensaje() {
  alert("Gracias por estar en mi vida. ¡Te amo! ❤️");
}

const audio = document.getElementById("background-music");

function toggleAudio() {
  if (audio.paused) {
    audio.play();
  } else {
    audio.pause();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  audio.volume = 0.5;
  initStars();
});

// Fondo de estrellas
function initStars() {
  const canvas = document.getElementById('star-canvas');
  const ctx = canvas.getContext('2d');
  let stars = [];

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function createStars() {
    stars = [];
    for (let i = 0; i < 100; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.5,
        d: Math.random() * 100
      });
    }
  }

  function drawStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";
    ctx.shadowBlur = 2;
    ctx.shadowColor = "white";
    for (let i = 0; i < stars.length; i++) {
      const s = stars[i];
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2, true);
      ctx.fill();
    }
    moveStars();
  }

  let angle = 0;

  function moveStars() {
    angle += 0.01;
    for (let i = 0; i < stars.length; i++) {
      const s = stars[i];
      s.y += Math.cos(angle + s.d) + 1;
      s.x += Math.sin(angle) * 0.5;

      if (s.x > canvas.width || s.x < 0 || s.y > canvas.height) {
        s.x = Math.random() * canvas.width;
        s.y = -10;
      }
    }
  }

  resize();
  createStars();
  setInterval(drawStars, 50);
  window.addEventListener('resize', resize);
}

// Corazón flotante
function createHeart(x, y) {
  const heart = document.createElement("div");
  heart.classList.add("heart");
  heart.style.left = x - 10 + "px";
  heart.style.top = y - 10 + "px";
  document.body.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, 2000);
}

// Detectar clic o toque y crear corazón
document.addEventListener("click", (e) => {
  const x = e.clientX || e.touches?.[0]?.clientX || window.innerWidth / 2;
  const y = e.clientY || e.touches?.[0]?.clientY || window.innerHeight / 2;
  createHeart(x, y);
});
