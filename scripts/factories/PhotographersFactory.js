export function photographerFactory(data) {
  // Destructure the properties from the `data` object.
  const { name, id, portrait, city, country, tagline, price } = data;

  // The path of the photographer's portrait image.
  const picture = `assets/samples/IDphotos/${portrait}`;

  // Function that generates and returns the DOM structure for the photographer's user card.
  function getUserCardDOM() {
    const article = document.createElement("article");

    const img = document.createElement("img");
    img.setAttribute("src", picture);
    img.alt = "";

    const h2 = document.createElement("h2");
    h2.textContent = name;

    const photographerProfile = document.createElement("div");
    photographerProfile.setAttribute("class", "photographerProfile");

    const profileLink = document.createElement("a");
    profileLink.href = "photographer.html?id=" + id;
    profileLink.setAttribute("aria-label", "Accéder au profil de " + name);
    profileLink.setAttribute("tabindex", "0");

    const profileLocation = document.createElement("p");
    profileLocation.textContent = city + ", " + country;
    profileLocation.setAttribute("class", "profileLocation");

    const profileLine = document.createElement("p");
    profileLine.textContent = tagline;
    profileLine.setAttribute("class", "profileLine");

    const profilePrice = document.createElement("p");
    profilePrice.textContent = price + "€/jour";
    profilePrice.setAttribute("class", "profilePrice");

    const profileInfos = document.createElement("div");
    profileInfos.setAttribute("class", "profileInfos");

    article.appendChild(profileLink);
    article.appendChild(profileInfos);
    profileLink.appendChild(photographerProfile);
    photographerProfile.appendChild(img);
    photographerProfile.appendChild(h2);
    profileInfos.appendChild(profileLocation);
    profileInfos.appendChild(profileLine);
    profileInfos.appendChild(profilePrice);

    return article;
  }

  // Return an object with the photographer's name, portrait image path, and the getUserCardDOM function.
  return { name, picture, getUserCardDOM };
}
