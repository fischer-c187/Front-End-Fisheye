/**
 * Class qui se charge du rendu de la card photographe
 * @class
 */
export class PhotographeCard {

  /**
   * creer une nouvelle instance de la classe photographeCard
   * l'element wrapper correspond a ce qui va etre renvoye pour etre inserer dans notre parent 
   *
   * @param {Photographer} photographer 
   */
  constructor (photographer) {
    this._photographer = photographer;
    
    this._wrapper = document.createElement('article');
    this._wrapper.classList.add('card')

  }

  /**
   * insert notre valeur dans l'element. Cette methode est utilise avec innerText
   * plutot que innerHTML pour eviter de futur probleme de securiter.
   * 
   * @param {Element} element receptacle de notre valeur
   * @param {String} value valeur a inserer
   */
  setValue (element, value) {
    element.innerText = value;
  }

  /**
   * creer la structure html correspondant a notre card de chaque photographe
   * 
   * @returns {Element} this._wrapper
   */
  createPhotographeCard () {
    // Pour une raison de securite les elements ne sont pas directement inclus
    // dans notre bloc card, en revanche on insert les valeurs des attributs
    const card = `
      <a href="photographer.html?id=${this._photographer.id}">
        <img src="${this._photographer.image}" alt="" class="card__image">
        <h2 class="card__name"></h2>
      </a>
      <p class="card__location">
        <span class="card__city"></span>,
        <span class="card__country"></span>
      </p>
      <p class="card__tagline"></p>
      <p class="card__pricePerDay"><span class="card__price"></span>€/jour</p>
    `
    
    this._wrapper.innerHTML = card;

    // on recupere les noms de propriete de notre objet photographer et on itere dessus
    // on test si il existe un element avec une class .card__nomElement
    // si oui on insere la valeur qui correspond
    // ! question mentor: cette methode oblige de suivre une convention de nommage stricte en css
    Object.getOwnPropertyNames(this._photographer)
      .forEach(selector => {
        const element = this._wrapper.querySelector(`.card_${selector}`);
        if (element) {
          this.setValue(element, this._photographer[selector.slice(1)]);
        }
      });

    return this._wrapper;
  }
}