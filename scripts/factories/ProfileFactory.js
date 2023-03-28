export function profileFactory(data) {
  const { name, portrait, city, country, tagline, price } = data;

  const picture = `assets/samples/IDphotos/${portrait}`;

  function getPhotographerHeaderDOM() {
    const photographerPageHeader = document.querySelector(".photograph-header");

    const h1 = document.createElement("h1");
    h1.textContent = name;

    const profileLocation = document.createElement("h2");
    profileLocation.textContent = city + ", " + country;
    profileLocation.setAttribute("id", "profileLocation");

    const profileLine = document.createElement("p");
    profileLine.textContent = tagline;
    profileLine.setAttribute("id", "profileLine");

    const photographerDesc = document.getElementById(
      "photographer-description"
    );

    const img = document.createElement("img");
    img.setAttribute("src", picture);
    img.setAttribute("id", "profilePic");
    img.alt = "";

    const likeIcon = document.createElement("i");
    likeIcon.classList.add("fas", "fa-heart");
    likeIcon.setAttribute("aria-label", "likes");

    const totalLikes = document.createElement("span");
    const globalLike = localStorage.getItem("globalLike");
    totalLikes.textContent = globalLike;
    totalLikes.id = "total-like";

    const profileInfos = document.createElement("div");
    profileInfos.setAttribute("id", "profile-infos");

    const TotalLikeContainer = document.createElement("div");
    TotalLikeContainer.id = "totallike-container";

    const profilePrice = document.createElement("h2");
    profilePrice.textContent = price + "€ / jour";
    profilePrice.setAttribute("id", "profile-price");

    photographerPageHeader.appendChild(img);
    photographerPageHeader.appendChild(profileInfos);

    photographerDesc.appendChild(h1);
    photographerDesc.appendChild(profileLocation);
    photographerDesc.appendChild(profileLine);

    TotalLikeContainer.appendChild(totalLikes);
    TotalLikeContainer.appendChild(likeIcon);

    profileInfos.appendChild(TotalLikeContainer);
    profileInfos.appendChild(profilePrice);

    return photographerPageHeader;
  }

  // Return an object containing the photographer's name, portrait picture and the getPhotographerHeaderDOM function
  return { name, picture, getPhotographerHeaderDOM };
}
