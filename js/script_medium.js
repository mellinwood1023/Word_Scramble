const word = [
    "Ability",
    "College",
    "Discuss",
    "Bedroom",
    "Failure",
    "General",
    "Holiday",
    "Library",
    "Purpose",
    "Thought",
];

const hint = [
    "You can do it",
    "School",
    "Talk about it",
    "Sleeping",
    "Get up, and try again",
    "Mostly",
    "Vacation",
    "Reading",
    "Intent",
    "Dreams",
];

let displayWord = "";

function shuffle(str) {
    strArray = Array.from(str.toLowerCase());

    for(let i = 0; i < strArray.length - 1; ++i) {
        let j = Math.floor(Math.random() * strArray.length);

        let temp = strArray[i];
        strArray[i] = strArray[j];
        strArray[j] = temp;
    }
    return strArray.join("");

};

const timerEl = document.getElementById('countdown');
const mainEl = document.getElementById('main');
const wins = document.querySelector('.win');
const lose = document.querySelector('.lose');

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
        startTimer();
        refresh();
      }
      
    }, 1000);
}
startTimer();



//function countdown() {
//  }
//countdown(); 


function refresh() { 
    index = Math.floor(Math.random() * 10); 
    displayWord = word[index].toLocaleLowerCase(); 
    displayHint = hint[index]; 
    scrambleWord = document.getElementById("word"); 
    console.log(displayWord)
    scrambleWord.innerText = shuffle(displayWord).toUpperCase(); 

     // Reset the hint button text
     const userHint = document.getElementById("hint");
     userHint.innerText = "Hint";
} 
refresh();

function checkGuess() { 
    const userGuess = document.getElementById("guessField").value.toLowerCase();
    if (userGuess === displayWord) {
        result.textContent= `Correct!`;
        result.style.backgroundColor = "green";
        console.log('Correct!');
        startTimer();
        refresh();
      } else {
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