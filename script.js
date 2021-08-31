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
const themeEl = document.querySelector(".clock-theme");

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
  let hoursDeg = hours * 30,
    minuteDeg = minutes * 6,
    secondDeg = seconds * 6;

  hourEl.style.transform = `rotateZ(${hoursDeg + minuteDeg / 12}deg)`;
  minuteEl.style.transform = `rotateZ(${minuteDeg}deg)`;
  secondEl.style.transform = `rotateZ(${secondDeg}deg)`;

  timeEl.innerHTML = `${hours < 10 ? `0${hours}` : hours}:${
    minutes < 10 ? `0${minutes}` : minutes
  }:${seconds < 10 ? `0${seconds}` : seconds}`;
  dateEl.innerHTML = `${days[day]} - <span class="circle-day">${date}</span>  ${months[month]} - ${year}`;
};
setInterval(clock, 1000); // 1000 = 1s

// ---------- End Clock ----------

// ---------- New Year Countdown ----------

const daysNewYearEl = document.querySelector(".new-year-days");
const hoursNewYearEl = document.querySelector(".new-year-hours");
const minutesNewYearEl = document.querySelector(".new-year-minutes");
const secondsNewYearEl = document.querySelector(".new-year-seconds");
const newYearEl = document.querySelector(".new-year");

const currentYear = new Date().getFullYear();

const newYearTime = new Date(`January 01 ${currentYear + 1} 00:00:00`);
// console.log(newYearTime);//Sat Jan 01 2022 00:00:00 GMT+0200

// Set backgorund new year
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
console.log(percentageWaterEl);

updateBigCup();

smallCupsWaterEl.forEach((cup, idx) => {
  // console.log(cup, idx);
  cup.addEventListener("click", () => highlightCups(idx));
});

function highlightCups(idx) {
  const lastCup = smallCupsWaterEl.length - 1;

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

function updateBigCup() {
  const fullCupsWaterEl = document.querySelectorAll(".cup-small.full").length;
  console.log(fullCupsWaterEl);
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

// ---------- End Water app ----------
