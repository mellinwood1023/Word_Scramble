// timerMode.js
const backBtnEl = document.querySelector('#back');
backBtnEl?.addEventListener('click', (e) => {
  e.preventDefault();
  window.location.href = 'index.html';
});

// Word banks by difficulty
const easy = [
  { word: "Eagle", hint: "American Symbol" },
  { word: "Quick", hint: "Not slow" },
  { word: "Pilot", hint: "Flying" },
  { word: "Juice", hint: "Orange" },
  { word: "Crazy", hint: "Wild" },
  { word: "Stark", hint: "White" },
  { word: "Joist", hint: "Beam" },
  { word: "Blink", hint: "Eyes" },
  { word: "Truck", hint: "Vehicle" },
  { word: "Point", hint: "Sharp" },
  { word: "Happy", hint: "Joyful" },
  { word: "Mango", hint: "Fruit" },
  { word: "Grass", hint: "Lawn" },
  { word: "Lemon", hint: "Sour" },
  { word: "Smart", hint: "Clever" },
  { word: "Brush", hint: "Paint tool" },
  { word: "Cloud", hint: "Sky fluff" },
  { word: "Tiger", hint: "Big cat" },
  { word: "Frost", hint: "Cold covering" },
  { word: "Sugar", hint: "Sweetener" },
];

const medium = [
  { word: "Ability", hint: "You can do it" },
  { word: "College", hint: "School" },
  { word: "Discuss", hint: "Talk about it" },
  { word: "Bedroom", hint: "Sleeping" },
  { word: "Failure", hint: "Try again" },
  { word: "General", hint: "Mostly" },
  { word: "Holiday", hint: "Vacation" },
  { word: "Library", hint: "Reading" },
  { word: "Purpose", hint: "Intent" },
  { word: "Thought", hint: "Dreams" },
  { word: "Journey", hint: "Trip" },
  { word: "Lantern", hint: "Light" },
  { word: "Measure", hint: "Evaluate" },
  { word: "Network", hint: "Connect" },
  { word: "Opinion", hint: "View" },
  { word: "Passion", hint: "Strong emotion" },
  { word: "Quality", hint: "Grade" },
  { word: "Respect", hint: "Admire" },
  { word: "Silence", hint: "Quiet" },
  { word: "Trouble", hint: "Problem" },
];

const hard = [
  { word: "Abandoned", hint: "Left behind" },
  { word: "Jackknife", hint: "Folded blade" },
  { word: "Flammable", hint: "Fire risk" },
  { word: "Carjacker", hint: "Thief" },
  { word: "Filmmaker", hint: "Movie creator" },
  { word: "Jellyfish", hint: "Sea creature" },
  { word: "Direction", hint: "Northwest" },
  { word: "Zookeeper", hint: "Animal keeper" },
  { word: "Xylophone", hint: "Musical instrument" },
  { word: "Vaporize", hint: "Evaporate" },
  { word: "Nightmare", hint: "Bad dream" },
  { word: "Overdrive", hint: "Fast push" },
  { word: "Quicksand", hint: "Sinking trap" },
  { word: "Revolving", hint: "Rotating" },
  { word: "Slingshot", hint: "Launch tool" },
  { word: "Telepathy", hint: "Mind reading" },
  { word: "Unpacking", hint: "Opening" },
  { word: "Volunteer", hint: "Unpaid helper" },
  { word: "Workplace", hint: "Job spot" },
  { word: "Zealously", hint: "With energy" },
];

function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

shuffleArray(easy);
shuffleArray(medium);
shuffleArray(hard);

let score = 0;
let timeLeft = 120;
let timer;
let levelIndex = 0; // 0 = easy, 1 = medium, 2 = hard
let correctInLevel = 0;
let currentIndex = 0;
let displayWord = "";
let displayHint = "";

const levels = [easy, medium, hard];
let currentWords = [...levels[levelIndex]];

const timerEl = document.getElementById('countdown');
const resultEl = document.getElementById('result');
const wordEl = document.getElementById('word');
const inputEl = document.getElementById('guessField');
const submitBtn = document.getElementById('submitGuess');
const hintBtn = document.getElementById('hint');
const playAgainBtn = document.getElementById('playAgain');
const skipBtn = document.getElementById('skip');

function scrambleWord(str) {
  let scrambled = str;
  while (scrambled === str) {
    scrambled = str.split('').sort(() => 0.5 - Math.random()).join('');
  }
  return scrambled;
}

function startGame() {
  score = 0;
  timeLeft = 120;
  levelIndex = 0;
  correctInLevel = 0;
  currentIndex = 0;
  currentWords = [...levels[levelIndex]];
  shuffleArray(currentWords);
  inputEl.disabled = false;
  playAgainBtn.style.display = "none";
  startTimer();
  updateWord();
}

function startTimer() {
  timerEl.textContent = `${timeLeft} seconds left`;
  timer = setInterval(() => {
    timeLeft--;
    timerEl.textContent = `${timeLeft} seconds left`;
    if (timeLeft <= 0) {
      clearInterval(timer);
      endGame();
    }
  }, 1000);
}

function updateWord() {
  if (currentIndex >= currentWords.length) return endGame();

  const current = currentWords[currentIndex];
  displayWord = current.word.toLowerCase();
  displayHint = current.hint;
  wordEl.textContent = scrambleWord(displayWord).toUpperCase();
  inputEl.value = '';
  resultEl.textContent = '';
}

function checkGuess() {
  const userGuess = inputEl.value.toLowerCase();
  if (userGuess === displayWord) {
    score++;
    correctInLevel++;
    currentIndex++;

    // If 10 correct in current level, move to next
    if (correctInLevel >= 10 && levelIndex < levels.length - 1) {
      levelIndex++;
      correctInLevel = 0;
      currentIndex = 0;
      currentWords = [...levels[levelIndex]];
      shuffleArray(currentWords);
    }

    updateWord();
  } else {
    resultEl.textContent = 'Try again';
    resultEl.style.color = 'red';
    inputEl.value = '';
  }
}

function showHint() {
  alert(displayHint);
}

function skipWord() {
  currentIndex++;
  resultEl.textContent = `(Skipped) The word was "${displayWord.toUpperCase()}"`;
  resultEl.style.color = 'orange';
  updateWord();
}

function endGame() {
  inputEl.disabled = true;
  clearInterval(timer);
  resultEl.textContent = `⏱️ Time's up! You got ${score} correct. The last word was "${displayWord.toUpperCase()}".`;
  resultEl.style.color = 'yellow';
  playAgainBtn.style.display = "inline-block";
}

submitBtn.addEventListener('click', checkGuess);
inputEl.addEventListener('keydown', e => {
  if (e.key === 'Enter') checkGuess();
});
hintBtn.addEventListener('click', showHint);
skipBtn.addEventListener('click', skipWord);
playAgainBtn.addEventListener('click', startGame);

// Start the game
startGame();
