const time = document.getElementById("time");
const greeting = document.getElementById("greeting");
const nameEl = document.getElementById("name");
const focusEl = document.getElementById("focus");

[nameEl, focusEl].forEach((el) => {
  el.textContent = localStorage.getItem(el.id) || "";
  el.addEventListener("keydown", setText);
  el.addEventListener("blur", storeText);
});

function getTime() {
  const date = new Date();

  const hour = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  const displayString = `${hour > 12 ? hour - 12 : hour}:${
    minutes > 9 ? minutes : "0" + minutes
  }:${seconds > 9 ? seconds : "0" + seconds} ${hour < 12 ? "AM" : "PM"}`;

  return {
    hour,
    minutes,
    seconds,
    displayString,
  };
}

const timerId = setInterval(updatePage, 1000);

function updatePage() {
  const { displayString } = getTime();

  time.textContent = displayString;
  setBackgroundImg();
}

function setBackgroundImg() {
  const { hour } = getTime();

  if (hour < 12) {
    // morning
    greeting.textContent = "Good Morning";
    document.body.classList = "morning";
  } else if (hour < 18) {
    // afternoon
    greeting.textContent = "Good Afternoon";
    document.body.classList = "afternoon";
  } else {
    // evening
    greeting.textContent = "Good Evening";
    document.body.classList = "evening";
  }
}

function setText(evt) {
  if (evt.keyCode === 13) {
    evt.target.blur();
  }
}

function storeText(evt) {
  localStorage.setItem(evt.target.id, evt.target.textContent);
}
