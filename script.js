// --------- Spinner ---------
const loading = document.querySelector(".loading");
const main = document.querySelector(".main");
setTimeout(() => {
  loading.remove();
  main.style.display = "block";
}, 1000);

// ---------- Clock ----------
const hourEl = document.querySelector(".clock-hour");
const minuteEl = document.querySelector(".clock-minutes");
const secondEl = document.querySelector(".clock-seconds");
const timeEl = document.querySelector(".clock-time");
const dateEl = document.querySelector(".clock-date");

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

// Function clock

const clock = () => {
  const time = new Date();

  const year = time.getFullYear();
  const month = time.getMonth();
  const day = time.getDay();
  const date = time.getDate();
  const hours = time.getHours();
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();

  //Convert hours to degree circle
  let hoursDeg = hours * 30;
  let minuteDeg = minutes * 6;
  let secondDeg = seconds * 6;

  // Values for the analog clock
  hourEl.style.transform = `rotateZ(${hoursDeg + minuteDeg / 12}deg)`;
  minuteEl.style.transform = `rotateZ(${minuteDeg}deg)`;
  secondEl.style.transform = `rotateZ(${secondDeg}deg)`;

  // Values for the digital clock
  timeEl.innerHTML = `${hours < 10 ? `0${hours}` : hours}:${
    minutes < 10 ? `0${minutes}` : minutes
  }:${seconds < 10 ? `0${seconds}` : seconds}`;

  dateEl.innerHTML = `${days[day]} - <span class="circle-day">${date}</span>  ${months[month]} - ${year}`;
};

// Repeat function clock for each second
setInterval(clock, 1000); // 1000 = 1s

// ---------- End Clock ----------

// ----------  Guess number----------

const checkGuessEl = document.querySelector(".guess-number-check");
const againGuessEl = document.querySelector(".guess-number-again");
const scoreGuessEl = document.querySelector(".guess-number-score");
const highscoreGuessEl = document.querySelector(".guess-number-highscore");
const guessNumberEl = document.querySelector(".guess-number");
const guessInputEl = document.querySelector(".guess");

//Generate secret number
let secretNumberGuess = Math.trunc(Math.random() * 20) + 1;
let scoreGuess = 20;
let highscoreGuess = 0;

//For developing - show secret number
// document.querySelector(".guess-number-secret").textContent = secretNumberGuess;

//Check the input number
checkGuessEl.addEventListener("click", function () {
  const guessEl = Number(document.querySelector(".guess").value);
  let messageGuessEl = document.querySelector(".guess-number-message");

  // console.log(messageGuessEl);
  // console.log(guessEl);

  // Check the number

  /* Check if there is no input */
  if (!guessEl && guessEl !== 0) {
    messageGuessEl.textContent = "No number!";

    /* Player wins */
  } else if (guessEl === secretNumberGuess) {
    messageGuessEl.textContent = "Correct answer!";
    guessNumberEl.style.backgroundColor = "#3b2575";
    document.querySelector(".guess-number-secret").textContent =
      secretNumberGuess;
    guessInputEl.style.borderColor = "#22c8e5";

    if (scoreGuess > highscoreGuess) {
      highscoreGuess = scoreGuess;
      highscoreGuessEl.textContent = highscoreGuess;
    }

    /* Check if the number is different then the secret */
  } else if (guessEl !== secretNumberGuess) {
    if (scoreGuess > 1) {
      messageGuessEl.textContent =
        guessEl > secretNumberGuess ? "Too high!" : "Too low!";
      scoreGuess--;
      scoreGuessEl.textContent = scoreGuess;
    } else {
      messageGuessEl.textContent = "Game over!";
      scoreGuessEl.textContent = 0;
    }
  }
});

//Restore game
againGuessEl.addEventListener("click", function () {
  secretNumberGuess = Math.trunc(Math.random() * 20) + 1;
  scoreGuess = 20;
  document.querySelector(".guess-number-message").textContent =
    "Start guessing...";
  document.querySelector(".guess-number-secret").textContent = "?";
  scoreGuessEl.textContent = "20";
  document.querySelector(".guess").value = "";
  guessNumberEl.style.backgroundColor = "";
  guessInputEl.style.borderColor = "";
});

// ----------  End Guess number----------

// ----------  Piano----------

//used for comparing with the key pressed converted to letter
const WHITE_KEYS = ["z", "x", "c", "v", "b", "n", "m"];
const BLACK_KEYS = ["s", "d", "g", "h", "j"];

const keysPianoEl = document.querySelectorAll(".piano-key");
const whiteKeysPianoEl = document.querySelectorAll(".piano-white");
const blackKeysPianoEl = document.querySelectorAll(".piano-black");

function playNote(key) {
  const noteAudio = document.getElementById(key.dataset.note);
  noteAudio.currentTime = 0; /* play from the begining at each click */
  noteAudio.play(); //play sound on the specific note
  key.classList.add("active");
  noteAudio.addEventListener("ended", () => {
    key.classList.remove("active");
  });
}

// Play on click
keysPianoEl.forEach((key) => {
  key.addEventListener("click", () => {
    playNote(key);
  });
});

// Play on keypress
document.addEventListener("keydown", (e) => {
  if (e.repeat)
    return; /* if the key is holding pressed the sound will work only once */

  const key = e.key; /* get the letter */

  // Take the index of each letter pressed
  const whiteKeyIndex = WHITE_KEYS.indexOf(key);
  const blackKeyIndex = BLACK_KEYS.indexOf(key);
  if (whiteKeyIndex > -1) playNote(whiteKeysPianoEl[whiteKeyIndex]);
  if (blackKeyIndex > -1) playNote(blackKeysPianoEl[blackKeyIndex]);
});

// ----------  End Piano----------

// ---------- New Year Countdown ----------

const daysNewYearEl = document.querySelector(".new-year-days");
const hoursNewYearEl = document.querySelector(".new-year-hours");
const minutesNewYearEl = document.querySelector(".new-year-minutes");
const secondsNewYearEl = document.querySelector(".new-year-seconds");
const newYearEl = document.querySelector(".new-year");

const currentYear = new Date().getFullYear();

const newYearTime = new Date(`January 01 ${currentYear + 1} 00:00:00`);
// console.log(newYearTime);//Sat Jan 01 2022 00:00:00 GMT+0200

// Set background new year
newYearEl.innerText = currentYear + 1;
const updateCountdown = () => {
  const currentTime = new Date();
  const diffTime = newYearTime - currentTime;

  const daysNewYear = Math.floor(diffTime / 1000 / 60 / 60 / 24);
  const hoursNewYear = Math.floor(diffTime / 1000 / 60 / 60) % 24;
  const minutesNewYear = Math.floor(diffTime / 1000 / 60) % 60;
  const secondsNewYear = Math.floor(diffTime / 1000) % 60;

  // Adding values to DOM
  daysNewYearEl.innerHTML = daysNewYear;
  hoursNewYearEl.innerHTML =
    hoursNewYear < 10 ? "0" + hoursNewYear : hoursNewYear;
  minutesNewYearEl.innerHTML =
    minutesNewYear < 10 ? "0" + minutesNewYear : minutesNewYear;
  secondsNewYearEl.innerHTML =
    secondsNewYear < 10 ? "0" + secondsNewYear : secondsNewYear;
};

// Run every second
setInterval(updateCountdown, 1000);

// ---------- End New Year Countdown ----------

// ---------- Water  app----------
const smallCupsWaterEl = document.querySelectorAll(".cup-small");
const litersWaterEl = document.getElementById("water-liters");
const percentageWaterEl = document.getElementById("water-percentage");
const remainedWaterEl = document.getElementById("water-remained");
// console.log(percentageWaterEl);

function updateBigCup() {
  const fullCupsWaterEl = document.querySelectorAll(".cup-small.full").length;
  // console.log(fullCupsWaterEl);
  const totalCupsWater = smallCupsWaterEl.length;

  if (fullCupsWaterEl === 0) {
    percentageWaterEl.style.visibility = "hidden";
    percentageWaterEl.style.height = 0;
  } else {
    percentageWaterEl.style.visibility = "visible";
    percentageWaterEl.style.height = `${
      (fullCupsWaterEl / totalCupsWater) * 200
    }px`;
    percentageWaterEl.innerText = `${
      (fullCupsWaterEl / totalCupsWater) * 100
    }%`;
  }

  if (fullCupsWaterEl === totalCupsWater) {
    remainedWaterEl.style.visibility = "hidden";
    remainedWaterEl.style.height = 0;
  } else {
    remainedWaterEl.style.visibility = "visible";
    litersWaterEl.innerText = `${2 - (250 * fullCupsWaterEl) / 1000}L`;
  }
}

function highlightCups(idx) {
  // const lastCup = smallCupsWaterEl.length - 1;

  if (
    smallCupsWaterEl[idx].classList.contains("full") &&
    !smallCupsWaterEl[idx].nextElementSibling?.classList.contains("full")
  ) {
    idx--;
  }

  smallCupsWaterEl.forEach((cup, idx2) => {
    if (idx2 <= idx) {
      cup.classList.add("full");
    } else {
      cup.classList.remove("full");
    }
  });

  updateBigCup();
}

// updateBigCup();

smallCupsWaterEl.forEach((cup, idx) => {
  // console.log(cup, idx);
  cup.addEventListener("click", () => highlightCups(idx));
});

// ---------- End Water app ----------
