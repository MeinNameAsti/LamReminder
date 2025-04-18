"use strict";

//Prüfen, welches Theme lt local storage aktiv ist und das richtige beim laden der Seite anzeigen
document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("theme") == "invert") {
    document.querySelector("body").classList.add("invert");
  }
});

//Wechselt zwischen light- und darkmode beim klicken des Buttons
document.querySelector("#color-mode").addEventListener("click", () => {
  document.querySelector("body").classList.toggle("invert");

  if (localStorage.getItem("theme") == "invert") {
    localStorage.setItem("theme", "");
  } else {
    localStorage.setItem("theme", "invert");
  }
});

//----------START CALENDER CONTAINER----------

let nav = 0;
let clicked = null;
let events = localStorage.getItem("events")
  ? JSON.parse(localStorage.getItem("events"))
  : [];

const calendar = document.getElementById("calendar");
const newEventModal = document.getElementById("newEventModal");
const deleteEventModal = document.getElementById("deleteEventModal");
const backDrop = document.getElementById("modalBackDrop");
const eventTitleInput = document.getElementById("eventTitleInput");
const weekdays = [
  "Montag",
  "Dienstag",
  "Mittwoch",
  "Donnerstag",
  "Freitag",
  "Samstag",
  "Sonntag",
];

function openModal(date) {
  clicked = date;

  const eventForDay = events.find((e) => e.date === clicked);

  if (eventForDay) {
    document.getElementById("eventText").innerText = eventForDay.title;
    deleteEventModal.style.display = "block";
  } else {
    newEventModal.style.display = "block";
  }

  backDrop.style.display = "block";
}

function load() {
  const dt = new Date();

  if (nav !== 0) {
    dt.setMonth(new Date().getMonth() + nav);
  }

  const day = dt.getDate();
  const month = dt.getMonth();
  const year = dt.getFullYear();

  const firstDayOfMonth = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const dateString = firstDayOfMonth.toLocaleDateString("de-DE", {
    weekday: "long",
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });
  const paddingDays = weekdays.indexOf(dateString.split(", ")[0]);

  document.getElementById("monthDisplay").innerText = `${dt.toLocaleDateString(
    "de-DE",
    { month: "long" }
  )} ${year}`;

  calendar.innerHTML = "";

  for (let i = 1; i <= paddingDays + daysInMonth; i++) {
    const daySquare = document.createElement("div");
    daySquare.classList.add("day");

    const dayString = `${month + 1}/${i - paddingDays}/${year}`;

    if (i > paddingDays) {
      daySquare.innerText = i - paddingDays;
      const eventForDay = events.find((e) => e.date === dayString);

      if (i - paddingDays === day && nav === 0) {
        daySquare.id = "currentDay";
      }

      if (eventForDay) {
        const eventDiv = document.createElement("div");
        eventDiv.classList.add("event");
        eventDiv.innerText = eventForDay.title;
        daySquare.appendChild(eventDiv);
      }

      daySquare.addEventListener("click", () => openModal(dayString));
    } else {
      daySquare.classList.add("padding");
    }

    calendar.appendChild(daySquare);
  }

  //get dailyInformation
  const weekday = dt.toLocaleDateString("de-DE", { weekday: "long" });
  const day1 = dt.getDate();
  const month1 = dt.toLocaleDateString("de-DE", { month: "long" });
  const year1 = dt.getFullYear();

  const dailyInformation = `${weekday}, ${day1}. ${month1} ${year1}`;

  return dailyInformation;
}

function closeModal() {
  eventTitleInput.classList.remove("error");
  newEventModal.style.display = "none";
  deleteEventModal.style.display = "none";
  backDrop.style.display = "none";
  eventTitleInput.value = "";
  clicked = null;
  load();
}

function saveEvent() {
  if (eventTitleInput.value) {
    eventTitleInput.classList.remove("error");

    events.push({
      date: clicked,
      title: eventTitleInput.value,
    });

    localStorage.setItem("events", JSON.stringify(events));
    closeModal();
  } else {
    eventTitleInput.classList.add("error");
  }
}

function deleteEvent() {
  events = events.filter((e) => e.date !== clicked);
  localStorage.setItem("events", JSON.stringify(events));
  closeModal();
}

function initButtons() {
  document.getElementById("nextButton").addEventListener("click", () => {
    nav++;
    load();
  });

  document.getElementById("backButton").addEventListener("click", () => {
    nav--;
    load();
  });

  document.getElementById("saveButton").addEventListener("click", saveEvent);
  document.getElementById("cancelButton").addEventListener("click", closeModal);
  document
    .getElementById("deleteButton")
    .addEventListener("click", deleteEvent);
  document.getElementById("closeButton").addEventListener("click", closeModal);
}

initButtons();
load();

//----------END CALENDER CONTAINER----------
//display dailyInformation

let currentDay = load();

dailyInformation.innerHTML = load();
//Hier statt 'test' die Infos aus dem Modal anzeigen
TODO: dailyDetails.innerHTML = "test";
let test = document.getElementsByClassName("event");
console.log("🚀 ~ test:", test);

//----------START SLIDESHOW----------
const indikatoren = document.getElementsByClassName("indikator");
indikatoren[0].classList.add("aktiv");

const slides = document.getElementsByClassName("slide");
slides[0].classList.add("aktiv");

let aktuellerIndex = 0;

function umschalten(anzahl) {
  let neuerIndex = aktuellerIndex + anzahl;

  //Wenn mann beim ersten Bild nochmal nach links klickt
  if (neuerIndex < 0) {
    neuerIndex = slides.length - 1;
  }

  //Wenn mann beim letzten Bild nochmal nach rechts klickt
  if (neuerIndex > slides.length - 1) {
    neuerIndex = 0;
  }

  springen(neuerIndex);
}

function springen(neuerIndex) {
  indikatoren[aktuellerIndex].classList.remove("aktiv");
  slides[aktuellerIndex].classList.remove("aktiv");

  indikatoren[neuerIndex].classList.add("aktiv");
  slides[neuerIndex].classList.add("aktiv");

  aktuellerIndex = neuerIndex;
}
//----------ENDE SLIDESHOW----------
//----------START SLIDESHOW VERLINKUNG----------
document
  .getElementById("slide-textbereich-link")
  .addEventListener("click", function () {
    window.location.href = "page_informationen.html?highlight=true";
  });
//----------START SLIDESHOW VERLINKUNG----------
