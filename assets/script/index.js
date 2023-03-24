"use strict";

// Declaring elements

const displayWords = document.querySelector(".display");
const displayTimer = document.querySelector(".timer");
const displayScore = document.querySelector(".score");
const inputWords = document.querySelector(".input-word");
const startBtn = document.querySelector(".start");
const resetBtn = document.querySelector(".reset");
const gameAudio = document.querySelector("audio");
const gameResults = document.querySelector(".result");
const gameInstructions = document.querySelector(".instructions");
const showInstructions = document.querySelector(".show");

// Word Array

const data = [
  "dinosaur",
  "love",
  "pineapple",
  "calendar",
  "robot",
  "building",
  "population",
  "weather",
  "bottle",
  "history",
  "dream",
  "character",
  "money",
  "absolute",
  "discipline",
  "machine",
  "accurate",
  "connection",
  "rainbow",
  "bicycle",
  "eclipse",
  "calculator",
  "trouble",
  "watermelon",
  "developer",
  "philosophy",
  "database",
  "periodic",
  "capitalism",
  "abominable",
  "component",
  "future",
  "pasta",
  "microwave",
  "jungle",
  "wallet",
  "canada",
  "coffee",
  "beauty",
  "agency",
  "chocolate",
  "eleven",
  "technology",
  "alphabet",
  "knowledge",
  "magician",
  "professor",
  "triangle",
  "earthquake",
  "baseball",
  "beyond",
  "evolution",
  "banana",
  "perfumer",
  "computer",
  "management",
  "discovery",
  "ambition",
  "music",
  "eagle",
  "crown",
  "chess",
  "laptop",
  "bedroom",
  "delivery",
  "enemy",
  "button",
  "superman",
  "library",
  "unboxing",
  "bookstore",
  "language",
  "homework",
  "fantastic",
  "economy",
  "interview",
  "awesome",
  "challenge",
  "science",
  "mystery",
  "famous",
  "league",
  "memory",
  "leather",
  "planet",
  "software",
  "update",
  "yellow",
  "keyboard",
  "window",
];

class Score {
  #hits;
  #percentage;
  #date;

  constructor(hits, percentage, _date) {
    this.#date = Date.now();
    this.#hits = hits;
    this.#percentage = percentage;
  }

  get date() {
    return this.#date;
  }

  get hits() {
    return this.#hits;
  }

  get percentage() {
    return this.#percentage.toFixed(2);
  }
}

// Game Instructions
gameInstructions.addEventListener("click", () => {
  showInstructions.classList.toggle("hidden");
});

// variables
let timer;
let seconds = 98;

let counter = 0;
let gameEvent = "stop";
let score = 0;

// Start timer
function startGameTimer() {
  timer = setInterval(() => {
    displayTimer.innerHTML = seconds;
    seconds--;
    if (seconds < 0) {
      displayTimer.innerHTML = "0";
      displayWords.innerHTML = "Click start to play!";
      inputWords.disabled = true;
      inputWords.value = "";
      gameAudio.pause();
      gameAudio.currentTime = 0;
      clearInterval(timer);
      gameResult();
    }
  }, 1000);
}

// Shuffle display Words
const randomWords = () => {
  return data.sort(() => 0.5 - Math.random());
};
let shuffle = randomWords();

// Start Game function
const startGame = () => {
  if (gameEvent === "stop") {
    gameResults.innerHTML = "Results&#129300;";
    startGameTimer();
    gameEvent = "start";
    displayWords.innerHTML = shuffle[0];
    gameAudio.play();
    inputWords.disabled = false;
  }
};

// Display next random word
const continueWords = () => {
  if (gameEvent === "start") {
    score += 5;
    displayScore.innerHTML = score;
    displayWords.innerHTML = shuffle[counter];
    inputWords.value = "";

    if (counter === 99) {
      gameResult();
      gameAudio.pause();
      gameAudio.currentTime = 0;
      clearInterval(timer);
      inputWords.disabled = true;
    }
  }
};

// Reset game
const resetGame = () => {
  if (gameEvent === "start") {
    counter = 0;
    score = 0;
    gameResults.innerHTML = "Results&#129300;";
    inputWords.value = "";
    seconds = 98;
    displayScore.innerHTML = "0";
    gameAudio.pause();
    displayWords.innerHTML = "Click start to play!";
    inputWords.disabled = true;
    clearInterval(timer);
    gameAudio.currentTime = 0;
    displayTimer.innerHTML = "99";
    shuffle = randomWords();
    gameEvent = "stop";
  }
};

// Validating Input
const checkWordInput = () => {
  if (displayWords.innerHTML === inputWords.value && gameEvent === "start") {
    counter++;
    continueWords();
  }
};

// Game result
const gameResult = () => {
  let resultScore = new Score(score, (counter / 90) * 100);
  gameResults.innerHTML = `Your percentage ->${resultScore.percentage} %<br>Correct words ->${counter}`;
};

// event and callback functions
startBtn.addEventListener("click", startGame);
inputWords.addEventListener("input", checkWordInput);
resetBtn.addEventListener("click", resetGame);
