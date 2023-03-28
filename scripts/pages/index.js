import { photographerFactory } from "/Fisheye/scripts/factories/PhotographersFactory.js";

// Set global like count to 0 in local storage
localStorage.setItem("globalLike", 0);

// Fetch photographers data from JSON file
const getPhotographers = async () => {
  const resultPromise = await fetch("data/photographers.json");
  const resultJson = await resultPromise.json();
  return resultJson;
};

// Display photographers data on the page
async function displayData(photographers) {
  const photographersSection = document.querySelector(".photographer_section");

  // Create a user card for each photographer and append it to the page
  photographers.forEach((photographer) => {
    const photographerModel = photographerFactory(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
  });
}

// Initialize the page by fetching data and displaying it
async function init() {
  // Get photographers data from JSON file
  const { photographers } = await getPhotographers();

  // Display photographers data on the page
  displayData(photographers);
}

// Call the init function to initialize the page
init();
