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
        timerEl.textContent = '';
        clearInterval(timeInterval);
      }
    }, 1000);
  }
countdown(); 




function refresh() { 
    index = Math.floor(Math.random() * 5); 
    displayWord = word[index]; 
    displayHint = hint[index]; 
    scrambleWord =  
        document.getElementById("word"); 
    console.log(displayWord)
    scrambleWord.innerText = 
        shuffle(displayWord).toUpperCase(); 
} 
refresh();

function checkGuess() { 
    const userGuess = Text(guessfield.value);
    if (userGuess === displayWord) {
        document.getElementById("result") = "Correct!";
        result.style.backgroundColor = "green";
        refresh();
    } else {
        result.textContent = `Try again`;
        result.style.backgroundColor = "red";
    }
    guessfield.value = "";
    
} 
submitGuess.addEventListener("click", checkGuess);