const grid = document.getElementById("grid");
const message = document.getElementById("love-message");
const song = document.getElementById("song-section");
const restart = document.getElementById("restart");

const totalCards = 12;
const messageIndex = Math.floor(Math.random() * totalCards);
let songIndex;
do {
  songIndex = Math.floor(Math.random() * totalCards);
} while (songIndex === messageIndex);

let foundMessage = false;
let foundSong = false;

function createGrid() {
  grid.innerHTML = "";
  for (let i = 0; i < totalCards; i++) {
    const card = document.createElement("div");
    card.className = "card";
    card.textContent = "🎴";

    card.addEventListener("click", () => {
      if (i === messageIndex && !foundMessage) {
        foundMessage = true;
        card.textContent = "💌";
        message.classList.remove("hidden");
      } else if (i === songIndex && !foundSong) {
        foundSong = true;
        card.textContent = "🎶";
        song.classList.remove("hidden");
        document.getElementById("game-container").style.display = "none";
      } else {
        card.textContent = "❌";
        card.style.pointerEvents = "none";
        card.style.opacity = 0.4;
      }

      if (foundMessage && foundSong) {
        restart.classList.remove("hidden");
      }
    });

    grid.appendChild(card);
  }
}

function restartGame() {
  foundMessage = false;
  foundSong = false;
  message.classList.add("hidden");
  song.classList.add("hidden");
  restart.classList.add("hidden");
  document.getElementById("game-container").style.display = "block";
  createGrid();
}

createGrid();
