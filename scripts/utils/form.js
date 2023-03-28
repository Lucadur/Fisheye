// Create a new div element and set its attributes
let newBg = document.createElement("div");
newBg.setAttribute("id", "newBg");
document.body.appendChild(newBg);

// Get necessary elements
const form = document.querySelector("form");
let headerPage = document.querySelector("header");
let nav = document.querySelector("nav");
let photographHeader = document.querySelector(".photograph-header");
let modal = document.getElementById("contact_modal");
let closeButton = document.getElementById("closeBtn");
let contactButton = document.querySelector(".contact_button");

// Function to display the modal
function displayModal() {
  modal.style.display = "block";
  modal.focus();
  newBg.style.display = "flex";
  modal.style.backgroundColor = "white";
  headerPage.setAttribute("aria-hidden", "true");
  nav.setAttribute("aria-hidden", "true");
  photographHeader.setAttribute("aria-hidden", "true");
  modal.setAttribute("aria-hidden", "false");
}

// Function to close the modal
function closeModal() {
  modal.style.display = "none";
  newBg.style.display = "none";
  headerPage.setAttribute("aria-hidden", "false");
  nav.setAttribute("aria-hidden", "false");
  photographHeader.setAttribute("aria-hidden", "false");
  modal.setAttribute("aria-hidden", "true");
  form.reset();
}

// Close modal if "Esc" is used
modal.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeModal();
  }
});

// Listen for form submission
form.addEventListener("submit", (event) => {
  event.preventDefault();
  // Get form data
  const firstName = document.querySelector("#firstName").value;
  const lastName = document.querySelector("#lastName").value;
  const email = document.querySelector("#email").value;
  const message = document.querySelector("#message").value;

  // Log form data to the console
  console.log("First Name:", firstName);
  console.log("Last Name:", lastName);
  console.log("Email:", email);
  console.log("Message:", message);

  // Close the modal
  closeModal();
});

closeButton.addEventListener("click", closeModal);

contactButton.addEventListener("click", displayModal);
