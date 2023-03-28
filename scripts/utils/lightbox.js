// Get DOM elements
const lightbox = document.querySelector(".lightbox");
const content = document.querySelector(".main-media");
const prevButton = document.querySelector(".prev");
const nextButton = document.querySelector(".next");
const closeButton = document.querySelector(".close");
const mediaContainer = document.querySelector(".media-container");

let headerPage = document.querySelector(".header-page");
let nav = document.querySelector("nav");
let photographHeader = document.querySelector(".photograph-header");
let mediaContent;

// Initialize variables
let currentIndex = 0;

// Function to initialize lightbox
export function initLightBox() {
  mediaContent = document.querySelectorAll(".media-article");
  // Add event listener to each media element
  mediaContent.forEach((media, index) => {
    let mediaImage = media.querySelector(".media-image");
    let mediaVideo = media.querySelector(".media-video");
    let mediaElement = mediaImage || mediaVideo;

    // Open lightbox when clicked
    mediaElement.addEventListener("click", () => displayLightBox(index));

    // Open lightbox when Enter key is pressed
    mediaElement.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        displayLightBox(index);
      }
    });
  });
}

// Function to close lightbox
function closeLightbox() {
  // Remove visible class and hide lightbox
  content.classList.remove("visible");
  lightbox.style.display = "none";

  // Clear content and set aria-hidden attributes
  content.innerHTML = "";
  lightbox.setAttribute("aria-hidden", "true");
  headerPage.setAttribute("aria-hidden", "false");
  nav.setAttribute("aria-hidden", "false");
  photographHeader.setAttribute("aria-hidden", "false");
}

// Add event listener to close button
closeButton.addEventListener("click", closeLightbox);

// Add event listener to close lightbox when Escape key is pressed
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    closeLightbox();
  }
});

// Function to display lightbox
function displayLightBox(index) {
  content.innerHTML = "";
  mediaContainer.innerHTML = "";
  currentIndex = index;

  // Add visible class to content element
  content.setAttribute("class", "visible");

  // Get media content and type
  let mediaContent = document.querySelectorAll(".media-image, .media-video");
  const mediaType = mediaContent[currentIndex].tagName.toLowerCase();

  // Create media element based on type
  if (mediaType === "img") {
    const img = document.createElement("img");
    img.setAttribute("src", mediaContent[currentIndex].getAttribute("src"));
    img.setAttribute(
      "alt",
      mediaContent[currentIndex].parentNode.querySelector(".media-title")
        .textContent
    );
    img.classList.add("media-content");
    mediaContainer.appendChild(img);
    content.appendChild(mediaContainer);
    img.focus();
  } else if (mediaType === "video") {
    const video = document.createElement("video");
    video.setAttribute("src", mediaContent[currentIndex].getAttribute("src"));
    video.setAttribute("controls", "");
    video.setAttribute(
      "alt",
      mediaContent[currentIndex].parentNode.querySelector(".media-title")
        .textContent
    );
    video.classList.add("media-content");
    mediaContainer.appendChild(video);
    content.appendChild(mediaContainer);
    video.focus();
  }

  // Add title to lightbox
  const title = document.createElement("h2");
  title.textContent =
    mediaContent[currentIndex].parentNode.querySelector(
      ".media-title"
    ).textContent;
  title.setAttribute("id", "lightbox-title");
  content.appendChild(title);

  prevButton.removeEventListener("click", showPrevMedia);
  nextButton.removeEventListener("click", showNextMedia);

  prevButton.addEventListener("click", showPrevMedia);
  nextButton.addEventListener("click", showNextMedia);

  lightbox.style.display = "flex";

  // Center title by setting margin-left

  const visibleElement = document.querySelector(".visible img, .visible video");
  if (visibleElement) {
    let result = getMarginLeft();
    title.style.marginLeft = result + "px";
  }

  // Listen for left and right arrow key presses to navigate between media
  document.addEventListener("keydown", function (event) {
    if (event.key === "ArrowLeft") {
      showPrevMedia();
    } else if (event.key === "ArrowRight") {
      showNextMedia();
    }
  });

  // Set aria-hidden attributes to indicate changes in screen reader focus
  lightbox.setAttribute("aria-hidden", "false");
  headerPage.setAttribute("aria-hidden", "true");
  nav.setAttribute("aria-hidden", "true");
  photographHeader.setAttribute("aria-hidden", "true");
}

// Function to display previous media
function showPrevMedia() {
  currentIndex = (currentIndex - 1 + mediaContent.length) % mediaContent.length;
  displayLightBox(currentIndex);
}

// Function to display next media
function showNextMedia() {
  currentIndex = (currentIndex + 1) % mediaContent.length;
  displayLightBox(currentIndex);
}

// Function to get margin-left to center title

function getMarginLeft() {
  const margin =
    document.querySelector(".visible").clientWidth -
    document.querySelector(".visible img, .visible video").clientWidth;
  return margin / 2;
}
