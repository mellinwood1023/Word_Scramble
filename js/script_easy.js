const easyEl = document.querySelector('easy');
const timerEl = document.querySelector('.timer-count');


const handleGuess = function (event) {
    event.preventDefault();

    const easyWords = [
        "Pilot",
        "Eagle",
        "Quick",
        "Juice",
        "Crazy",
    ];

    const easyHints = [
        "Flying",
        "American Symbol",
        "Not slow",
        "Orange",
        "Wild",
    ];

    let displayWord = "";

    function shuffle(str) {
        strArray = Array.from(str.toLowerCase());

        for (let i = 0; i < strArray.length - 1; ++i) {
            let j = Math.floor(Math.random() * strArray.length - 1);
            let temp = strArray[i];
            strArray[i] = strArray[j];
            strArray[j] = temp;
        }
        return strArray.join("");
    };

    const message = `Time is up! The correct answer was ${displayWord}.`;

    function countdown() {
        let timeLeft = 60;

        const timeInterval = setInterval(function () {
            if (timeLeft > 1) {
                timerEl.textContent = timeLeft + 'Time left:';
                timeLeft--;
            } else if (timeLeft === 1) {
                timerEl.textContent = timeLeft + 'Time left:';
                timeLeft--;
            } else {
                timerEl.textContent = '';
                clearInterval(timeInterval);
                displayMessage();
            }
        }, 1000);
    }

    shuffle(easyWords[0]);
    countdown();

    function check() {
        let input = document.getElementById("input");
        let output = document.getElementById("output");
        if (
            input.value.toLocaleLowerCase() ===
            displayWord.toLocaleLowerCase()
        )
            output.innerHTML = "Result: Correct";
        else output.innerHTML = "Result: Incorrect";
    }

    function refresh() {
        index = Math.floor(Math.random() * 5);
        displayWord = easyWords[index];
        displayHint = easyHints[index];
        scrambleWord =
            document.getElementById("displayWord");
        scrambleWord.innerText =
            shuffle(displayWord).toUpperCase();
        let easyHints = document.getElementById("easyHints");
        hint.innerHTML = "Hint:" + displayHint;
        document.getElementById("output").innerText = "Result:";
    }

    refresh();
};
easyEl.addEventListener('submit', handleGuess);
