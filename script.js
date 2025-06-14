// Mensajes de amor al hacer clic
document.addEventListener('click', () => {
  const mensaje = document.createElement('div');
  mensaje.textContent = Math.random() > 0.5 ? 'Te amo 💘' : 'I love you 💖';
  mensaje.style.position = 'absolute';
  mensaje.style.left = Math.random() * window.innerWidth + 'px';
  mensaje.style.top = Math.random() * window.innerHeight + 'px';
  mensaje.style.color = 'hotpink';
  mensaje.style.fontSize = '20px';
  mensaje.style.fontWeight = 'bold';
  mensaje.style.pointerEvents = 'none';
  mensaje.style.userSelect = 'none';
  document.body.appendChild(mensaje);

  // Animación de cascada
  let y = parseFloat(mensaje.style.top);
  const interval = setInterval(() => {
    y += 2;
    mensaje.style.top = y + 'px';
    if (y > window.innerHeight) {
      clearInterval(interval);
      mensaje.remove();
    }
  }, 16);
});

// Función para pausar/reanudar la música
function toggleAudio() {
  const audio = document.getElementById('audio');
  if (audio.paused) {
    audio.play();
  } else {
    audio.pause();
  }
}
