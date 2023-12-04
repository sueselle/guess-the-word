const guessedLettersElement = document.querySelector(".guessed-letters");
const guessButtonElement = document.querySelector(".guess");
const letterGuessElement = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuesses = document.querySelector(".remaining");
const remainingGuessesSpan = document.querySelector(".remaining span");
const messageElement = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");
const word = "magnolia";
const guessedLetters = [];

const unguessed = function(word) {
const unguessedLetters = [];
for (const letter of word) {
    console.log(letter);
    unguessedLetters.push("●");
}
wordInProgress.innerText = unguessedLetters.join("");
}
unguessed(word);

guessButtonElement.addEventListener("click", function(e) {
    e.preventDefault();
    messageElement.innerText = "";
    const guess = letterGuessElement.value;
    const goodGuess = validateInput(guess);

    if (goodGuess) {
        makeGuess(guess);
    }
    letterGuessElement.value = "";
});

const validateInput = function(input) {
    const acceptedLetter = /[a-zA-Z]/;
    if (input.length === 0) {
        messageElement.innerText = "Please enter a letter and press 'guess'."
    }
    else if (input.length > 1) {
        messageElement.innerText = "Please enter just one letter at a time."
    }
    else if (!input.match(acceptedLetter)) {
        messageElement.innerText = "Please guess a letter from A to Z."
    }
    else {
        return input;
    }
};

const makeGuess = function(guess) {
    guess = guess.toUpperCase();
    if (guessedLetters.includes(guess)) {
        messageElement.innerText = "That must be your favorite letter. You already guessed that one! Try again."
    }
    else {
        guessedLetters.push(guess);
        console.log(guessedLetters);
    }
};