const words = [
  "Pilot",
  "Eagle",
  "Quick",
  "Juice",
  "Crazy",
];

const hints = [
  "Flying",
  "American Symbol",
  "Not slow",
  "Orange",
  "Wild",
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
}

const timerEl = document.getElementById('countdown');
const messageEl = document.getElementById('message');
const guessField = document.getElementById('guessField');
const resultEl = document.getElementById('result');

let wins = 0;
let losses = 0;

function handleWin() {
  wins++;
  document.getElementById('win').textContent = wins;
}

function handleLoss() {
  losses++;
  document.getElementById('lose').textContent = losses;
}

function countdown() {
  let timeLeft = 60;

  const timeInterval = setInterval(function () {
      if (timeLeft > 1) {
          timerEl.textContent = timeLeft + ' seconds left';
          timeLeft--;
      } else if (timeLeft === 1) {
          timerEl.textContent = timeLeft + ' second left';
          timeLeft--;
      } else {
          timerEl.textContent = `OUT OF TIME! The word was ${displayWord.toLowerCase()}`;
          clearInterval(timeInterval);
          refresh();  // Start a new round without incrementing losses
      }
  }, 1000);
}
countdown();

function refresh() {
  let index = Math.floor(Math.random() * 5);
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
      handleWin();  // Increment wins
  } else {
      resultEl.textContent = `Wrong!`;
      resultEl.style.backgroundColor = "red";
      console.log('Wrong!');
      handleLoss();  // Increment losses
  }
  guessField.value = '';  // Clear the input field
  refresh();  // Start a new round
}

document.getElementById("submitGuess").addEventListener("click", checkGuess);
document.getElementById("hint").addEventListener("click", function() {
  messageEl.textContent = hints[words.indexOf(displayWord)];
});
