/**
 * la class lightbox gere l'affichage de la galerie en grand format.
 * @class
 */
export class Lightbox {
  /**
   * creer une instance de la class lightbox
   * la fenetre modal est initialisee a vide
   */
  constructor() {
    this._currentElement = null;
    this._wrapper = document.createElement('dialog');
    this._wrapper.classList.add('lightbox');
    this._wrapper.setAttribute('aria-label', 'image closeup view')
  }

  /**
   * creer un element img ou video selon la balise demandee
   * @param {String} balise la balise de l'element a creer : img ou video
   * @param {String} src l'url de la source
   * @returns {HTMLElement}
   */
  createElement(balise, src) {
    const element = document.createElement(balise);
    element.classList.add('lightbox__image');
    element.setAttribute('src', src);
    if (balise === 'video') {
      element.setAttribute('controls', '');
    }

    return element;
  }

  
  /**
   * recupere le premier article de la page
   * @returns {HTMLElement}
   */
  getFirstArticle() {
    return document.querySelector('article');
  }

  /**
   * recupere le dernier element de la page
   * @returns {HTMLElement}
   */
  getLastArticle() {
    const allArticle = document.querySelectorAll('article');
    return allArticle[allArticle.length - 1];
  }

  /**
   * remplace l'element media dans la fenetre par celui de l'article courant
   */
  replaceMediaElement() {
    const oldMedia = this._wrapper.querySelector('.lightbox__image');
    const alt = this._currentElement.querySelector(
      '.gallery-card__title'
    ).innerText;

    const src = this._currentElement
      .querySelector('.gallery-card__image')
      .getAttribute('src');

    // on genere notre balise selon la fin de la source
    const mediaElement = src.endsWith('.mp4')
      ? this.createElement('video', src)
      : this.createElement('img', src);

    mediaElement.setAttribute('alt', alt)
    
    this._wrapper
      .querySelector('.lightbox__image')
      .parentNode.replaceChild(mediaElement, oldMedia);
  }
  
  /**
   * remplace le titre du media par celui de l'article courant
   */
  replaceTitle() {
    const newTitle = this._currentElement.querySelector(
      '.gallery-card__title'
    ).innerText;

    this._wrapper.querySelector('.lightbox__title').innerText = newTitle;
  }

  /**
   * gere la navigation du media afficher
   * @param {String} direction permet de determine le sens de navigation
   */
  switchMedia(direction) {
    let newArticle = null;
    if (direction === 'next') {
      newArticle = this._currentElement.nextSibling;
      this._currentElement = newArticle ? newArticle : this.getFirstArticle();
    } else if (direction === 'previous') {
      newArticle = this._currentElement.previousSibling;
      this._currentElement = newArticle ? newArticle : this.getLastArticle();
    } else {
      throw "unknow Direction"
    }
    this.replaceMediaElement();
    this.replaceTitle();
  }

  /**
   * ouvre la lightbox lorsqu'on clique sur une image
   */
  open() {
    const allLink = document.querySelectorAll('.open-lightbox');

    // utilisation d'une fonction fleche pour que this soit egale a l'objet
    allLink.forEach((element) => {
      element.addEventListener('click', (event) => {
        event.preventDefault();

        this._currentElement = event.target.parentNode.parentNode;

        this.replaceMediaElement(event.target);
        this.replaceTitle();
        this.keyNavigation();
        this._wrapper.showModal();
      });
    });
  }

  /**
   * ferme la lightbox quand on clique sur l'icone de fermeture
   */
  close() {
    this._wrapper
      .querySelector('.lightbox__close')
      .addEventListener('click', (event) => {
        event.preventDefault();
        this._wrapper.close();
      });
  }

  /**
   * passe au media suivant quand on clique sur l'icone suivant
   */
  nextMedia() {
    this._wrapper
      .querySelector('.lightbox__nextImage')
      .addEventListener('click', (event) => {
        event.preventDefault();
        this.switchMedia('next');
      });
  }

  /**
   * passe au media precedent quand on clique sur l'icone precedent
   */
  previousMedia() {
    this._wrapper
      .querySelector('.lightbox__previousImage')
      .addEventListener('click', (event) => {
        event.preventDefault();
        this.switchMedia('previous');
      });
  }

  /**
   * gere la navigation des medias avec les fleches du clavier
   */
  keyNavigation() {
    document.addEventListener('keydown', (event) => {
      if (event.code === 'ArrowRight') {
        this.switchMedia('next');
      } else if (event.code === 'ArrowLeft') {
        this.switchMedia('previous');
      }
    });
  }

  /**
   * genere le contenu de la lightbox et initialise les events 
   */
  render() {
    const lightboxContent = `
      <div class="lightbox__content">
        <button type"button" class='lightbox__close' aria-label="Close dialog"><i class="fa-solid fa-xmark lightbox__icon"></i></button>
        <a href="#" class="lightbox__previousImage" aria-label="Previous Image"><i class="fa-solid fa-angle-left lightbox__icon"></i></a>
        <div class="lightbox__media">
          <img src="" alt="" class='lightbox__image'>
          <p class="lightbox__title">test</p>
        </div>
        <a href="#" class="lightbox__nextImage" aria-label="Next Image"><i class="fa-solid fa-angle-right lightbox__icon"></i></a>
      </div>
    `;

    this._wrapper.innerHTML = lightboxContent;
    this.open();
    this.close();
    this.nextMedia();
    this.previousMedia();

    document.querySelector('main').append(this._wrapper);
  }
}
