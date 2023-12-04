const guessedLettersElement = document.querySelector(".guessed-letters");
const guessButtonElement = document.querySelector(".guess");
const letterGuessElement = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuesses = document.querySelector(".remaining");
const remainingGuessesSpan = document.querySelector(".remaining span");
const messageElement = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");
const word = "magnolia"

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
    const guess = letterInput.value;
    console.log(guess);
    letterInput.value = "";
});