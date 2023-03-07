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
    this._wrapper = document.createElement('article');
    this._wrapper.classList.add('gallery-card');
    this._wrapper.setAttribute('id', `id-${this._media.id}`);
    // nous permet de savoir si cette photo est deja like ou pas
    this._liked = false;
    this._Observer = likedObserver;
  }

  get media() {
    return this._media;
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
          this._liked = false;

          // increments the total likes count of the photo
          this._media.decrementLike();
        } else {
          nbr.innerText = parseInt(nbr.innerText, 10) + 1;
          this._Observer.fire('INCR');
          this._liked = true;
          this._media.incrementLike();
        }
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
            <i class="fa-solid fa-heart"></i>
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
