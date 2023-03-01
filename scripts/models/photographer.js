/**
 * Cette class represente un photographe et contient toutes les infos
 * 
 * @class
 */
export class Photographer {
  
  /**
   * creer une nouvelle instance de la classe Photographer
   * 
   * @param {Object} data
   */
  constructor(data) {
    this._name = data.name;
    this._id = data.id;
    this._city = data.city;
    this._country = data.country;
    this._tagline = data.tagline;
    this._price = data.price;
    this._image = data.portrait
  }

  /**
   * retourne le nom du photographe
   * 
   * @returns {String} this._name
   */
  get name () {
    return this._name;
  }

  /**
   * retourne l'id du photographe
   * 
   * @returns {Number} this._id
   */
  get id () {
    return this._id;
  }

  /**
   * retourne la ville du photographe
   * 
   * @returns {String} this._city
   */
  get city () {
    return this._city;
  }
  
  /**
   * retourne le pays du photographe
   * 
   * @returns {String} this._country
   */
  get country () {
    return this._country;
  }
  
  /**
   * retourne le slogan du photographe
   * 
   * @returns {String} this._tagline
   */
  get tagline () {
    return this._tagline;
  }
  
  /**
   * retourne le prix a la journee du photographe
   * 
   * @returns {Number} this._price
   */
  get price () {
    return this._price;
  }
  
  /**
   * retourne l'url du portrait du photographe
   * 
   * @returns {String} this._image
   */
  get image () {
    return `./assets/photographers/${this._image}`;
  }

}