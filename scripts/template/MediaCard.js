/**
 * cette classe permet de creer un objets qui gere l'affichage des photos
 * @class
 */
export class MediaCard {
  /**
   * creer une instance de la class MediaCard.
   * @param {Object Media} media
   * @param {Object LikeSubject} likedObserver likedObserver sert a incrementer le total de like
   */
  constructor(media, likedObserver) {
    this._media = media;
    this._wrapper = document.createElement('article');
    this._wrapper.classList.add('gallery-card');
    this._wrapper.setAttribute('id', `id-${this._media.id}`)
    // nous permet de savoir si cette photo est deja like ou pas
    this._liked = false;
    this._Observer = likedObserver;
  }

  get media () {
    return this._media;
  }

  /**
   * gestion du like sur les photos.
   */
  handleLikeButton() {
    const nbr = this._wrapper.querySelector('.gallery-card__nbrLike');
    // nous permet d'ajouter le nombre de like de la photo au compteur total
    this._Observer.fire('ADD', this._media.likes);

    // utilisation d'une fonction flechee pour eviter d'alterer this
    this._wrapper
      .querySelector('.gallery-card__like')
      .addEventListener('click', (event) => {
        if (this._liked) {
          nbr.innerText = parseInt(nbr.innerText, 10) - 1;
          this._Observer.fire('DECR');
          this._liked = false;

          // on modifie le compteur global de notre objet media pour eviter les erreurs lors du tri par popularite 
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
   * Creer et retourne une balise article qui contient l'image, le titre et le compteur de like
   * 
   * @returns {HMTLElement} 
   */
  createMediaCard() {
    let mediaBalise = null;

    if (this._media.isImage()) {
      mediaBalise = `<img src="${this._media.url}" class="gallery-card__image">`;
    } else {
      mediaBalise = `<video src="${this._media.url}" class="gallery-card__image"></video>`;
    }

    const card = `
      <a href="${this._media.url}" class='open-lightbox'>
        ${mediaBalise}
      </a>
      <div class="gallery-card__description">
        <p class="gallery-card__title">
        </p>
        <p class="gallery-card__like">
          <span class="gallery-card__nbrLike">
          </span>
          <i class="fa-solid fa-heart"></i>
        </p>
      </div>
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
