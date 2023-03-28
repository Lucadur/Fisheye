import { upgradeLike } from "/Fisheye/scripts/utils/like.js";

class Media {
  constructor(id, photographerId, title, date, likes, tags) {
    this.id = id;
    this.photographerId = photographerId;
    this.title = title;
    this.date = date;
    this.likes = likes;
    this.tags = tags;
  }
}

//  photo media item that extends the Media class
class Photo extends Media {
  constructor(
    id,
    photographerId,
    title,
    date,
    likes,
    tags,
    imageUrl,
    imageAlt
  ) {
    // Calls the constructor of the Media class to initialize properties id, photographerId, title, date, likes and tags.
    super(id, photographerId, title, date, likes, tags);
    this.imageUrl = imageUrl;
    this.imageAlt = imageAlt;
  }

  // Returns a DOM element that represents the Photo media item.
  getMediaSectionDOM() {
    const mediaSection = document.createElement("div");
    mediaSection.classList.add("media-article");

    const mediaImage = document.createElement("img");
    mediaImage.classList.add("media-image");
    mediaImage.setAttribute("src", this.imageUrl);
    mediaImage.setAttribute("alt", "Cliquez pour agrandir l'image ou la vidéo");
    mediaImage.setAttribute("tabindex", "0");

    const mediaTitle = document.createElement("h2");
    mediaTitle.classList.add("media-title");
    mediaTitle.textContent = this.title;

    const mediaLikes = document.createElement("span");
    mediaLikes.classList.add("media-likes");
    mediaLikes.textContent = this.likes;

    const likeIcon = document.createElement("i");
    likeIcon.classList.add("fas", "fa-heart");

    const likeContainer = document.createElement("div");
    likeContainer.classList.add("like-container");
    likeContainer.setAttribute("aria-label", "likes");

    const mediaDescription = document.createElement("div");
    mediaDescription.setAttribute("class", "media-description");

    likeIcon.addEventListener("click", upgradeLike);

    likeContainer.appendChild(mediaLikes);
    likeContainer.appendChild(likeIcon);
    mediaDescription.appendChild(mediaTitle);
    mediaDescription.appendChild(likeContainer);
    mediaSection.appendChild(mediaImage);
    mediaSection.appendChild(mediaDescription);

    return mediaSection;
  }
}

//video media item that extends the Media class.
class Video extends Media {
  constructor(
    id,
    photographerId,
    title,
    date,
    likes,
    tags,
    videoUrl,
    videoAlt
  ) {
    // Calls the constructor of the Media class to initialize properties id, photographerId, title, date, likes and tags.
    super(id, photographerId, title, date, likes, tags);
    this.videoUrl = videoUrl;
    this.videoAlt = videoAlt;
  }

  // Returns a DOM element that represents the Video media item.
  getMediaSectionDOM() {
    const mediaSection = document.createElement("div");
    mediaSection.classList.add("media-article");

    const mediaVideo = document.createElement("video");
    mediaVideo.classList.add("media-video");
    mediaVideo.setAttribute("src", this.videoUrl);
    mediaVideo.setAttribute("alt", "");
    mediaVideo.setAttribute("tabindex", "0");

    const mediaTitle = document.createElement("h2");
    mediaTitle.classList.add("media-title");
    mediaTitle.textContent = this.title;

    const mediaLikes = document.createElement("span");
    mediaLikes.classList.add("media-likes");
    mediaLikes.textContent = this.likes;

    const likeIcon = document.createElement("i");
    likeIcon.classList.add("fas", "fa-heart");

    const likeContainer = document.createElement("div");
    likeContainer.classList.add("like-container");
    likeContainer.setAttribute("aria-label", "likes");

    const mediaDescription = document.createElement("div");
    mediaDescription.setAttribute("class", "media-description");

    likeIcon.addEventListener("click", upgradeLike);

    likeContainer.appendChild(mediaLikes);
    likeContainer.appendChild(likeIcon);
    mediaDescription.appendChild(mediaTitle);
    mediaDescription.appendChild(likeContainer);
    mediaSection.appendChild(mediaVideo);
    mediaSection.appendChild(mediaDescription);

    return mediaSection;
  }
}

// Creating the media depending on the the type (img or video)
export function mediaFactory(media) {
  if (media.image) {
    return new Photo(
      media.id,
      media.photographerId,
      media.title,
      media.date,
      media.likes,
      media.tags,
      `assets/portefolio/${media.photographerId}/${media.image}`,
      media.title
    );
  } else if (media.video) {
    return new Video(
      media.id,
      media.photographerId,
      media.title,
      media.date,
      media.likes,
      media.tags,
      `assets/portefolio/${media.photographerId}/${media.video}`,
      media.title
    );
  } else {
    throw new Error("Unsupported media type");
  }
}
