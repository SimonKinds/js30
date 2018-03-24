const player = document.querySelector('.player');
const viewer = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const playPauseButton = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

function togglePlay() {
  if (viewer.paused) {
    viewer.play();
  } else {
    viewer.pause();
  }
}

function updatePlayPauseButton() {
  playPauseButton.textContent = this.paused ? '>' : '||';
}

function skip() {
  const length = this.dataset.skip;
  viewer.currentTime += parseFloat(length);
}

function rangeUpdate() {
  viewer[this.name] = this.value;
}

function updateProgressBar() {
  const percent = (viewer.currentTime / viewer.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
  const time = (e.offsetX / progress.offsetWidth) * viewer.duration;
  viewer.currentTime = time;
}

viewer.addEventListener('click', togglePlay);
playPauseButton.addEventListener('click', togglePlay);
viewer.addEventListener('play', updatePlayPauseButton);
viewer.addEventListener('pause', updatePlayPauseButton);
skipButtons.forEach(view => view.addEventListener('click', skip));
ranges.forEach(view => view.addEventListener('change', rangeUpdate));
viewer.addEventListener('timeupdate', updateProgressBar);
progress.addEventListener('click', scrub);

let mouseDown = false;
progress.addEventListener('mousemove', e => mouseDown && scrub(e));
progress.addEventListener('mousedown', () => mouseDown = true);
progress.addEventListener('mouseup', () => mouseDown = false);