"use strict";

// Declaring elements

const displayWords = document.querySelector(".display");
const displayTimer = document.querySelector(".timer");
const displayScore = document.querySelector(".score");
const inputWords = document.querySelector(".input-word");
const startBtn = document.querySelector(".start");
const resetBtn = document.querySelector(".reset");
const gameAudio = document.querySelector("audio");
const body = document.querySelector("body");
const dialog = document.querySelector(".score-dialog");
const dialogBtn = document.querySelector(".scores");

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
  hits;
  percentage;
  date;

  constructor(hits, percentage, date) {
    this.hits = hits;
    this.percentage = percentage;
    this.date = date;
  }
}

// variables
let timer;
let seconds = 15;
let hitList = JSON.parse(localStorage.getItem("highScores"));
let percent;
let counter = 0;
let gameEvent = "stop";
let score = 0;
if (!hitList) {
  hitList = [];
}

// Shuffle display Words
const randomWords = () => {
  return data.sort(() => 0.5 - Math.random());
};
let shuffle = randomWords();

// Start timer
function startGameTimer() {
  timer = setInterval(() => {
    displayTimer.innerHTML = seconds;
    seconds--;
    if (seconds < 0) {
      resetBtn.style.display = "block";
      dialogBtn.style.display = "none";
      startBtn.style.display = "block";
      displayTimer.innerHTML = "0";
      displayWords.innerHTML = "Click start to play!";
      inputWords.disabled = true;
      inputWords.value = "";
      gameAudio.pause();
      gameAudio.currentTime = 0;
      clearInterval(timer);

      const date = new Date();
      const options = { month: "short", day: "numeric", year: "numeric" };
      const newDate = date.toLocaleDateString("en-US", options);

      percent = ((counter / data.length) * 100).toFixed(2);
      const newScore = new Score(score, percent, newDate);
      hitList.push(newScore);
      hitList.splice(9);
      const scoreToText = JSON.stringify(hitList);
      localStorage.setItem("highScores", scoreToText);
      generateDiv(hitList);
      dialog.show();
    }
  }, 1000);
}

function generateDiv(arr) {
  arr.forEach((obj) => {
    const scoreElement = document.createElement("div");
    scoreElement.classList.add("score-div");

    scoreContent(obj, scoreElement);

    dialog.appendChild(scoreElement);
  });
}

// Create text for the provided objects values, and add them to a div
function scoreContent(obj, el) {
  let p1 = document.createElement("p");
  let p2 = document.createElement("p");
  let p3 = document.createElement("p");
  let p4 = document.createElement("p");

  p1.innerHTML = `#${hitList.indexOf(obj) + 1}`;
  p2.innerHTML = `${obj.hits} hits`;
  p3.innerHTML = `${obj.percentage}%`;
  p4.innerHTML = `${obj.date}`;

  el.appendChild(p1);
  el.appendChild(p2);
  el.appendChild(p3);
  el.appendChild(p4);
}

dialogBtn.addEventListener("click", () => dialog.show());

// Start Game function
const startGame = () => {
  if (gameEvent === "stop") {
    startGameTimer();
    gameEvent = "start";
    displayWords.innerHTML = shuffle[0];
    gameAudio.play();
    inputWords.disabled = false;
    startBtn.style.display = "none";
    resetBtn.style.display = "block";
  }
};

// Display next random word
const continueWords = () => {
  if (gameEvent === "start") {
    score += 1;
    displayScore.innerHTML = score;
    displayWords.innerHTML = shuffle[counter];
    inputWords.value = "";

    if (counter === 99) {
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
    startBtn.style.display = "block";
    dialogBtn.style.display = "block";

    counter = 0;
    score = 0;
    inputWords.value = "";
    seconds = 15;
    displayScore.innerHTML = "0";
    gameAudio.pause();
    displayWords.innerHTML = "Click start to play!";
    inputWords.disabled = true;
    clearInterval(timer);
    gameAudio.currentTime = 0;
    displayTimer.innerHTML = "--";
    shuffle = randomWords();
    gameEvent = "stop";
    resetBtn.style.display = "none";

    dialog.close();
  }
};

// Validating Input
const checkWordInput = () => {
  if (displayWords.innerHTML === inputWords.value && gameEvent === "start") {
    counter++;
    continueWords();
  }
};

// event and callback functions
startBtn.addEventListener("click", startGame);
inputWords.addEventListener("input", checkWordInput);
resetBtn.addEventListener("click", resetGame);
