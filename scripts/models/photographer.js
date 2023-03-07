/**
 * This class represents a photographer and contains all the information
 *
 * @class
 */
export class Photographer {
  /**
   * Create a new instance of the Photographer class
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
    this._image = data.portrait;
  }

  /**
   * name getter
   *
   * @returns {String} this._name
   */
  get name() {
    return this._name;
  }

  /**
   * id getter
   *
   * @returns {Number} this._id
   */
  get id() {
    return this._id;
  }

  /**
   * city getter
   *
   * @returns {String} this._city
   */
  get city() {
    return this._city;
  }

  /**
   * country getter
   *
   * @returns {String} this._country
   */
  get country() {
    return this._country;
  }

  /**
   * tagline getter
   *
   * @returns {String} this._tagline
   */
  get tagline() {
    return this._tagline;
  }

  /**
   * price per day getter
   *
   * @returns {Number} this._price
   */
  get price() {
    return this._price;
  }

  /**
   * Returns the portrait URL of the photographer
   *
   * @returns {String} this._image
   */
  get image() {
    return `./assets/photographers/${this._image}`;
  }
}
