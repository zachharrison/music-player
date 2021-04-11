// const musicContainer = document.querySelector('.music-container');
// const playBtn = document.querySelector('#play');
// const prevBtn = document.querySelector('#prev');
// const nextBtn = document.querySelector('#next');
// const audio = document.querySelector('#audio');
// const progress = document.querySelector('#progress');
// const progressContainer = document.querySelector('#progress-container');
// const title = document.querySelector('#title');
// const cover = document.querySelector('#cover');

// SONG TITLES
const songs = [
  '01 - Inside Outside',
  '02 - Here We Go',
  '03 - Friends (feat ScHoolboy Q)',
  '04 - Angel Dust',
  '05 - Malibu',
  '06 - What Do You Do (feat Sir Michael Rocks)',
  '07 - It Just Doesnt Matter',
  '08 - Therapy',
  '09 - Polo Jeans (feat Earl Sweatshirt)',
  '10 - Happy Birthday',
  '11 - Wedding',
  '12 - Funeral',
  '13 - Diablo',
  '14 - Ave Maria',
  '15 - 55',
  '16 - San Francisco',
  '17 - Colors and Shapes',
  '18 - Insomniak (feat Rick Ross)',
  '19 - Uber (feat Mike Jones)',
  '20 - Rain (feat Vince Staples)',
  '21 - Apparition',
  '22 - Thumbalina',
  '23 - New Faces v2 (feat Earl Sweatshirt Dah)',
  '24 - Grand Finale',
];

const musicContainer = document.getElementById('music-container');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title');
const cover = document.getElementById('cover');

let songIndex = 0;

// UPDATE SONG DETAILS
function loadSong(song) {
  title.innerText = song;
  audio.src = `music/${song}.mp3`;
}

function playSong() {
  musicContainer.classList.add('play');
  playBtn.querySelector('i.fas').classList.remove('fa-play');
  playBtn.querySelector('i.fas').classList.add('fa-pause');

  audio.play();
}

function pauseSong() {
  musicContainer.classList.remove('play');
  playBtn.querySelector('i.fas').classList.add('fa-play');
  playBtn.querySelector('i.fas').classList.remove('fa-pause');

  audio.pause();
}

function prevSong() {
  songIndex -= 1;

  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }

  loadSong(songs[songIndex]);

  playSong();
}

function nextSong() {
  songIndex += 1;

  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }

  loadSong(songs[songIndex]);

  playSong();
}

function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;
}

function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
}

// EVENT LISTENERS
playBtn.addEventListener('click', () => {
  const isPlaying = musicContainer.classList.contains('play');

  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

// CHANGE SONG EVENT
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

// PROGRESS BAR EVENTS
audio.addEventListener('timeupdate', updateProgress);
progressContainer.addEventListener('click', setProgress);

audio.addEventListener('ended', nextSong);

// INITIALLY LOAD SONG INFO DOM
loadSong(songs[songIndex]);
