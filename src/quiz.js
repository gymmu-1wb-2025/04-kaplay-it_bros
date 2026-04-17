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

function resetButtons() {
    buttons.forEach((button) => {
        button.disabled = false;
        button.style.backgroundColor = "grey";
    });
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

function setQuestion() {
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

    const swapIndex = randomIndex(options.length);
    [options[0], options[swapIndex]] = [options[swapIndex], options[0]];

    buttons.forEach((button, index) => {
        button.textContent = options[index];
        button.disabled = false;
        button.style.backgroundColor = "grey";
    });

    nextQuestion.hidden = true;
}

function selectOption(event) {
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

        updateScore();
    } else {
        clickedButton.style.backgroundColor = "red";
        score = 0;
        updateScore();
    }

    nextQuestion.hidden = false;
}

async function loadFlags() {
    const response = await fetch("/flags.json");

    if (!response.ok) {
        throw new Error(`flags.json konnte nicht geladen werden: ${response.status}`);
    }

    const rawFlags = await response.json();
    flags = rawFlags.filter((flag) => flag && flag.name && flag.image);
}

async function initQuiz() {
    try {
        await loadFlags();

        buttons.forEach((button) => {
            button.addEventListener("click", selectOption);
        });

        nextQuestion.addEventListener("click", setQuestion);

        updateScore();
        setQuestion();
    } catch (error) {
        console.error(error);
        alert("Fehler beim Laden des Quiz.");
    }
}

initQuiz();