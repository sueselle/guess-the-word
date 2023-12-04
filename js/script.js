const guessedLettersElement = document.querySelector(".guessed-letters");
const guessButtonElement = document.querySelector(".guess");
const letterGuessElement = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuessesElement = document.querySelector(".remaining");
const remainingGuessesSpan = document.querySelector(".remaining span");
const messageElement = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");

let word = "magnolia";
const guessedLetters = [];
let remainingGuesses = 8;

const getWord = async function() {
    const response = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
    const words = await response.text();
    const wordArray = words.split("\n");
    const randomIndex = Math.floor(Math.random() * wordArray.length);
    word = wordArray[randomIndex].trim();
    unguessed(word);
};

getWord();

const unguessed = function(word) {
const unguessedLetters = [];
for (const letter of word) {
    console.log(letter);
    unguessedLetters.push("●");
}
wordInProgress.innerText = unguessedLetters.join("");
};


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
        updateGuessesRemaining(guess);
        showGuessedLetters();
        updateWordInProgress(guessedLetters);
    }
};

const showGuessedLetters = function() {
    guessedLettersElement.innerHTML = "";
    for (const letter of guessedLetters) {
        const li = document.createElement("li");
        li.innerText = letter;
        guessedLettersElement.append(li);
    }
};

const updateWordInProgress = function(guessedLetters) {
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");
    const revealWord = [];
    for (const letter of wordArray) {
        if (guessedLetters.includes(letter)) {
            revealWord.push(letter.toUpperCase());
        }
        else {
            revealWord.push("●");
        }
    }
    wordInProgress.innerText = revealWord.join("");
    checkIfWin();
};

const updateGuessesRemaining = function(guess) {
    const upperWord = word.toUpperCase();
    if (!upperWord.includes(guess)) {
        messageElement.innerText = `Sorry... this word doesn't have the letter ${guess}.`;
        remainingGuesses -= 1;
    }
    else  {
messageElement.innerText = `Great guess! The letter ${guess} is in this word!`;
    }

    if (remainingGuesses === 0) {
        messageElement.innerHTML = `Game over! The word that stumped you was<span class="highlight"> ${word}</span>.`;
    }
    else if (remainingGuesses === 1) {
        remainingGuessesSpan.innerText = `${remainingGuesses} guess`;
    }
    else {
        remainingGuessesSpan.innerText = `${remainingGuesses} guesses`;
    }
};

const checkIfWin = function() {
    if (word.toUpperCase() === wordInProgress.innerText) {
        messageElement.classList.add("win");
        messageElement.innerHTML = `<p>Winner winner, tofurkey dinner! You guessed the right word!</p>`;
    };
};