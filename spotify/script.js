function formatTime(seconds) {
  seconds = Math.floor(seconds);

  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;

  return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

async function getSongs() {
  // Fetch songs from your server/folder
  let response = await fetch("http://127.0.0.1:5501/spotify/songs/");
  let data = await response.text();

  // Create temporary div to parse links
  let div = document.createElement("div");
  div.innerHTML = data;

  let links = div.getElementsByTagName("a");
  let songs = [];

  // Extract only .mp3 files
  for (let link of links) {
    if (link.href.endsWith(".mp3")) {
      let song = link.href.split("/songs/")[1];
      songs.push(song);
    }
  }

  return songs;
}

let currentSong = new Audio();

const playMusic = (track, pause = false) => {
  if (!track) {
    console.error("No track provided");
    return;
  }

  currentSong.src = `/spotify/songs/${track}`; // fix path if needed
  if (!pause) {
    currentSong.play();
    play.src = "./svg/pause.svg";
  }
  let currSongName = decodeURIComponent(track).replace(".mp3", "");
  document.querySelector(".songinfo").innerHTML = `${currSongName}`;
  document.querySelector(".songtime").innerHTML = ` 00 / 00`;

  console.log("Playing:", decodeURIComponent(track));
};

async function main() {
  let songUL = document.querySelector(".songList ul");
  let songs = await getSongs();
  playMusic(songs[0], true);
  let html = "";

  for (const song of songs) {
    let songName = decodeURIComponent(song).replace(".mp3", "");

    html += `
      <li>
        <img class="invert" src="./svg/music.svg" alt="music">

        <span class="songName">${songName}</span>

        <img class="invert" src="./svg/play.svg" alt="play">
      </li>
    `;
  }

  songUL.innerHTML = html;
  // Attach an event listener for each song

  Array.from(
    document.querySelector(".songList ul").getElementsByTagName("li"),
  ).forEach((e, index) => {
    e.addEventListener("click", () => {
      playMusic(songs[index]);
    });
  });

  // Attach an eventlistener for play,previous and next

  play.addEventListener("click", () => {
    if (currentSong.paused) {
      currentSong.play();
      play.src = "./svg/pause.svg";
    } else {
      currentSong.pause();
      play.src = "./svg/play.svg";
    }
  });
  // listen for time update event
  currentSong.addEventListener("timeupdate", () => {
    if (!isNaN(currentSong.duration)) {
      document.querySelector(".songtime").innerHTML =
        `${formatTime(currentSong.currentTime)} / ${formatTime(currentSong.duration)}`;
      document.querySelector(".circle").style.left =
        (currentSong.currentTime / currentSong.duration) * 100 + "%";
    }
  });

  // add a event lister for seekbar move
  document.querySelector(".seekbar").addEventListener("click", (e) => {
    const percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;

    document.querySelector(".circle").style.left = percent + "%";
    currentSong.currentTime = (currentSong.duration * percent) / 100
    });
}

main();
