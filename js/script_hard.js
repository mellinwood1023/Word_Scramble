const backBtnEl = document.querySelector('#back');
backBtnEl?.addEventListener('click', (event) => {
  event.preventDefault();
  window.location.href = 'index.html';
});

const words = [
  "Abandoned", "Jackknife", "Flammable", "Carjacker", "Filmmaker",
  "Jellyfish", "Direction", "Zookeeper", "Xylophone", "Vaporize",
  "Aftershock", "Cryptic", "Whirlwind", "Backtrack", "Hazardous",
  "Overthink", "Misjudge", "Spaceship", "Recollect", "Nightmare",
  "Thunderbolt", "Blacklist", "Foreclose", "Earthquake", "Labyrinth",
  "Download", "Overpower", "Checkpoint", "Quadrangle", "Underworld"
];

const hints = [
  "Left behind", "Doubled up position", "Fire", "Criminal", "Movies",
  "Sea creature", "Northwest", "Animals", "Musical", "Evaporate",
  "Seismic echo", "Mysterious", "Fast storm", "Reverse steps", "Very risky",
  "Think too much", "Wrong estimate", "Space travel", "Try to remember", "Bad dream",
  "Electric strike", "Banned list", "Lose a house", "Ground shaking", "Maze",
  "Get a file", "Too strong", "Stop point", "Four-sided shape", "Criminal realm"
];


let currentIndex = 0;
let currentWord = "";
let currentHint = "";
let timeLeft = 60;
let timeInterval;

// DOM references
const countdownEl = document.getElementById('countdown');
const guessField = document.getElementById("guessField");
const submitBtn = document.getElementById("submitGuess");
const resultEl = document.getElementById("result");
const hintBtn = document.getElementById("hint");
const resetBtn = document.getElementById("reset");
const playAgainBtn = document.getElementById("playAgain");

// Score handling
let wins = parseInt(localStorage.getItem('wins')) || 0;
let losses = parseInt(localStorage.getItem('losses')) || 0;
document.getElementById('win').textContent = wins;
document.getElementById('lose').textContent = losses;

function handleWin() {
  wins++;
  document.getElementById('win').textContent = wins;
  localStorage.setItem('wins', wins);
}

function handleLoss() {
  losses++;
  document.getElementById('lose').textContent = losses;
  localStorage.setItem('losses', losses);
}

function resetScores() {
  wins = 0;
  losses = 0;
  localStorage.setItem('wins', wins);
  localStorage.setItem('losses', losses);
  document.getElementById('win').textContent = wins;
  document.getElementById('lose').textContent = losses;
}

function shuffle(str) {
  const arr = Array.from(str.toLowerCase());
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr.join('');
}

function startTimer() {
  clearInterval(timeInterval);
  timeLeft = 60;
  countdownEl.textContent = `${timeLeft} seconds left`;

  timeInterval = setInterval(() => {
    timeLeft--;
    countdownEl.textContent = `${timeLeft} seconds left`;

    if (timeLeft <= 0) {
      clearInterval(timeInterval);
      alert(`OUT OF TIME! The word was '${currentWord.toUpperCase()}'`);
      handleLoss();
      nextWord();
    }
  }, 1000);
}

function nextWord() {
  if (currentIndex >= words.length) {
    showFinalScore();
    return;
  }

  currentWord = words[currentIndex].toLowerCase();
  currentHint = hints[currentIndex];
  document.getElementById("word").textContent = shuffle(currentWord).toUpperCase();
  resultEl.textContent = '';
  resultEl.style.backgroundColor = "transparent";
  hintBtn.textContent = "Hint";
  guessField.value = '';

  currentIndex++;
  startTimer();
}

function checkGuess() {
  const userGuess = guessField.value.toLowerCase().trim();

  if (userGuess === currentWord) {
    resultEl.textContent = "Correct!";
    resultEl.style.backgroundColor = "green";
    handleWin();
    nextWord();
  } else {
    resultEl.textContent = "Try again!";
    resultEl.style.backgroundColor = "red";
  }

  guessField.value = '';
}

function checkHint() {
  alert("Hint: " + currentHint);
}

function showFinalScore() {
  clearInterval(timeInterval);
  document.getElementById("word").textContent = '';
  resultEl.innerHTML = `<strong>You've completed all words!</strong>`;
  playAgainBtn.style.display = "inline-block";
}

playAgainBtn?.addEventListener("click", () => {
  currentIndex = 0;
  playAgainBtn.style.display = "none";
  nextWord();
});

// Enter key triggers submit
guessField.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    checkGuess();
  }
});

// Button bindings
submitBtn.addEventListener("click", checkGuess);
hintBtn.addEventListener("click", checkHint);
resetBtn.addEventListener("click", resetScores);

// Start game
nextWord();
