// wordle.js

// Initialize an array to store guessed words

const words = [
  [
    "AND",
    "CAT",
    "DOG",
    "EAT",
    "FUN",
    "HAT",
    "INK",
    "JAM",
    "LAP",
    "MUD",
    "NET",
    "OWL",
    "PEN",
  ],
  [
    "BIRD",
    "FISH",
    "LION",
    "BEAR",
    "DEER",
    "FROG",
    "GOAT",
    "HAWK",
    "JUMP",
    "KITE",
    "LAMB",
    "MOON",
    "NEST",
  ],
  [
    "HELLO",
    "HOWDY",
    "MARIO",
    "APPLE",
    "CHAOS",
    "FLAME",
    "GRASP",
    "JUMBO",
    "LEMON",
    "MAGIC",
    "NOVEL",
    "OCEAN",
    "PUNCH",
  ],
  [
    "ZYGOTE",
    "BANANA",
    "CHERRY",
    "DRAGON",
    "EAGLE",
    "FALCON",
    "GRAPES",
    "HUMANS",
    "IGUANA",
    "JAGUAR",
    "KOALAS",
    "LEMURS",
    "MONKEY",
  ],
];

const guessedWords = [];

let guessCounter = 0;

let wordcount = 0;

// Get references to HTML elements
const guessInput = document.getElementById("guess");
const submitButton = document.getElementById("submit-btn");
const guessList = document.getElementById("guess-list");
const nextLevelBtn = document.getElementById("nxtlvl");

checkGuess(wordcount);

function checkGuess(wordcount) {
  document.getElementById("number").innerHTML =
    `Guess a ${wordcount + 3}-letter word:`;

  const hiddenWord =
    words[wordcount][
      Math.floor(Math.random() * words[wordcount].length)
    ].toUpperCase();

  // Event listener for the submit button

  submitButton.onclick = () => {
    const userGuess = guessInput.value.trim().toUpperCase();

    if (userGuess.length !== wordcount + 3) {
      return;
    }

    let output = "";

    for (let i = 0; i < userGuess.length; i++) {
      const c = userGuess.charAt(i);
      if (hiddenWord.charAt(i) === c) {
        output += `<span style="color: green">${c}</span>`;
      } else if (hiddenWord.includes(c)) {
        output += `<span style="color: orange">${c}</span>`;
      } else {
        output += c;
      }
    }
    guessCounter++;

    if (userGuess === "") {
      return;
    }

    // Check if the word has already been guessed
    if (guessedWords.includes(userGuess)) {
      alert("You already guessed that word.");
      guessInput.value = "";
      return;
    }

    if (guessedWords.length >= 6) {
      alert("You have reached the guess limit, try again :(");
      guessList.innerHTML = "";
      guessedWords.length = 0;
      guessCounter = 0;
      guessInput.value = "";
      return;
    }

    // Add the guess to the list
    guessedWords.push(userGuess);
    const listItem = document.createElement("li");
    listItem.innerHTML += output;
    guessList.appendChild(listItem);

    if (hiddenWord === userGuess) {
      listItem.innerHTML += `<br> CONGRATULATIONS, YOU HAVE GUESSED THE WORD IN ${guessCounter} GUESSES`;
      nextLevelBtn.style.visibility = "visible";
      hiddenWord = "";
    }

    // Clear the input field
    guessInput.value = "";
    return;
  };
}

function updateWordCount() {
  if (wordcount + 1 === 4) {
    alert("You have passed the Formative Assessment!");
    return;
  } else {
    wordcount += 1;
  }
}

nextLevelBtn.addEventListener("click", () => {
  guessList.innerHTML = "";
  nextLevelBtn.style.visibility = "hidden";
  guessedWords.length = 0;
  guessCounter = 0;
  updateWordCount();
  checkGuess(wordcount);
});
