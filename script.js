const frases = [
  "Te amo 💖", "Eres mi sol ☀️", "Mi vida 🌹", "Amor eterno 💘",
  "Mi cielo 🥰", "Contigo siempre 💫", "Te extraño 🥺", "Mi razón ❤️",
  "Para siempre 😘", "Mi alegría 😍", "Eres especial 🌟", "Mi mundo 🌎",
  "Tú y yo 💑", "Eres mi todo 💞", "Gracias por existir 🤧", "Te llevo en mi corazón 💓",
  "Nuestro amor no tiene fin 😽", "Siempre juntos 😻", "Mi inspiración ✨",
  "Eres mi paz 🫀", "Solo tú 💗", "Contigo, todo es mejor 🎉", "Eres arte 🎨", "Mi sonrisa eres tú 😊",
  "Eres mi melodía favorita 🎶", "Mi compañera de vida 👩‍❤️‍👨",
  "Nuestro amor es magia 🫰", "El amor de mi vida 💝", "Mi media naranja 🍊",
  "Contigo hasta el infinito 🚀", "Eres mi destino 🔮", "Mi ternura 🧸",
  "Mi corazón es tuyo 💘", "Nuestro amor es real ♥️", "Solo tú me haces feliz 😄",
  "Amarte es fácil 😍", "Nunca te dejaré 🤗",
  "Te pienso siempre 🧠", "Eres mi sueño hecho realidad 🌙", "Eres mi amanecer 🌅",
  "Mi todo en un solo ser 🧩", "Contigo aprendí a amar ❤️‍🔥",
  "Mi vida cambió contigo 🔁", "Eres mi historia favorita 📖", "Tú me completas 🧷",
  "Mi universo entero 🌌", "Eres lo mejor que me pasó 🎁", "Amor sin condiciones 🤍",
  "Nuestro amor brilla más que el sol ☀️✨", "Me haces sentir bonito 🥺🥰",
  "Tú eres mi canción 🎼", "Amarte es mi verdad 🥰", "Me haces fuerte 💪",
  "Mi dulce amor 🍬", "Siempre en mi mente 💭", "Contigo lo tengo todo 🧑🏻‍❤️‍👩🏻",
  "Mi poesía viviente 📜", "Mi motor diario ⚙️", "Te elijo una y otra vez 🔁",
  "Mi niña de ojitos lindos 😻", "Eres mi chiquita hermosa 😘" , "Contigo me siento vivo 🫀",
  "Siempre tú ✨", "Eres mi estrellita y mi todo 💞", "Nuestro amor es sincero 💟" , "mi pequeña princesa 💗" ,
  "mi preciosa 💘 " , "Eres mi curita ❤️‍🩹" , "Gracias por existir amor mio 💖" , "Te amo demasiado 🥺💗" 
];


// Genera una palabra o corazón en posición aleatoria
function crearElementoFlotante() {
  const esCorazon = Math.random() < 0.5;
  const el = document.createElement("div");

  if (esCorazon) {
    el.classList.add("heart");
  } else {
    el.classList.add("word");
    el.textContent = frases[Math.floor(Math.random() * frases.length)];
  }

  el.style.top = Math.random() * 100 + "vh";
  el.style.left = Math.random() * 100 + "vw";
  el.style.fontSize = (Math.random() * 1.5 + 1) + "rem";
  el.style.animationDuration = (8 + Math.random() * 4) + "s";

  document.getElementById("floating-elements").appendChild(el);

  // Eliminar después de 12 segundos
  setTimeout(() => el.remove(), 12000);
}

// Generar varios elementos al inicio
for (let i = 0; i < 40; i++) {
  setTimeout(crearElementoFlotante, i * 200);
}

// Seguir generando elementos aleatorios
setInterval(crearElementoFlotante, 800);

// 🎵 Control de música
const audio = document.getElementById("audio");
const playBtn = document.getElementById("playPause");

playBtn.addEventListener("click", () => {
  if (audio.paused) {
    audio.play();
    playBtn.textContent = "⏸️";
  } else {
    audio.pause();
    playBtn.textContent = "▶️";
  }
});
