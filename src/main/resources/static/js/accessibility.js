const darkModeToggle = document.getElementById("dark-mode-toggle");
const FontzoomInButton = document.getElementById("font-zoom-in");
const FontzoomOutButton = document.getElementById("font-zoom-out");
const zoomInButton = document.getElementById("zoom-in-page");
const zoomOutButton = document.getElementById("zoom-out-page");
const fontToggleButton = document.getElementById("font-toggle");
const container = document.querySelector(".container");
const increaseBrightnessButton = document.getElementById("increase-brightness");
const decreaseBrightnessButton = document.getElementById("decrease-brightness");

darkModeToggle.addEventListener("click", function () {
  document.body.classList.toggle("dark-mode");
  container.classList.toggle("dark-mode");
});

let currentFontSize = 16;

FontzoomInButton.addEventListener("click", function () {
  currentFontSize += 2;
  document.body.style.fontSize = currentFontSize + "px";
});

FontzoomOutButton.addEventListener("click", function () {
  currentFontSize -= 2;
  document.body.style.fontSize = currentFontSize + "px";
});

zoomInButton.addEventListener("click", function () {
  changePageZoom(0.2);
});

zoomOutButton.addEventListener("click", function () {
  changePageZoom(-0.2);
});

fontToggleButton.addEventListener("click", function () {
  document.body.classList.toggle("sans-serif");
});

increaseBrightnessButton.addEventListener("click", function () {
  document.body.style.filter = "brightness(1.2)";
});

decreaseBrightnessButton.addEventListener("click", function () {
  document.body.style.filter = "brightness(0.8)";
});

function changePageZoom(delta) {
  const currentZoom =
    parseFloat(document.body.style.transform.split("scale(")[1]) || 1;
  const newZoom = currentZoom + delta;
  document.body.style.transform = `scale(${newZoom})`;
}

let speaking = false;

function speakText() {
  if (speaking) return;

  const text = document.querySelector(".hero-content").innerText;
  const speech = new SpeechSynthesisUtterance(text);
  speech.rate = 1;

  speech.onerror = function (event) {
    console.error("Speech synthesis error:", event.error);
  };

  speech.onend = function () {
    speaking = false;
  };

  speaking = true;
  window.speechSynthesis.speak(speech);
}
document.getElementById("speak").addEventListener("click", speakText);
