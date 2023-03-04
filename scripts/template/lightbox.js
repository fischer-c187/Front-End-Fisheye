export class Lightbox {
  constructor() {
    this._currentElement = null;
    this._wrapper = document.createElement('dialog');
    this._wrapper.classList.add('lightbox');
  }

  createElement(balise, src) {
    const element = document.createElement(balise);
    element.classList.add('lightbox__image');
    element.setAttribute('src', src);
    if (balise === 'video') {
      element.setAttribute('controls', '');
    }

    return element;
  }

  getFirstArticle() {
    return document.querySelector('article');
  }

  getLastArticle() {
    const allArticle = document.querySelectorAll('article');
    return allArticle[allArticle.length - 1];
  }

  replaceMediaElement() {
    const oldMedia = this._wrapper.querySelector('.lightbox__image');
    const src = this._currentElement
      .querySelector('.gallery-card__image')
      .getAttribute('src');
    const mediaElement = src.endsWith('.mp4')
      ? this.createElement('video', src)
      : this.createElement('img', src);

    this._wrapper
      .querySelector('.lightbox__image')
      .parentNode.replaceChild(mediaElement, oldMedia);
  }

  replaceTitle () {
    const newTitle = this._currentElement
      .querySelector('.gallery-card__title')
      .innerText

    this._wrapper.querySelector('.lightbox__title').innerText = newTitle
  }

  open() {
    const allLink = document.querySelectorAll('.open-lightbox');

    // utilisation d'une fonction fleche pour que this sois egale a l'objet
    allLink.forEach((element) => {
      element.addEventListener('click', (event) => {
        event.preventDefault();

        this._currentElement = event.target.parentNode.parentNode;

        this.replaceMediaElement(event.target)
        this.replaceTitle()
        this._wrapper.showModal();
      });
    });
  }

  close() {
    this._wrapper
      .querySelector('.lightbox__close')
      .addEventListener('click', (event) => {
        event.preventDefault();
        this._wrapper.close();
      });
  }

  nextMedia() {
    this._wrapper
      .querySelector('.lightbox__nextImage')
      .addEventListener('click', () => {
        const next = this._currentElement.nextSibling;
        if (next) {
          this._currentElement = next;
          this.replaceMediaElement();
          this.replaceTitle()
        }
        else {
          this._currentElement = this.getFirstArticle();
          this.replaceMediaElement();
          this.replaceTitle()
        }
      });
  }

  previousMedia() {
    this._wrapper
      .querySelector('.lightbox__previousImage')
      .addEventListener('click', () => {
        const previous = this._currentElement.previousSibling;
        if (previous) {
          this._currentElement = previous;
          this.replaceMediaElement();
          this.replaceTitle()
        }
        else {
          this._currentElement = this.getLastArticle();
          this.replaceMediaElement();
          this.replaceTitle()
        }
      });
  }

  render() {
    const lightboxContent = `
      <div class="lightbox__content">
        <a href="#" class='lightbox__close'><i class="fa-solid fa-xmark lightbox__icon"></i></a>
        <a href="#" class="lightbox__previousImage"><i class="fa-solid fa-angle-left lightbox__icon"></i></a>
        <div class="lightbox__media">
          <img src="" alt="" class='lightbox__image'>
          <p class="lightbox__title">test</p>
        </div>
        <a href="#" class="lightbox__nextImage"><i class="fa-solid fa-angle-right lightbox__icon"></i></a>
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
