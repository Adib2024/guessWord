const words = {
    easy: ["apple", "banana", "cherry", "grape", "lemon", "lime", "mango", "melon", "orange", "peach", "pear", "plum", "berry"],
    medium: ["elephant", "giraffe", "dolphin", "cheetah", "penguin", "kangaroo", "crocodile", "alligator", "buffalo", "hippopotamus"],
    hard: ["pomegranate", "rhinoceros", "chrysanthemum", "accommodation", "acknowledgement", "characteristically", "uncharacteristically", "disproportionate", "electromagnetic"]
};
let usedWords = {
    easy: [],
    medium: [],
    hard: []
};

let selectedWord = "";
let displayWord = [];
let attempts = 3;
let points = 0;
let highScore = 0;
let difficulty = 'easy';

const wordContainer = document.getElementById("word-container");
const guessInput = document.getElementById("guess-input");
const guessButton = document.getElementById("guess-button");
const hintButton = document.getElementById("hint-button");
const message = document.getElementById("message");
const pointsDisplay = document.getElementById("points");
const highScoreDisplay = document.getElementById("high-score");
const nextButton = document.getElementById("next-button");
const restartButton = document.getElementById("restart-button");
const difficultySelect = document.getElementById("difficulty");

function initializeGame() {
    difficulty = difficultySelect.value;
    selectedWord = getRandomWord(difficulty);
    displayWord = Array(selectedWord.length).fill("_");
    attempts = 3;
    message.textContent = "";
    pointsDisplay.textContent = `Points: ${points}`;
    highScoreDisplay.textContent = `High Score: ${highScore}`;
    updateDisplayWord();
}

function getRandomWord(difficulty) {
    const availableWords = words[difficulty].filter(word => !usedWords[difficulty].includes(word));
    if (availableWords.length === 0) {
        usedWords[difficulty] = [];
        return getRandomWord(difficulty);
    }
    const randomWord = availableWords[Math.floor(Math.random() * availableWords.length)];
    usedWords[difficulty].push(randomWord);
    return randomWord;
}

function updateDisplayWord() {
    wordContainer.textContent = displayWord.join(" ");
}

function checkGuess() {
    const guess = guessInput.value.toLowerCase();
    guessInput.value = "";

    if (!/^[a-z]$/.test(guess)) {
        alert("Please enter a valid letter.");
        return;
    }

    if (selectedWord.includes(guess)) {
        for (let i = 0; i < selectedWord.length; i++) {
            if (selectedWord[i] === guess) {
                displayWord[i] = guess;
            }
        }
        updateDisplayWord();

        if (!displayWord.includes("_")) {
            let pointsAdded;
            switch (difficulty) {
                case 'easy':
                    pointsAdded = 10;
                    break;
                case 'medium':
                    pointsAdded = 15;
                    break;
                case 'hard':
                    pointsAdded = 20;
                    break;
            }
            points += pointsAdded;
            pointsDisplay.textContent = `Points: ${points}`;
            message.textContent = `Congratulations! You guessed the word! You earned ${pointsAdded} points.`;
            guessButton.disabled = true;
            hintButton.disabled = true;
            nextButton.style.display = 'inline';
            updateHighScore();
        }
    } else {
        attempts--;
        if (attempts > 0) {
            message.textContent = `Incorrect guess! ${attempts} attempts remaining.`;
            revealLetter();
        } else {
            message.textContent = `You've run out of attempts. The word was: ${selectedWord}`;
            guessButton.disabled = true;
            hintButton.disabled = true;
            nextButton.style.display = 'inline';
        }
    }
}

function revealLetter() {
    for (let i = 0; i < selectedWord.length; i++) {
        if (displayWord[i] === "_") {
            displayWord[i] = selectedWord[i];
            updateDisplayWord();
            break;
        }
    }
}

function giveHint() {
    let unrevealedIndices = [];
    for (let i = 0; i < selectedWord.length; i++) {
        if (displayWord[i] === "_") {
            unrevealedIndices.push(i);
        }
    }
    if (unrevealedIndices.length > 0) {
        let randomIndex = unrevealedIndices[Math.floor(Math.random() * unrevealedIndices.length)];
        displayWord[randomIndex] = selectedWord[randomIndex];
        updateDisplayWord();
        points -= 2; // Deduct points for using a hint
        pointsDisplay.textContent = `Points: ${points}`;
        message.textContent = `Hint used! You lost 2 points.`;
    }
}

function updateHighScore() {
    if (points > highScore) {
        highScore = points;
        highScoreDisplay.textContent = `High Score: ${highScore}`;
    }
}

guessButton.addEventListener("click", checkGuess);
hintButton.addEventListener("click", giveHint);
nextButton.addEventListener("click", () => {
    guessButton.disabled = false;
    hintButton.disabled = false;
    nextButton.style.display = 'none';
    initializeGame();
});

restartButton.addEventListener("click", () => {
    points = 0;
    guessButton.disabled = false;
    hintButton.disabled = false;
    nextButton.style.display = 'none';
    initializeGame();
});

difficultySelect.addEventListener("change", initializeGame);

initializeGame();
