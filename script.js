const easywords = [
    "Pilot",
    "Eagle",
    "Quick",
    "Juice",
    "Crazy",
];

const mediumwords = [
    "",
    "",
    "",
    "",
    "",
];

const hardwords = [
    "",
    "",
    "",
    "",
    "",
];

const checkBtn = document.querySelector(".wordCheck"),
    refreshBtn = document.querySelector(".wordRefresh"),
    userInput = document.querySelector(".text-box"),
    timeText = document.querySelector(".time-text");

let displayWord = "";
let correctWord, timer;

const initTimer = maxTime => {
    clearInterval(timer);
    timer = setInterval(() => {
        if(maxTime > 0){
            maxTime--;
            return timeText.innerText = maxTime;
        }
        alert(`Time's up! ${displayWord.toLowerCase()} was the correct answer`);
        initGame();
    }, 1000);
}

function initGame() {
    initTimer(60);
    var letterIndex = Math.floor(Math.random() * letter.length);
    letterToGuess = letters[letterIndex];
    correctWord = displayWord.toLowerCase();
    guesses = 0;
    lettersGuessed = [];
    gameOver = false;
    
    window.addEventListener("keydown", eventKeyPressed, true);
    drawScreen();
}

function shuffle(str) {
    strArray = Array.from(str.toLowerCase());

    for(let i = 0; i < strArray.length - 1; ++i) {
        let j = Math.floor(Math.random() * strArray.length);

        let temp = strArray[i];
        strArray [i] = strArray [j];
        strArray [j] = temp;
    }
    return strArray.join("");

};
shuffle(easywords[0]);

function checkWord() {
    let userAnswer = userInput.value.toLowerCase();
    
    if(userAnswer !== correctWord){
        document.getElementById('message').innerText = 'Correct!';
    } else {
        document.getElementById('message').innerText = 'Incorrect. Try again.';
    }

}

function refresh() {
    index = Math.floor(Math.random() * 5);
    displayWord = easywords[index];
    wordScrambled = document.getElementById("wordScrambled");
    wordScrambled.innerText = shuffle(displayWord).toUpperCase();
    document.getElementById("result").innerText = "Result:";
};

refresh ();
refreshBtn.addEventListener("click", initGame);
checkBtn.addEventListener("click", checkWord);
