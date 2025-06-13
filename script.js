const userId = "1342795067609448490";
const apiUrl = `https://api.lanyard.rest/v1/users/${userId}`;

fetch(apiUrl)
  .then(res => res.json())
  .then(data => {
    const user = data.data.discord_user;
    const status = data.data.discord_status;
    const activities = data.data.activities;
    
    document.getElementById("avatar").src = `https://cdn.discordapp.com/avatars/${userId}/${user.avatar}.png`;

    document.querySelectorAll(".status-btn").forEach(btn => {
      if (btn.dataset.status === status) {
        btn.style.display = "inline-block";
      } else {
        btn.style.display = "none";
      }
    });

    const playingText = document.getElementById("playing");
    const activityBox = document.getElementById("activity-box");
    activityBox.innerHTML = ""; // Clear previous

    const spotify = activities.find(act => act.name === "Spotify");
    const game = activities.find(act => act.type === 0 && act.name !== "Spotify");

    if (playingText) {
      if (spotify) {
        playingText.textContent = ``;
      } else if (game) {
        playingText.textContent = ``;
      } else {
        playingText.textContent = "";
      }
    }

    if (spotify) {
      const spotifyBox = `
        <div class="activity spotify">
          <p class="activity-title">
            Listening to Spotify <img src="assets/spotify1.png" class="activity-icon" />
          </p>
          <img src="${spotify.assets?.large_image?.startsWith("spotify:") ? 
            `https://i.scdn.co/image/${spotify.assets.large_image.replace("spotify:", "")}` : 
            'assets/music.png'}" class="song-icon" />
          <p class="song-name">${spotify.details}</p>
          <p class="song-artist">${spotify.state}</p>
        </div>
      `;
      activityBox.innerHTML += spotifyBox;
    }
  })
  .catch(err => {
    console.error("API Error:", err);
    document.getElementById("playing").textContent = "";
    document.getElementById("activity-box").innerHTML = "";
    document.querySelectorAll(".status-btn").forEach(btn => btn.style.display = "none");
  });

function formatTime(startTimestamp) {
  const diff = Date.now() - startTimestamp;
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(minutes / 60);
  const remaining = minutes % 60;
  return hours > 0 ? `${hours}h ${remaining}m` : `${remaining}m`;
}

document.addEventListener("mousemove", function (e) {
  const cursor = document.querySelector(".custom-cursor");
  cursor.style.left = `${e.clientX}px`;
  cursor.style.top = `${e.clientY}px`;
});

window.addEventListener('load', () => {
  const music = document.getElementById('background-music');
  if (music) {
    music.volume = 0.9;
    music.muted = true;
    music.play().catch(() => {});
  }
});

function unmuteAndPlay() {
  const music = document.getElementById('background-music');
  if (music && music.muted) {
    music.muted = false;
    music.play().catch(() => {});
  }
  window.removeEventListener('click', unmuteAndPlay);
  window.removeEventListener('keydown', unmuteAndPlay);
}
window.addEventListener('click', unmuteAndPlay);
window.addEventListener('keydown', unmuteAndPlay);

const container = document.querySelector('.container');
const overlay = document.getElementById('overlay');
container.classList.add('blur');

function revealSite() {
  container.classList.remove('blur');
  overlay.style.display = 'none';
  window.removeEventListener('click', revealSite);
  window.removeEventListener('keydown', revealSite);
  window.removeEventListener('touchstart', revealSite);
}

window.addEventListener('click', revealSite);
window.addEventListener('keydown', revealSite);
window.addEventListener('touchstart', revealSite);

function showSuccessBar() {
  const bar = document.getElementById("success-bar");
  if (!bar) return;

  bar.style.opacity = "1";

  setTimeout(() => {
    bar.style.opacity = "0";
  }, 3000);
}

window.addEventListener("load", showSuccessBar);

const titleText = "@Lorb";
let titleIndex = 0;
let typingForward = true;

document.title = ""; 

function animateTitle() {
  if (typingForward) {
    if (titleIndex < titleText.length) {
      titleIndex++;
    } else {
      typingForward = false;
    }
  } else {
    if (titleIndex > 1) {
      titleIndex--;
    } else {
      typingForward = true;
    }
  }

  document.title = titleText.substring(0, titleIndex);
  setTimeout(animateTitle, 300); 
}

animateTitle();