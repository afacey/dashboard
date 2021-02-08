class Dashboard {
  constructor({
    showSeconds = true,
    timeElSelector = "#time",
    greetingElSelector = "#greeting",
    nameElSelector = "#name",
    focusElSelector = "#focus",
  } = {}) {
    this.options = { showSeconds };
    this.timeEl = document.querySelector(timeElSelector);
    this.greetingEl = document.querySelector(greetingElSelector);
    this.nameEl = document.querySelector(nameElSelector);
    this.focusEl = document.querySelector(focusElSelector);
  }

  cache = {};

  updateTime() {
    const { displayString, hour } = this.getTime();

    this.timeEl.textContent = displayString;

    if (!this.cache.hour || this.cache.hour !== hour) {
      this.cache.hour = hour;
      this.updatePageContent();
    }
  }

  getTime() {
    const date = new Date();

    const hour = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    const hourString = hour > 12 ? hour - 12 : hour;
    const minuteString = minutes > 9 ? minutes : "0" + minutes;
    const secondsString = seconds > 9 ? seconds : "0" + seconds;

    const displayString = `${hourString}:${minuteString}${
      this.options.showSeconds ? ":" + secondsString : ""
    } ${hour < 12 ? "AM" : "PM"}`;

    return {
      hour,
      minutes,
      seconds,
      displayString,
    };
  }

  updatePageContent() {
    const { hour } = this.getTime();

    if (hour < 12) {
      // morning
      this.greetingEl.textContent = "Good Morning";
      document.body.classList = "morning";
    } else if (hour < 18) {
      // afternoon
      this.greetingEl.textContent = "Good Afternoon";
      document.body.classList = "afternoon";
    } else {
      // evening
      this.greetingEl.textContent = "Good Evening";
      document.body.classList = "evening";
    }
  }

  setText(evt) {
    if (evt.keyCode === 13) {
      evt.target.blur();
    }
  }

  storeText(evt) {
    localStorage.setItem(evt.target.id, evt.target.textContent);
  }

  init() {
    [this.nameEl, this.focusEl].forEach((el) => {
      el.textContent = localStorage.getItem(el.id) || "";
      el.addEventListener("keydown", this.setText);
      el.addEventListener("blur", this.storeText);
    });

    this.timerId = setInterval(() => this.updateTime(), 1000);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const dashboard = new Dashboard({ showSeconds: false });
  dashboard.init();
});
