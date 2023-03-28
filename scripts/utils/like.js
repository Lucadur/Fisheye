export function upgradeLike(e) {
  // Get the media likes count and convert to integer
  const mediaLikes = e.target.parentElement.querySelector(".media-likes");
  let currentLike = parseInt(mediaLikes.innerText);

  // Get the global like count from local storage and convert to integer
  let totalLike = parseInt(localStorage.getItem("globalLike"));

  // Increment the global like count and update the media likes count
  localStorage.setItem("globalLike", totalLike + 1);
  mediaLikes.innerText = currentLike + 1;

  // Update the total like count in the header
  document.getElementById("total-like").innerText = totalLike + 1;

  // Remove the event listener to prevent multiple clicks
  e.target.removeEventListener("click", upgradeLike);
}
