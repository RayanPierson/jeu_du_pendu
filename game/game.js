let wordToFind = "";
let clickedLettreView = "";
let attempsNumber = 7;
let currentWord = "";
let currentThemeSelect ="";

function onInit() {
  getPlayerName();
  displayAlphabet();
  getThemeSelect();
  generateWordToFind();
  generateCurrentWord();
  displayWordToFind();
  getSelectedDificulty();
}

function getPlayerName() {
  const currentPlayerName = localStorage.getItem("Pseudonyme");
  document.getElementById("player-name").innerHTML = currentPlayerName;
}

function getThemeSelect() {
  currentThemeSelect = localStorage.getItem("theme");
  document.getElementById("theme-select").innerHTML = currentThemeSelect;
}

function getSelectedDificulty() {
  const currentSelectedDifficulty = localStorage.getItem("difficulty");
  document.getElementById("selected-difficulty").innerHTML =
    currentSelectedDifficulty;
  // si diff est facile donc attemps = 7 , sinon pour difficile ,attemps = 4
  switch (currentSelectedDifficulty) {
    case "facile":
      attempsNumber = 7;
      break;
    case "difficile":
      attempsNumber = 4;
      break;
    default:
      console.log(`Sorry, we are out of ${currentSelectedDifficulty}.`);
  }
  displayAttemps();
}

function displayAlphabet() {
  let lettresBuHtmttonl = "";
  let lettres = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ];
  for (let i = 0; i < lettres.length; i++) {
    lettresBuHtmttonl +=
      "<button class='lettre' onclick=lettreClick('" +
      lettres[i] +
      "')  >" +
      lettres[i] +
      "</button>";
  }
  document.getElementById("alphabet").innerHTML += lettresBuHtmttonl;
}

function displayWordToFind() {
  let result = "";
  for (let j = 0; j < currentWord.length; j++) {
    result += '<span class="lettre">' + currentWord[j] + "</span>";
  }
  document.getElementById("word-to-find").innerHTML = result;
}

function generateWordToFind() {
  let themeWords ;
  if(currentThemeSelect == 'animaux'){
    themeWords = ["LION", "CHIEN", "CHEVRE", "CHAT", "MOUTON"];
  }
  if(currentThemeSelect == 'marque'){
    themeWords = ["NIKE", "ADIDAS", "JORDAN", "ZARA", "CARREFOUR"]
  }
  const randomIndex = Math.floor(Math.random() * themeWords.length);
  wordToFind = themeWords[randomIndex];
  console.log(wordToFind);
}

function generateCurrentWord() {
  let result = "";
  for (let j = 0; j < wordToFind.length; j++) {
    result += "-";
  }

  currentWord = result;
}

function setCharAt(str, index, chr) {
  if (index > str.length - 1) return str;
  return str.substring(0, index) + chr + str.substring(index + 1);
}

function lettreClick(clickedLettre) {
  if (attempsNumber > 0) {
    //si la lettre choisit est dans le mot donc ont affiche la lettre a la place du tirets, sinon ont retire un essaies.
    if (wordToFind.includes(clickedLettre)) {
      let indexesOfLettre = occurences(wordToFind, clickedLettre);
      console.log("indexesOfLettre", indexesOfLettre);
      for (let j = 0; j < indexesOfLettre.length; j++) {
        currentWord = setCharAt(currentWord, indexesOfLettre[j], clickedLettre);
      }
      displayWordToFind();
      if(wordToFind == currentWord){
        finishGame('win')
      }
    } else {
      attempsNumber = attempsNumber - 1;
      displayAttemps();
    }
  } else {
    //redirect to finish game with lose
    finishGame('lose');
  }
}

function finishGame(loseOrWind){
  localStorage.setItem("finish-status", loseOrWind);
  window.location.href = "../finish-game/finish.html";
}

function displayAttemps() {
  document.getElementById("attemps-number").innerHTML = attempsNumber;
}

function occurences(myWordToFind, myClickedLettre) {
  let indices = [];
  let tableau = myWordToFind;
  let element = myClickedLettre;
  let idx = tableau.indexOf(element);
  while (idx != -1) {
    indices.push(idx);
    idx = tableau.indexOf(element, idx + 1);
  }
  return indices;
}
