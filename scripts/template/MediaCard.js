/**
 * This class creates an object that manages the display of photos.
 * @class
 */
export class MediaCard {
  /**
   * create an instance of the MediaCard class.
   * @param {Object Media} media
   * @param {Object LikeSubject} likedObserver likedObserver is used to increment the total number of likes
   */
  constructor(media, likedObserver) {
    this._media = media;
    this._Observer = likedObserver;
    this._LSlikedPhotos = this.initialiseLocalStorage();
    this._liked = this.likeInLocalStorage();

    this._wrapper = document.createElement('article');
    this._wrapper.classList.add('gallery-card');
    this._wrapper.setAttribute('id', `id-${this._media.id}`);

    this.updateNbrLike();
  }

  /**
   * Initializes the LocalStorage to store liked photos
   *
   * @return {Object} The liked photos stored in the LocalStorage
   */
  initialiseLocalStorage = () => {
    if (!localStorage.getItem('likedPhotos')) {
      localStorage.setItem(
        'likedPhotos',
        JSON.stringify({ [this._media.id]: false })
      );
    }

    return JSON.parse(localStorage.getItem('likedPhotos'));
  };

  /**
   * Updates the LocalStorage with the value of the like
   *
   * @param {boolean} value - The value of the like
   */
  updateLocalStorage(value) {
    const temp = JSON.parse(localStorage.getItem('likedPhotos'))
    temp[this._media.id] = value;
    localStorage.setItem('likedPhotos', JSON.stringify(temp));
  }

  /**
   * Checks if the photo is liked in the LocalStorage
   * If the photo is not liked, it is added to the LocalStorage
   *
   * @return {boolean} The value of the like in the LocalStorage
   */
  likeInLocalStorage() {
    if (JSON.parse(localStorage.getItem('likedPhotos'))[this._media.id]) {
      return JSON.parse(localStorage.getItem('likedPhotos'))[this._media.id];
    } else {
      this.updateLocalStorage(false);
      return false;
    }
  }

  /**
   * Updates the number of likes of the photo if it is liked in the LocalStorage
   */
  updateNbrLike() {
    if (JSON.parse(localStorage.getItem('likedPhotos'))[this._media.id] === true) {
      this._media.incrementLike();
    }
  }

  /**
   * heart animation management
   */
  animeHeart() {
    const maskElement = this._wrapper.querySelector('.heart__mask');
    if (maskElement.classList.contains('heart--liked')) {
      maskElement.classList.remove('heart--liked');
    }
    maskElement.classList.toggle('heart-anime');
  }

  /**
   * Handling of the "like" on photos.
   */
  handleLikeButton() {
    const nbr = this._wrapper.querySelector('.gallery-card__nbrLike');
    // adds the photo's like count to the total like counter
    this._Observer.fire('ADD', this._media.likes);

    // use an arrow function to avoid altering the value of 'this'
    this._wrapper
      .querySelector('.gallery-card__like')
      .addEventListener('click', (event) => {
        event.preventDefault();
        if (this._liked) {
          nbr.innerText = parseInt(nbr.innerText, 10) - 1;
          this._Observer.fire('DECR');
          this.updateLocalStorage(false);
          this._media.decrementLike();
        } else {
          nbr.innerText = parseInt(nbr.innerText, 10) + 1;
          this._Observer.fire('INCR');
          this.updateLocalStorage(true);
          this._media.incrementLike();
        }
        this._liked = !this._liked;
        this.animeHeart();
      });
  }

  /**
   * Creates and returns an article tag that contains the image, title, and like counter.
   *
   * @returns {HMTLElement}
   */
  createMediaCard() {
    let mediaBalise = null;

    if (this._media.isImage()) {
      mediaBalise = `<img src="${this._media.url}" class="gallery-card__image" alt="${this._media.title}">`;
    } else {
      mediaBalise = `<video src="${this._media.url}" class="gallery-card__image" alt="${this._media.title}"></video>`;
    }

    const card = `
      <figure>
        <a href="${this._media.url}" aria-label="Open Lightbox" class='open-lightbox'>
          ${mediaBalise}
        </a>
        <figcaption class="gallery-card__description">
          <p class="gallery-card__title">
          </p>
          <a href="" class="gallery-card__like" aria-label="likes" tabindex="0">
            <span class="gallery-card__nbrLike">
            </span>
            <div class="heart">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="-19 -19 550 550"
            >
              <path
                class="heart__fill"
                d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"
              />
              <path
                class="heart__mask 
                ${this._liked ? 'heart--liked heart-anime' : ''}"
                d="M0 96C0 60.7 28.7 32 64 32H384c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96z"
              />
              <path
                class="heart__stroke"
                d="M244 84L255.1 96L267.1 84.02C300.6 51.37 347 36.51 392.6 44.1C461.5 55.58 512 115.2 512 185.1V190.9C512 232.4 494.8 272.1 464.4 300.4L283.7 469.1C276.2 476.1 266.3 480 256 480C245.7 480 235.8 476.1 228.3 469.1L47.59 300.4C17.23 272.1 0 232.4 0 190.9V185.1C0 115.2 50.52 55.58 119.4 44.1C164.1 36.51 211.4 51.37 244 84C243.1 84 244 84.01 244 84L244 84zM255.1 163.9L210.1 117.1C188.4 96.28 157.6 86.4 127.3 91.44C81.55 99.07 48 138.7 48 185.1V190.9C48 219.1 59.71 246.1 80.34 265.3L256 429.3L431.7 265.3C452.3 246.1 464 219.1 464 190.9V185.1C464 138.7 430.4 99.07 384.7 91.44C354.4 86.4 323.6 96.28 301.9 117.1L255.1 163.9z"
              />
            </svg>
            </div>
          </a>
        </figcaption>
      </figure>
      `;
    this._wrapper.innerHTML = card;

    this._wrapper.querySelector('.gallery-card__title').innerText =
      this._media.title;
    this._wrapper.querySelector('.gallery-card__nbrLike').innerText =
      this._media.likes;

    this.handleLikeButton();

    return this._wrapper;
  }
}
