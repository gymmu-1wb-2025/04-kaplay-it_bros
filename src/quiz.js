const flagImage = document.getElementById("flag-image");
const option0 = document.getElementById("option0");
const option1 = document.getElementById("option1");
const option2 = document.getElementById("option2");
const option3 = document.getElementById("option3");
const nextQuestion = document.getElementById("next-question");
const scoreCounter = document.getElementById("score-counter");
const highscoreCounter = document.getElementById("highscore-counter");

const buttons = [option0, option1, option2, option3];

let flags = [];
let answer = "";
let score = 0;
let highscore = 0;

let difficulty = null;
let timerInterval = null;
let timeLeft = 10;

const timerDisplay = document.createElement("div");
timerDisplay.id = "timer-display";
timerDisplay.textContent = "";
timerDisplay.style.fontSize = "24px";
timerDisplay.style.fontWeight = "bold";
timerDisplay.style.color = "white";
timerDisplay.style.margin = "20px 0";
timerDisplay.style.textAlign = "center";

const difficultyContainer = document.createElement("div");
difficultyContainer.id = "difficulty-container";
difficultyContainer.style.display = "flex";
difficultyContainer.style.justifyContent = "center";
difficultyContainer.style.gap = "20px";
difficultyContainer.style.margin = "30px 0";

const easyButton = document.createElement("button");
easyButton.textContent = "Easy";
easyButton.type = "button";

const hardButton = document.createElement("button");
hardButton.textContent = "Hard";
hardButton.type = "button";

[easyButton, hardButton].forEach((button) => {
    button.style.padding = "15px 40px";
    button.style.fontSize = "28px";
    button.style.fontWeight = "bold";
    button.style.borderRadius = "10px";
    button.style.border = "2px solid white";
    button.style.backgroundColor = "#222";
    button.style.color = "white";
    button.style.cursor = "pointer";
});

difficultyContainer.appendChild(easyButton);
difficultyContainer.appendChild(hardButton);

flagImage.parentNode.insertBefore(difficultyContainer, flagImage);
flagImage.parentNode.insertBefore(timerDisplay, flagImage);

// Sicherheitshalber alle vorhandenen Buttons auch auf type=button setzen
buttons.forEach((button) => {
    button.type = "button";
});
nextQuestion.type = "button";

function updateScore() {
    scoreCounter.textContent = `Richtig: ${score}`;
    highscoreCounter.textContent = `Highscore: ${highscore}`;
}

function randomIndex(index) {
    return Math.floor(Math.random() * index);
}

function getFileName(imagePath) {
    return String(imagePath || "").replace(/\\/g, "/").split("/").pop();
}

function showCorrectAnswer() {
    buttons.forEach((button) => {
        if (button.textContent === answer) {
            button.style.backgroundColor = "green";
        }
    });
}

function setImageFromFlag(flag) {
    const fileName = getFileName(flag.image);
    flagImage.src = `/flags/4x3/${fileName}`;
    flagImage.alt = `Flag of ${flag.name}`;
}

function hideQuiz() {
    flagImage.hidden = true;
    nextQuestion.hidden = true;
    buttons.forEach((button) => {
        button.hidden = true;
    });
}

function showQuiz() {
    flagImage.hidden = false;
    buttons.forEach((button) => {
        button.hidden = false;
    });
}

function stopTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
}

function startTimer() {
    stopTimer();

    if (difficulty !== "hard") {
        timerDisplay.textContent = "";
        return;
    }

    timeLeft = 10;
    timerDisplay.textContent = `Zeit: ${timeLeft}s`;

    timerInterval = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = `Time : ${timeLeft}s`;

        if (timeLeft <= 0) {
            stopTimer();
            handleTimeout();
        }
    }, 1000);
}

function handleTimeout() {
    buttons.forEach((button) => {
        button.disabled = true;
    });

    showCorrectAnswer();
    score = 0;
    updateScore();
    nextQuestion.hidden = false;
}

function setQuestion() {
    stopTimer();

    if (flags.length < 4) {
        alert("Zu wenig Flaggen in flags.json gefunden.");
        return;
    }

    const options = [];
    let flag = flags[randomIndex(flags.length)];

    setImageFromFlag(flag);
    answer = flag.name;
    options.push(flag.name);

    while (options.length < 4) {
        flag = flags[randomIndex(flags.length)];
        if (!options.includes(flag.name)) {
            options.push(flag.name);
        }
    }

    const correctIndex = randomIndex(4);
    [options[0], options[correctIndex]] = [options[correctIndex], options[0]];

    buttons.forEach((button, index) => {
        button.textContent = options[index];
        button.disabled = false;
        button.hidden = false;
        button.style.backgroundColor = "grey";
    });

    nextQuestion.hidden = true;
    startTimer();
}

function selectOption(event) {
    stopTimer();

    const clickedButton = event.currentTarget;
    const isCorrect = clickedButton.textContent === answer;

    buttons.forEach((button) => {
        button.disabled = true;
    });

    showCorrectAnswer();

    if (isCorrect) {
        score++;
        if (score > highscore) {
            highscore = score;
        }
    } else {
        clickedButton.style.backgroundColor = "red";
        score = 0;
    }

    updateScore();
    nextQuestion.hidden = false;
}

async function loadFlags() {
    const response = await fetch("/flags.json");

    if (!response.ok) {
        throw new Error(`flags.json konnte nicht geladen werden: ${response.status}`);
    }

    const rawFlags = await response.json();
    flags = rawFlags.filter((flag) => flag && flag.name && flag.image);
    console.log("Geladene Flaggen:", flags.length);
}

function startGame(selectedDifficulty) {
    difficulty = selectedDifficulty;
    difficultyContainer.hidden = true;
    showQuiz();
    updateScore();
    setQuestion();
}

async function initQuiz() {
    try {
        await loadFlags();

        buttons.forEach((button) => {
            button.addEventListener("click", selectOption);
        });

        nextQuestion.addEventListener("click", setQuestion);

        easyButton.addEventListener("click", (event) => {
            event.preventDefault();
            startGame("easy");
        });

        hardButton.addEventListener("click", (event) => {
            event.preventDefault();
            startGame("hard");
        });

        hideQuiz();
        updateScore();
    } catch (error) {
        console.error(error);
        alert("Fehler beim Laden des Quiz.");
    }
}

initQuiz();