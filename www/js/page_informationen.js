//----------START AUFKLAPPTEXT----------
let isExpanded = false;
function toggleText(element) {
  const infotext = element.nextElementSibling;
  const arrow = element.querySelector(".arrow-infoseite");

  const isExpanded = infotext.style.height === "auto";

  if (!isExpanded) {
    infotext.innerText = "";
    fadeInText(infotext, infotext.getAttribute("data-text"));
    infotext.style.height = "auto";
    arrow.style.transform = "rotate(90deg)";
  } else {
    fadeOutText(infotext, () => {
      infotext.style.height = "0";
    });
    arrow.style.transform = "rotate(0deg)";
  }
}

function fadeInText(element, fullText) {
  let i = 0;
  element.style.opacity = "1";
  element.style.transition = "opacity 0.2s ease";

  function addLetter() {
    if (i < fullText.length) {
      element.innerText += fullText[i];
      i++;
      setTimeout(addLetter, 1);
    }
  }
  addLetter();
}

function fadeOutText(element, callback) {
  let fullText = element.innerText;
  let i = fullText.length;

  function removeLetter() {
    if (i > 0) {
      element.innerText = fullText.slice(0, i);
      i--;
      setTimeout(removeLetter, 1);
    } else {
      element.style.opacity = "0";
      callback();
    }
  }
  removeLetter();
}
//----------ENDE AUFKLAPPTEXT----------
//----------START TEXT AUFLEUCHTEN----------
const urlParams = new URLSearchParams(window.location.search);
const highlight = urlParams.get("highlight");

if (highlight === "true") {
  const blinker = document.querySelectorAll(".blinkwort");

  blinker.forEach((el) => {
    el.style.animation = "blinken 1s infinite";
  });

  setTimeout(() => {
    blinker.forEach((el) => {
      el.style.animation = "none";
    });
  }, 3000);
}
//----------ENDE TEXT AUFLEUCHTEN----------
