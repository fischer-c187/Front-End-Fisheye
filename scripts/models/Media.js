/**
 * Media correspond a une photo/video
 */
export class Media {
  /**
   * instancie notre class et stock les informations de notre media
   * @param {Object} data contient les informations recuperer par l'api
   */
  constructor(data) {
    this._id = data.id;
    this._title = data.title;
    this._likes = data.likes;
    this._date = data.date;
    this._price = data.price;
    // on test si notre object est une image et indique dans la propriete
    // _type si c'est une video ou une photo
    if (data.hasOwnProperty('image')) {
      this._url = data.image;
      this._type = 'photo';
    }
    else {
      this._url = data.video;
      this._type = 'video';
    }
  }

  /**
   * getter id de la photo
   */
  get id () {
    return this._id;
  }
  /**
   * getter du titre de la photo
   */
  get title () {
    return this._title;
  }
  /**
   * getter nombre de like
   */
  get likes () {
    return this._likes;
  }
  /**
   * getter de la date de la prise du media
   */
  get date () {
    return this._date;
  }
  /**
   * getter du prix
   */
  get price () {
    return this._price;
  }
  /**
   * renvoie l'url du media
   */
  get url () {
    return `./assets/photos/${this._url}`;
  }

  /**
   * nous indique si notre media est une photo ou une video
   * @returns {Boolean}
   */
  isImage() {
    return this._type === 'photo' ? true : false;
  }
  /**
   * incremente le nombre total de like de la photo
   */
  incrementLike () {
    this._likes += 1;
  }
  /**
   * decrement le nombre total de like de la photo
   */
  decrementLike () {
    this._likes += 1;
  }
}