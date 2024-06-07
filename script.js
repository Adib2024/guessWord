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
const message = document.getElementById("message");
const pointsDisplay = document.getElementById("points");
const restartButton = document.getElementById("restart-button");

function initializeGame() {
    selectedWord = words[Math.floor(Math.random() * words.length)];
    displayWord = Array(selectedWord.length).fill("_");
    attempts = 3;
    message.textContent = "";
    updateDisplayWord();
}

function updateDisplayWord() {
    wordContainer.textContent = displayWord.join(" ");
}

function checkGuess() {
    const guess = guessInput.value.toLowerCase();
    guessInput.value = "";

    if (guess.length !== 1) {
        message.textContent = "Please enter a single letter.";
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
            points += 10;
            pointsDisplay.textContent = `Points: ${points}`;
            message.textContent = "Congratulations! You guessed the word!";
            guessButton.disabled = true;
        }
    } else {
        attempts--;
        if (attempts > 0) {
            message.textContent = `Incorrect guess! ${attempts} attempts remaining.`;
            revealLetter();
        } else {
            message.textContent = `You've run out of attempts. The word was: ${selectedWord}`;
            guessButton.disabled = true;
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

guessButton.addEventListener("click", checkGuess);

restartButton.addEventListener("click", () => {
    guessButton.disabled = false;
    initializeGame();
});

initializeGame();
