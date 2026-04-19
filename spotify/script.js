
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

const playMusic = (track) => {
  if (!track) {
    console.error("No track provided");
    return;
  }

  currentSong.src = `/spotify/songs/${track}`; // fix path if needed
  currentSong.play();
  play.src = "./svg/pause.svg"
  let currSongName = decodeURIComponent(track).replace(".mp3", "");
  document.querySelector(".songinfo").innerHTML = `${currSongName}`
  document.querySelector(".songtime").innerHTML = ` 00 / 00`

  console.log("Playing:", decodeURIComponent(track));
};

async function main() {
  let songUL = document.querySelector(".songList ul");
  let songs = await getSongs();
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

  play.addEventListener("click", () =>{
    if(currentSong.paused){
        currentSong.play()
        play.src = "./svg/pause.svg"
    } else {
        currentSong.pause()
        play.src = "./svg/play.svg"
    }
  })


}

main();
