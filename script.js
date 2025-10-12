const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];
let textParticles = [];
let forming = false;
let lastMouseX = null;
let lastMouseY = null;
let shakeDetected = false;
let mouse = { x: 0, y: 0, active: false };

const COLORS = ['#4cc9f0', '#f72585', '#b5179e', '#7209b7', '#4895ef', '#4361ee'];

const MESSAGES = [
  'Feliz Cumpleaños 💙',
  'Eres mi cielo 🌌',
  'Te amo 💫',
  'Siempre juntos 💕',
  'Mi razón de sonreír ✨',
  'Mi vida eres tú 💖',
  'Eres mi sueño hecho realidad 🌙',
  'Te adoro 💞',
  'Mi estrella favorita ⭐',
  'Gracias por existir 💝',
  'Mi universo eres tú 🌌',
  'Feliz día, amor 💐',
  'Eres mi felicidad 🌈',
  'Te pienso cada segundo 💭',
  'Eres mi corazón latiendo 💓',
  'Mi amor infinito ♾️',
  'Eres magia pura ✨',
  'Tú iluminas mi mundo 🌟',
  'Mi mejor regalo eres tú 🎁',
  'Feliz cumple, mi vida 🎂',
  'Cada día te amo más 💗',
  'Mi sonrisa tiene tu nombre 😊',
  'Eres mi luz en la oscuridad 🔥',
  'Eres el motivo de mis días 🌅',
  'Te amo hasta las estrellas 🌠',
  'Mi corazón late por ti ❤️',
  'Eres mi paz y mi locura 💌',
  'Tu amor es mi tesoro 💎',
  'Feliz cumpleaños, amor de mi vida 🎉',
  'Eres el amor más bonito del universo 💖',
  'Tu sonrisa ilumina mi alma 🌞',
  'Gracias por hacerme tan feliz 🌺',
  'Eres mi inspiración 🌸',
  'Contigo todo es mejor 💫',
  'Mi razón para seguir 💙',
  'Tú y yo por siempre 💍',
  'Mi amor eterno 💞',
  'Tu mirada me enamora cada día 👁️‍🗨️',
  'Mi mundo gira por ti 🌍',
  'Te amo sin medida ❤️‍🔥',
  'Eres mi sol y mis estrellas ☀️🌟',
  'Mi princesa hermosa 👑',
  'Mi todo 💜',
  'Tú eres mi destino 💫',
  'Gracias por ser mi razón 💐',
  'Mi corazón es tuyo 💌',
  'Feliz cumpleaños, preciosa 🎈',
  'Eres arte en movimiento 🎨',
  'Tú haces brillar mi vida ✨',
  'Eres mi melodía favorita 🎶',
  'Mi amor por ti no tiene fin 💞',
  'Feliz cumpleaños, reina de mi mundo 👑🎂',
  'Tu risa es mi canción favorita 🎵',
  'Mi persona favorita en el universo 🌠',
  'Eres mi calma y mi locura 🌊',
  'Te amo con todo mi ser 💖',
  'Mi amor brilla contigo ✨',
  'Eres mi hogar 🏡',
  'Siempre tú 💘',
  'Eres el milagro más lindo 🌹',
  'Mi alma te reconoce 💞',
  'Feliz cumpleaños, mi amor eterno 💙'
];

// Crear partículas flotantes
function createParticles(count) {
  particles = [];
  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 2 + 1,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
    });
  }
}

// Dibujar partículas
function drawParticles(arr) {
  arr.forEach(p => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fillStyle = p.color;
    ctx.shadowBlur = 15;
    ctx.shadowColor = p.color;
    ctx.fill();
  });
}

// Movimiento libre
function updateParticles(arr) {
  arr.forEach(p => {
    p.x += p.vx;
    p.y += p.vy;

    if (mouse.active) {
      const dx = p.x - mouse.x;
      const dy = p.y - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 80) {
        const angle = Math.atan2(dy, dx);
        p.vx += Math.cos(angle) * 0.3;
        p.vy += Math.sin(angle) * 0.3;
      }
    }

    if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
  });
}

// Crear partículas con forma de texto
function formText(msg) {
  const tempCanvas = document.createElement('canvas');
  const tempCtx = tempCanvas.getContext('2d');
  tempCanvas.width = canvas.width;
  tempCanvas.height = canvas.height;

  const fontSize = Math.min(canvas.width / 10, 120);
  tempCtx.fillStyle = '#fff';
  tempCtx.textAlign = 'center';
  tempCtx.textBaseline = 'middle';
  tempCtx.font = `bold ${fontSize}px Poppins`;
  tempCtx.fillText(msg, canvas.width / 2, canvas.height / 2);

  const imageData = tempCtx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;
  textParticles = [];

  for (let y = 0; y < canvas.height; y += 6) {
    for (let x = 0; x < canvas.width; x += 6) {
      const index = (y * canvas.width + x) * 4;
      if (data[index + 3] > 128) {
        textParticles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          targetX: x,
          targetY: y,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
          size: 2,
          vx: 0,
          vy: 0
        });
      }
    }
  }

  forming = true;
}

// Dispersar partículas
function disperseParticles() {
  textParticles.forEach(p => {
    p.vx = (Math.random() - 0.5) * 8;
    p.vy = (Math.random() - 0.5) * 8;
  });
  forming = false;
  setTimeout(() => (textParticles = []), 1500);
}

// Detectar movimiento fuerte o agitación
function detectMouseShake(e) {
  if (lastMouseX !== null && lastMouseY !== null) {
    const dx = e.clientX - lastMouseX;
    const dy = e.clientY - lastMouseY;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist > 120 && forming) disperseParticles();
  }
  lastMouseX = e.clientX;
  lastMouseY = e.clientY;
}

window.addEventListener('devicemotion', e => {
  const acc = e.accelerationIncludingGravity;
  const totalAcc = Math.sqrt(acc.x * acc.x + acc.y * acc.y + acc.z * acc.z);
  if (totalAcc > 25 && forming && !shakeDetected) {
    shakeDetected = true;
    disperseParticles();
    setTimeout(() => (shakeDetected = false), 1500);
  }
});

// Animación
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (forming && textParticles.length) {
    textParticles.forEach(p => {
      p.x += (p.targetX - p.x) * 0.05;
      p.y += (p.targetY - p.y) * 0.05;
    });
    drawParticles(textParticles);
  } else {
    updateParticles(particles);
    drawParticles(particles);
  }

  requestAnimationFrame(animate);
}

// Eventos
canvas.addEventListener('click', () => {
  if (!forming) {
    const randomMsg = MESSAGES[Math.floor(Math.random() * MESSAGES.length)];
    formText(randomMsg);
  }
});

canvas.addEventListener('mousemove', e => {
  detectMouseShake(e);
  mouse.x = e.clientX;
  mouse.y = e.clientY;
  mouse.active = true;
});

canvas.addEventListener('mouseleave', () => (mouse.active = false));

canvas.addEventListener('touchmove', e => {
  const t = e.touches[0];
  mouse.x = t.clientX;
  mouse.y = t.clientY;
  mouse.active = true;
});

// Inicialización
createParticles(400);
animate();

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  createParticles(400);
});
