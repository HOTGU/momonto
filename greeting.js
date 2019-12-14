const greetingForm = document.querySelector(".js-greetingForm");
const greetingWindow = document.querySelector(".js-greetingWindow");
const input = greetingForm.querySelector("input");

const USER_LS = "currentUser";
const SHOWING_CN = "showing";

function saveName(text) {
  localStorage.setItem(USER_LS, text);
}

function submitHandle(e) {
  e.preventDefault();
  const currentValue = input.value;
  paintGreeting(currentValue);
  saveName(currentValue);
}

function askForName() {
  greetingForm.classList.add(SHOWING_CN);
  greetingForm.addEventListener("submit", submitHandle);
}
function paintGreeting(text) {
  greetingForm.classList.remove(SHOWING_CN);
  greetingWindow.classList.add(SHOWING_CN);
  greetingWindow.innerHTML = `HELLO ${text}`;
}

function loadName() {
  const currentUser = localStorage.getItem(USER_LS);
  if (currentUser === null) {
    askForName();
  } else {
    paintGreeting(currentUser);
  }
}

function init() {
  loadName();
}
init();
