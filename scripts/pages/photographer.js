import { profileFactory } from "/Fisheye/scripts/factories/ProfileFactory.js";
import { mediaFactory } from "/Fisheye/scripts/factories/MediaFactory.js";
import { initLightBox } from "/Fisheye/scripts/utils/lightbox.js";

// Get query parameters from URL
const params = new URLSearchParams(window.location.search);
const photographerId = params.get("id");

// Define variables for photographer and media
let photographer;
export let media;

// Fetch photographer data from JSON file
const getPhotographer = async () => {
  const resultPromise = await fetch("data/photographers.json");
  const resultJson = await resultPromise.json();

  // Find photographer data matching the id parameter
  photographer = resultJson.photographers.find(
    (data) => data.id.toString() === photographerId.toString()
  );

  // Filter media data to match the photographer's id
  media = resultJson.media.filter(
    (data) => data.photographerId.toString() === photographerId.toString()
  );
};

// Display photographer data on the page
function displayData(photographer) {
  const photographerPage = profileFactory(photographer);
  photographerPage.getPhotographerHeaderDOM();

  // Set modal title to photographer's name
  const modalTitle = document.getElementById("contact-header");
  modalTitle.innerHTML = "Contactez-moi<br>" + photographer.name;
}

// Display global like count on the page
function displayGlobalLike() {
  const totalLikes = document.getElementById("total-like");

  // Get global like count from local storage
  const globalLike = localStorage.getItem("globalLike");
  totalLikes.textContent = globalLike;
}

// Display media data on the page
function displayMedia(media) {
  const photographerMedias = document.querySelector(".media-section");
  let globalLike = 0;

  media.forEach((media, index) => {
    // Calculate global like count for all media
    globalLike += parseInt(media.likes);

    // Create media section and append it to the page
    const mediaSection = mediaFactory(media);
    const mediaSectionDOM = mediaSection.getMediaSectionDOM(index);
    photographerMedias.appendChild(mediaSectionDOM);
  });

  // Save global like count to local storage and display it on the page
  localStorage.setItem("globalLike", globalLike);
  displayGlobalLike();
}

// Initialize the page by fetching data and displaying it
async function init() {
  await getPhotographer();
  displayData(photographer);
  displayMedia(media);
  displayGlobalLike();
  initLightBox();
}

// Call the init function to initialize the page
init();
