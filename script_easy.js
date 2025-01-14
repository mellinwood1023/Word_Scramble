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
const message = `Time is up! The correct answer was ${displayWord}.`;

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



function check() { 
    let input = document.getElementById("input"); 
    let output = document.getElementById("output"); 
    if ( input.value.toLocaleLowerCase() === word.toLocaleLowerCase() ) {
        output.innerHTML = "Result: Correct"; 
    }else {output.innerHTML = "Result: Incorrect";}; 
} 

function refresh() { 
    index = Math.floor(Math.random() * 5); 
    displayWord = word[index]; 
    displayHint = hint[index]; 
    scrambleWord =  
        document.getElementById("word"); 
    console.log(displayWord)
    scrambleWord.innerText = 
        shuffle(displayWord).toUpperCase(); 

    document.getElementById("output").innerText = "Result:"; 
} 
refresh();
