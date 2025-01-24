const backBtnEl = document.querySelector('#back');

// Add error handling and prevent default behavior
backBtnEl?.addEventListener('click', (event) => {
  event.preventDefault();
  window.location.href = 'index.html';
});

const word = [
  "Abandoned",
  "Jackknife",
  "Flammable",
  "Carjacker",
  "Filmmaker",
  "Jellyfish",
  "Direction",
  "Zookeeper",
  "Xylophone",
  "Vaporize",
];

const hint = [
  "Left behind",
  "Doubled up position",
  "Fire",
  "Criminal",
  "Movies",
  "Sea creature",
  "Northwest",
  "Animals",
  "Musical",
  "Evaporate",
];

let displayWord = "";

function shuffle(str) {
  strArray = Array.from(str.toLowerCase());

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

let timeInterval;
let timeLeft = 60;

function startTimer() {
  clearInterval(timeInterval);
  timeLeft = 60;
  timeInterval = setInterval(function () {
    if (timeLeft > 1) {
      timerEl.textContent = timeLeft + '  seconds left';
      timeLeft--;
    } else if (timeLeft === 1) {
      timerEl.textContent = timeLeft + '  seconds left';
      timeLeft--;
    } else {
      timerEl.textContent = '';
      clearInterval(timeInterval);
      alert(`OUT OF TIME! The word was '${displayWord.toLowerCase()}'`);
      handleLoss();
      startTimer();
      refresh();
    }

  }, 1000);
}
startTimer();

// init wins from local storage or start @ 0
let wins = parseInt(localStorage.getItem('wins')) || 0;
let losses = parseInt(localStorage.getItem('losses')) || 0;

// update display when page loads
document.getElementById('win').textContent = wins;
document.getElementById('lose').textContent = losses;

function handleWin() { // update wins in local storage
  wins++;
  document.getElementById('win').textContent = wins;
  localStorage.setItem('wins', wins);
}

function handleLoss() { // update loss in local storage
  losses++;
  document.getElementById('lose').textContent = losses;
  localStorage.setItem('losses', losses);
}

// reset scores
function resetScores() {
  wins = 0;
  losses = 0;
  document.getElementById('win').textContent = wins;
  document.getElementById('lose').textContent = losses;
  localStorage.setItem('wins', wins);
  localStorage.setItem('losses', losses);
}

function refresh() {
  index = Math.floor(Math.random() * 10);
  displayWord = word[index].toLocaleLowerCase();
  displayHint = hint[index];
  scrambleWord = document.getElementById("word");
  console.log(displayWord)
  scrambleWord.innerText = shuffle(displayWord).toUpperCase();

  hintEl = document.getElementById("hint");

  // Reset the hint button text
  const userHint = document.getElementById("hint");
  userHint.innerText = "Hint";

}
refresh();

function checkGuess() {
  const userGuess = document.getElementById("guessField").value.toLowerCase();
  if (userGuess === displayWord) {
    result.textContent = `Correct!`;
    result.style.backgroundColor = "green";
    guessField.value = '';
    // alert(`You got it! The word was '${displayWord.toUpperCase()}'`)
    console.log('Correct!');
    handleWin();
    startTimer();
    refresh();
  } else {
    guessField.value = '';
    result.textContent = `Try again`;
    result.style.backgroundColor = "red";
    console.log('Try again');
  }
}

submitGuess.addEventListener("click", checkGuess);

function checkHint() {
  const userHint = document.getElementById("hint");
  if (userHint.innerText === "Hint") {
    alert(displayHint); // Display the hint in an alert dialog
  }
}

document.getElementById("hint").addEventListener("click", checkHint);
document.getElementById("reset").addEventListener("click", resetScores);
