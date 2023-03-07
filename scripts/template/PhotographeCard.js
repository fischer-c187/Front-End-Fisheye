/**
 * Class that is responsible for rendering the photographer card
 * @class
 */
export class PhotographeCard {
  /**
   * Create a new instance of the PhotographerCard class.
   * The wrapper element corresponds to what will be returned to be inserted into our parent.
   *
   * @param {Photographer} photographer
   */
  constructor(photographer) {
    this._photographer = photographer;

    this._wrapper = document.createElement('article');
    this._wrapper.classList.add('card');
  }

  /**
   * Insert the value into the element. This method is used with innerText
   * instead of innerHTML to avoid future security issues.
   *
   * @param {Element} element The receptacle of the value
   * @param {String} value The value to insert
   */
  setValue(element, value) {
    element.innerText = value;
  }

  /**
   * Create the HTML structure for the photographer card.
   * @returns {Element} this._wrapper
   */
  createPhotographeCard() {
    const card = `
      <a href="photographer.html?id=${this._photographer.id}" aria-label="${this._photographer.name}">
        <img src="${this._photographer.image}" alt="" class="card__image">
        <h2 class="card__name"></h2>
      </a>
      <p class="card__location">
        <span class="card__city"></span>,
        <span class="card__country"></span>
      </p>
      <p class="card__tagline"></p>
      <p class="card__pricePerDay"><span class="card__price"></span>€/jour</p>
    `;

    this._wrapper.innerHTML = card;

    // Loop through the properties of the photographer object and insert their values
    // into the corresponding element in the HTML structure.
    Object.getOwnPropertyNames(this._photographer).forEach((selector) => {
      const element = this._wrapper.querySelector(`.card_${selector}`);
      if (element) {
        this.setValue(element, this._photographer[selector.slice(1)]);
      }
    });

    return this._wrapper;
  }
}
