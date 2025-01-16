const word = [
    "Pilot",
    "Eagle",
    "Quick",
    "Juice",
    "Crazy",
];

const hint = [
    "Flying",
    "American Symbol",
    "Not slow",
    "Orange",
    "Wild",
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

function countdown() {
    let timeLeft = 60;
  
    const timeInterval = setInterval(function () {
      if (timeLeft > 1) {
        timerEl.textContent = timeLeft + '  seconds left';
        timeLeft--;
      } else if (timeLeft === 1) {
        timerEl.textContent = timeLeft + '  seconds left';
        timeLeft--;
      } else {
        timerEl.textContent = `OUT OF TIME! The word was ${displayWord.toLowerCase()}`;
        clearInterval(timeInterval);
      }
    }, 1000);
    refresh();
  }
countdown(); 

function refresh() { 
    index = Math.floor(Math.random() * 5); 
    displayWord = word[index].toLocaleLowerCase(); 
    displayHint = hint[index]; 
    scrambleWord =  
        document.getElementById("word"); 
    console.log(displayWord)
    scrambleWord.innerText = 
        shuffle(displayWord).toUpperCase(); 
} 
refresh();

function checkGuess() { 
    const userGuess = document.getElementById("guessField").value.toLowerCase();
    if (userGuess === displayWord) {
        result.textContent= `Correct!`;
        result.style.backgroundColor = "green";
        console.log('Correct!');
        refresh();
    } else {
        result.textContent = `Try again`;
        result.style.backgroundColor = "red";
        console.log('Try again');
    }
} 
submitGuess.addEventListener("click", checkGuess);