const backBtnEl = document.querySelector('#back');

// Return to home
backBtnEl?.addEventListener('click', (event) => {
  event.preventDefault();
  window.location.href = 'index.html';
});

// Word list and hints
const words = [
  "Eagle", "Quick", "Pilot", "Juice", "Crazy",
  "Stark", "Joist", "Blink", "Truck", "Point",
  "River", "Apple", "Table", "Chair", "Light",
  "Mouse", "Plant", "Phone", "Beach", "Smile",
  "Train", "Bread", "Watch", "Cloud", "Green",
  "Heart", "Dance", "Magic", "Brush", "Sleep"
];

const hints = [
  "American Symbol", "Not slow", "Flying", "Orange", "Wild",
  "White", "Beam", "Eyes", "Vehicle", "Sharp",
  "Flowing water", "Fruit", "Furniture", "Seat", "Bright",
  "Computer device", "Grows", "Call device", "Sandy place", "Happy face",
  "Locomotive", "Sandwich base", "Tells time", "Sky fluff", "Color of grass",
  "Love organ", "Move to music", "Wand stuff", "For painting", "Night rest"
];

// DOM elements
const countdownEl = document.getElementById('countdown');
const guessField = document.getElementById("guessField");
const submitBtn = document.getElementById("submitGuess");
const resultEl = document.getElementById("result");
const hintBtn = document.getElementById("hint");
const resetBtn = document.getElementById("reset");
const playAgainBtn = document.getElementById("playAgain");
const winDisplay = document.getElementById("win");
const loseDisplay = document.getElementById("lose");

// Game state
let wins = 0;
let losses = 0;
let timeLeft = 20;
let timeInterval;
let currentIndex = 0;
let currentWord = "";
let currentHint = "";

function updateScoresUI() {
  winDisplay.textContent = wins;
  loseDisplay.textContent = losses;
}

// Shuffle helper
function shuffle(str) {
  const arr = Array.from(str.toLowerCase());
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr.join('');
}

// Timer logic
function startTimer() {
  clearInterval(timeInterval);
  timeLeft = 20;
  countdownEl.textContent = `${timeLeft} seconds left`;

  timeInterval = setInterval(() => {
    timeLeft--;
    countdownEl.textContent = `${timeLeft} seconds left`;

    if (timeLeft <= 0) {
      clearInterval(timeInterval);
      alert(`Time's up! The word was "${currentWord.toUpperCase()}"`);
      handleLoss();
      nextWord();
    }
  }, 1000);
}

// Load a new word
function nextWord() {
  if (currentIndex >= words.length) {
    showFinalScore();
    return;
  }

  currentWord = words[currentIndex].toLowerCase();
  currentHint = hints[currentIndex];
  document.getElementById("word").textContent = shuffle(currentWord).toUpperCase();
  guessField.value = '';
  resultEl.textContent = '';
  resultEl.style.backgroundColor = 'transparent';
  hintBtn.textContent = 'Hint';
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

function handleWin() {
  wins++;
  updateScoresUI();
}

function handleLoss() {
  losses++;
  updateScoresUI();
}

function resetScores() {
  wins = 0;
  losses = 0;
  updateScoresUI();
}

function showFinalScore() {
  clearInterval(timeInterval);
  document.getElementById("word").textContent = '';
  resultEl.innerHTML = `<strong>You've completed all words!</strong>`;
  playAgainBtn.style.display = "inline-block";
}

// Button bindings
guessField.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    checkGuess();
  }
});

submitBtn.addEventListener("click", checkGuess);
hintBtn.addEventListener("click", checkHint);
resetBtn.addEventListener("click", resetScores);

playAgainBtn.addEventListener("click", () => {
  currentIndex = 0;
  resetScores();
  playAgainBtn.style.display = "none";
  nextWord();
});

// Start game
updateScoresUI();
nextWord();
