let playerName = "";
let themeSelect = "animaux";
let difficultySelect = "facile";

function startGame() {
  localStorage.setItem("Pseudonyme", playerName);
  localStorage.setItem("theme", themeSelect);
  localStorage.setItem("difficulty", difficultySelect);
  window.location.href = "../game/game.html";
}

function changePseudonyme() {
  console.log("changePseudonyme");
  playerName = document.getElementsByClassName("input-pseudonyme")[0].value;
  console.log(playerName);
}

function changeTheme() {
  themeSelect = document.getElementById("theme-select").value;
  console.log("theme", themeSelect);
}

function changeDifficulty() {
  difficultySelect = document.getElementById("select-difficulty").value;
  console.log("difficulty", difficultySelect);
}
