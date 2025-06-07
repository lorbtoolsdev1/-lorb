const userId = "1342795067609448490"; 
const apiUrl = `https://api.lanyard.rest/v1/users/${userId}`;

fetch(apiUrl)
  .then(res => res.json())
  .then(data => {
    const user = data.data.discord_user;
    const status = data.data.discord_status;
    const activities = data.data.activities;

    // Update avatar image
    document.getElementById("avatar").src = `https://cdn.discordapp.com/avatars/${userId}/${user.avatar}.png`;

    // Show only the button of the current status, hide others
    document.querySelectorAll(".status-btn").forEach(btn => {
      if (btn.dataset.status === status) {
        btn.style.display = "inline-block";  // show current status button
      } else {
        btn.style.display = "none";           // hide others
      }
    });

    // Playing activity text
    const playingActivity = activities.find(
      act => act.type === 0 || act.type === 2 || act.name === "Spotify"
    );

    const playingText = document.getElementById("playing");
    if (playingText) {
      if (playingActivity) {
        if (playingActivity.name === "Spotify") {
          playingText.textContent = `🎧 Listening to ${playingActivity.details} by ${playingActivity.state}`;
        } else {
          playingText.textContent = `🎮 Playing: ${playingActivity.name}`;
        }
      } else {
        playingText.textContent = ""; // empty if no activity, no message
      }
    }
  })
  .catch(err => {
    console.error("API Error:", err);
    const playingText = document.getElementById("playing");
    if (playingText) playingText.textContent = "";
    document.querySelectorAll(".status-btn").forEach(btn => btn.style.display = "none");
  });

document.addEventListener("mousemove", function (e) {
  const cursor = document.querySelector(".custom-cursor");
  cursor.style.left = `${e.clientX}px`;
  cursor.style.top = `${e.clientY}px`;
});

// Fix for music autoplay blocking by browsers:
// Play muted autoplay on load, then unmute and play on first user interaction.
window.addEventListener('load', () => {
  const music = document.getElementById('background-music');
  if (music) {
    music.volume = 0.9;
    music.muted = true;  // start muted to allow autoplay
    music.play().catch(() => {
      // Autoplay blocked, silently ignore
    });
  }
});

// Unmute and play music on first user interaction (click or keypress)
function unmuteAndPlay() {
  const music = document.getElementById('background-music');
  if (music && music.muted) {
    music.muted = false;
    music.play().catch(() => {
      // ignore play errors
    });
  }
  window.removeEventListener('click', unmuteAndPlay);
  window.removeEventListener('keydown', unmuteAndPlay);
}
window.addEventListener('click', unmuteAndPlay);
window.addEventListener('keydown', unmuteAndPlay);

// --- New code for blur + overlay reveal ---
const container = document.querySelector('.container');
const overlay = document.getElementById('overlay');

// Start blurred and overlay visible
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
