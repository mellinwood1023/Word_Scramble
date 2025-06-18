const backBtnEl = document.querySelector('#back');
backBtnEl?.addEventListener('click', (event) => {
  event.preventDefault();
  window.location.href = 'index.html';
});

const words = [
  "Ability", "College", "Discuss", "Bedroom", "Failure",
  "General", "Holiday", "Library", "Purpose", "Thought",
  "Journey", "Teacher", "Balance", "Village", "Justice",
  "Pattern", "Country", "Subject", "Control", "Freedom",
  "Courage", "Digital", "Fitness", "Grammar", "Imagine",
  "Natural", "Opinion", "Picture", "Quarter", "Respect"
];

const hints = [
  "You can do it", "School", "Talk about it", "Sleeping",
  "Get up, and try again", "Mostly", "Vacation", "Reading", "Intent", "Dreams",
  "Travel", "Educator", "Equal weight", "Small town", "Fairness",
  "Repeated design", "Nation", "Topic", "Manage", "Being free",
  "Bravery", "Electronic", "Exercise", "Writing rules", "Visualize",
  "From nature", "Personal view", "Image", "One-fourth", "Admiration"
];


let currentIndex = 0;
let currentWord = "";
let currentHint = "";
let timeLeft = 45;
let timeInterval;

const countdownEl = document.getElementById('countdown');
const guessField = document.getElementById("guessField");
const submitBtn = document.getElementById("submitGuess");
const resultEl = document.getElementById("result");
const hintBtn = document.getElementById("hint");
const resetBtn = document.getElementById("reset");
const playAgainBtn = document.getElementById("playAgain");

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
  document.getElementById('win').textContent = wins;
  document.getElementById('lose').textContent = losses;
  localStorage.setItem('wins', wins);
  localStorage.setItem('losses', losses);
}

function shuffle(str) {
  const arr = [...str.toLowerCase()];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr.join('');
}

function startTimer() {
  clearInterval(timeInterval);
  timeLeft = 45;
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

guessField.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    checkGuess();
  }
});

submitBtn.addEventListener("click", checkGuess);
hintBtn.addEventListener("click", checkHint);
resetBtn.addEventListener("click", resetScores);

// Start game
nextWord();
