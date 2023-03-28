import { mediaFactory } from "/Fisheye/scripts/factories/MediaFactory.js";
import { initLightBox } from "/Fisheye/scripts/utils/lightbox.js";
import { media } from "../pages/photographer.js";

function sortMediaBy(type) {
  let sortedMedia;
  if (type === "date") {
    sortedMedia = media.sort((a, b) => new Date(b.date) - new Date(a.date));
  } else if (type === "title") {
    sortedMedia = media.sort((a, b) =>
      a.title.toLowerCase().localeCompare(b.title.toLowerCase())
    );
  } else if (type === "popularity") {
    sortedMedia = media.sort((a, b) => b.likes - a.likes);
  }

  // Get the media section container and clear its content
  const photographerMedias = document.querySelector(".media-section");
  photographerMedias.innerHTML = "";

  // Add the sorted media content to the media section container
  sortedMedia.forEach((media, index) => {
    const mediaSection = mediaFactory(media);
    const mediaSectionDOM = mediaSection.getMediaSectionDOM(index);
    photographerMedias.appendChild(mediaSectionDOM);
  });

  // Initialize the lightbox for the new media content
  initLightBox();
}

// Get the dropdown for sorting and add an event listener to sort media on change
const sortBySelect = document.getElementById("order-by");
sortBySelect.addEventListener("change", (event) => {
  sortMediaBy(event.target.value);
});
