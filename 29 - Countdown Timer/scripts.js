const timerDisplay = document.querySelector(".display__time-left");
const endTimerDisplay = document.querySelector(".display__end-time");

document.querySelectorAll(".timer__button").forEach(button =>
  button.addEventListener("click", function() {
    timer(this.dataset.time);
  })
);

document.customForm.addEventListener('submit', function (e) {
  e.preventDefault();
  const minutes = parseFloat(this.minutes.value);
  timer(minutes * 60);
});

let handle;
function timer(durationInSeconds) {
  clearInterval(handle);

  const startInMs = Date.now();
  const endInMs = startInMs + durationInSeconds * 1000;

  displayRemainingTime(durationInSeconds);
  displayEndTime(endInMs);

  handle = setInterval(() => {
    const remainingSeconds = Math.round((endInMs - Date.now()) / 1000);
    displayRemainingTime(remainingSeconds);

    if (remainingSeconds <= 0) {
      clearInterval(handle);
    }
  }, 1000);
}

function displayRemainingTime(durationInSeconds) {
  const minutes = Math.floor(durationInSeconds / 60);
  const seconds = durationInSeconds % 60;

  const remainingTimeInText = `${padNumber(minutes)}:${padNumber(seconds)}`;

  timerDisplay.textContent = remainingTimeInText;
  document.title = remainingTimeInText;
}

function displayEndTime(endInMs) {
  const endDay = new Date(endInMs);
  const hour = endDay.getHours();
  const minutes = endDay.getMinutes();
  endTimerDisplay.textContent = `Come back at ${padNumber(hour)}:${padNumber(
    minutes
  )}`;
}

function padNumber(num) {
  if (num >= 10) {
    return num;
  }
  return "0" + num;
}
