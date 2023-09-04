"use strict";

let secretNumber = Math.trunc(Math.random() * 100) + 1;
let score = 20;
let highScores = [];
let guessedNumbers = [];

const modal = document.querySelector(".highscoreModal");
const modalHighscore = document.querySelector(".modalHighscore");
const modalRanking = document.querySelector(".modalRanking");
const playerNameInput = document.querySelector(".playerNameInput");
const addButton = document.querySelector(".addButton");
const closeButton = document.querySelector(".close");

document.querySelector(".check").addEventListener("click", checkBtn);
document.querySelector(".again").addEventListener("click", againBtn);
document.querySelector(".highscore").addEventListener("click", highScoreBtn);

function displayMessage(message) {
  document.querySelector(".message").textContent = message;
}

function displayGuessNumber(guess) {
  guessedNumbers = [guess];
  document.querySelector(".guessed-numbers").textContent = guessedNumbers;
}

// Function tombol "check" di tekan.
function checkBtn() {
  const guess = Number(document.querySelector(".guess").value);

  // conditionnya
  if (!guess) {
    displayMessage(" No number 🤬");
  } else if (guess === secretNumber) {
    document.querySelector(".number").textContent = secretNumber;
    document.querySelector("body").style.backgroundColor = "#60b347";
    displayMessage(" Yeay, you're right!!! ");
    displayGuessNumber(guess);
    highScoreBtn();
  } else if (guess !== secretNumber) {
    displayMessage(guess > secretNumber ? " Too high 🙉" : " Too low 😤");
    displayGuessNumber(guess);
    if (score > 0) {
      score--;
      document.querySelector(".score").textContent = score;
    } else {
      displayMessage("GAME OVER !!!");
      document.querySelector("body").style.backgroundColor = "#e6001a";
    }
  }
  document.querySelector(".guess").value = "";
}

// Function  tombol "again" di jalankan.
function againBtn() {
  score = 20;
  secretNumber = Math.trunc(Math.random() * 100) + 1;
  document.querySelector(".number").textContent = "?";
  displayMessage("Start guessing...");
  displayGuessNumber("");
  document.querySelector(".guess").value = "";
  document.querySelector(".score").textContent = score;
  document.querySelector("body").style.backgroundColor = "#222";
}

// Function  modal "highscore" dijalankan.
function highScoreBtn() {
  modal.style.display = "block";
  modalHighscore.textContent = score;
  modalRanking.innerHTML = "";

  addButton.addEventListener("click", addBtn);
  closeButton.addEventListener("click", closeHandler);

  highScores.forEach((e, i) => {
    const listItem = document.createElement("li");
    listItem.textContent = `${i + 1} . ${e.name} - ${e.score}`;
    modalRanking.appendChild(listItem);
  });
}

//function menambahkan nama player ketika secretnumber yang di tebak benar
function addBtn() {
  const playerName = playerNameInput.value.trim();
  if (playerName !== "") {
    saveHighscore(playerName);
    playerNameInput.value = "";
    againBtn();
    highScores.sort((a, b) => b.score - a.score);
    closeHandler();
  } else {
    closeHandler();
  }
}
//function untuk menambahka nama serta score yang di perolah dan disimpan pada array hihScores
function saveHighscore(playerName) {
  const playerScore = score;
  highScores.push({ name: playerName, score: playerScore });
}

function closeHandler() {
  modal.style.display = "none";
}
