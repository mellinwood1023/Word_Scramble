const backBtnEl = document.querySelector('#back');

// Add error handling and prevent default behavior
backBtnEl?.addEventListener('click', (event) => {
  event.preventDefault();
  try {
    redirectPage('index.html');
  } catch (error) {
    console.error('Navigation error:', error);
    // Fallback navigation if redirectPage fails
    window.location.href = 'index.html';
  }
});

const words = [
  "Eagle",
  "Quick",
  "Pilot",
  "Juice",
  "Crazy",
  "Stark",
  "Joist",
  "Blink",
  "Truck",
  "Point",
];

const hints = [
  "Flying",
  "American Symbol",
  "Not slow",
  "Orange",
  "Wild",
  "White",
  "Beam",
  "Eyes",
  "Vehicle",
  "Sharp",
];

let displayWord = "";

function shuffle(str) {
  let strArray = Array.from(str.toLowerCase());

  for (let i = 0; i < strArray.length - 1; ++i) {
    let j = Math.floor(Math.random() * strArray.length);

    let temp = strArray[i];
    strArray[i] = strArray[j];
    strArray[j] = temp;
  }
  return strArray.join("");
};

const timerEl = document.getElementById('countdown');
const mainEl = document.getElementById('main');
const guessField = document.getElementById('guessField');
const resultEl = document.getElementById('result');

// Initialize win/loss counters
let winCount = 0;
let lossCount = 0;

function updateWinLossCounter(isWin) {
  if (isWin) {
    winCount++;
    document.getElementById('win').textContent = winCount;
  } else {
    lossCount++;
    document.getElementById('lose').textContent = lossCount;
  }
}

function startTimer() {
  clearInterval(timeInterval);
  timeLeft = 60;
  timeInterval = setInterval(function () {
    if (timeLeft > 1) {
      timerEl.textContent = timeLeft + ' seconds left';
      timeLeft--;
    } else if (timeLeft === 1) {
      timerEl.textContent = timeLeft + ' second left';
      timeLeft--;
    } else {
      timerEl.textContent = `OUT OF TIME! The word was '${displayWord.toLowerCase()}'`;
      clearInterval(timeInterval);
      refresh();
      startTimer();
    }
  }, 1000);
}
startTimer();

function refresh() {
  let index = Math.floor(Math.random() * words.length);
  displayWord = words[index].toLowerCase();
  let displayHint = hints[index];
  let scrambleWord = document.getElementById("word");
  console.log(displayWord);
  scrambleWord.innerText = shuffle(displayWord).toUpperCase();
  messageEl.textContent = "";  // Clear any previous hint messages
}
refresh();

function checkGuess() {
  const userGuess = guessField.value.toLowerCase();
  if (userGuess === displayWord) {
    resultEl.textContent = `Correct!`;
    resultEl.style.backgroundColor = "green";
    console.log('Correct!');
    updateWinLossCounter(true);  // Increment wins
  } else {
    resultEl.textContent = `Try again`;
    resultEl.style.backgroundColor = "red";
    console.log('Try again');
    updateWinLossCounter(false);  // Increment losses
  }
  guessField.value = '';  // Clear the input field
  startTimer();
  refresh();  // Start a new round
}
document.getElementById("submitGuess").addEventListener("click", checkGuess);
document.getElementById("hint").addEventListener("click", function() {
  messageEl.textContent = hints[words.indexOf(displayWord)];
});



