const userId = "1342795067609448490"; 
const apiUrl = `https://api.lanyard.rest/v1/users/${userId}`;

fetch(apiUrl)
  .then(res => res.json())
  .then(data => {
    const user = data.data.discord_user;
    const status = data.data.discord_status;
    const activities = data.data.activities;

   
    document.getElementById("avatar").src = `https://cdn.discordapp.com/avatars/${userId}/${user.avatar}.png`;

    const dot = document.getElementById("status-dot");
    dot.classList.add(`status-${status}`);
    document.getElementById("status-text").textContent = `Status: ${status.toUpperCase()}`;

  
    const playingActivity = activities.find(
      act => act.type === 0 || act.type === 2 || act.name === "Spotify"
    );

    const playingText = document.getElementById("playing");
    if (playingActivity) {
      if (playingActivity.name === "Spotify") {
        playingText.textContent = `🎧 Listening to ${playingActivity.details} by ${playingActivity.state}`;
      } else {
        playingText.textContent = `🎮 Playing: ${playingActivity.name}`;
      }
    } else {
      playingText.textContent = `Not playing anything right now.`;
    }
  })
  .catch(err => {
    console.error("API Error:", err);
    document.getElementById("status-text").textContent = "Status: unavailable";
  });

document.addEventListener("mousemove", function (e) {
  const cursor = document.querySelector(".custom-cursor");
  cursor.style.left = `${e.clientX}px`;
  cursor.style.top = `${e.clientY}px`;
});
