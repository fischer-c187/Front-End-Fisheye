/**
 * The Lightbox class handles the display of the gallery in large format.
 * @class
 */
export class Lightbox {
  /**
   * Create an instance of the Lightbox class
   * The modal window is initialized as empty
   */
  constructor() {
    this._currentElement = null;
    this._wrapper = document.createElement('dialog');
    this._wrapper.classList.add('lightbox');
    this._wrapper.setAttribute('aria-label', 'image closeup view');
  }

  /**
   * creates an img or video element based on the requested tag
   * @param {String} tag the tag of the element to create: img or video
   * @param {String} src the source URL
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
   * retrieves the first article on the page
   * @returns {HTMLElement}
   */
  getFirstArticle() {
    return document.querySelector('article');
  }

  /**
   * retrieves the last element on the page
   * @returns {HTMLElement}
   */
  getLastArticle() {
    const allArticle = document.querySelectorAll('article');
    return allArticle[allArticle.length - 1];
  }

  /**
   * replaces the media element in the lightbox with that of the current article
   */
  replaceMediaElement() {
    const oldMedia = this._wrapper.querySelector('.lightbox__image');
    const alt = this._currentElement.querySelector(
      '.gallery-card__title'
    ).innerText;

    const src = this._currentElement
      .querySelector('.gallery-card__image')
      .getAttribute('src');

    // generates the media tag based on the end of the source
    const mediaElement = src.endsWith('.mp4')
      ? this.createElement('video', src)
      : this.createElement('img', src);

    mediaElement.setAttribute('alt', alt);

    this._wrapper
      .querySelector('.lightbox__image')
      .parentNode.replaceChild(mediaElement, oldMedia);
  }

  /**
   * replaces the title of the media with that of the current article
   */
  replaceTitle() {
    const newTitle = this._currentElement.querySelector(
      '.gallery-card__title'
    ).innerText;

    this._wrapper.querySelector('.lightbox__title').innerText = newTitle;
  }

  /**
   * Handles navigation of the displayed media
   * @param {String} direction determines the direction of navigation
   */
  switchMedia(direction) {
    let newArticle = null;
    if (direction === 'next') {
      newArticle = this._currentElement.nextSibling;
      console.log(this._currentElement)
      this._currentElement = newArticle ? newArticle : this.getFirstArticle();
    } else if (direction === 'previous') {
      newArticle = this._currentElement.previousSibling;
      console.log(this._currentElement)
      this._currentElement = newArticle ? newArticle : this.getLastArticle();
    } else {
      throw 'unknow Direction';
    }
    this.replaceMediaElement();
    this.replaceTitle();
  }

  /**
   * returns the article that corresponds to the image or link sent
   * @param {HTMLElement} element
   * @returns {HTMLElement}
   */
  getArticle(element) {
    let actualElement = element;
    while (actualElement.tagName !== 'ARTICLE') {
      actualElement = actualElement.parentNode;
    }

    return actualElement;
  }

  /**
   * opens the lightbox when an image is clicked
   */
  open() {
    const allLink = document.querySelectorAll('.open-lightbox');

    // utilisation d'une fonction fleche pour que this soit egale a l'objet
    allLink.forEach((element) => {
      element.addEventListener('click', (event) => {
        event.preventDefault();
        this._currentElement = this.getArticle(event.target);
        console.log(this._currentElement)
        this.replaceMediaElement(event.target);
        this.replaceTitle();
        this._wrapper.showModal();
      });
    });
  }

  /**
   * closes the lightbox when clicking the close icon
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
   * Goes to the next media when clicking on the next icon
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
   * Goes to the previous media when clicking on the previous icon
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
   * Handles navigation of media using keyboard arrows.
   */
  keyNavigation() {
    document.addEventListener('keyup', (event) => {
      if (event.code === 'ArrowRight') {
        console.log('input')
        this.switchMedia('next');
      } else if (event.code === 'ArrowLeft') {
        this.switchMedia('previous');
      }
    });
  }

  /**
   * Generates the content of the lightbox and initializes the events.
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
    this.keyNavigation();
    document.querySelector('main').append(this._wrapper);
  }
}
