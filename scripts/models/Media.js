/**
 * Media corresponds to a photo/video
 */
export class Media {
  /**
   * Instantiates our class and stores the information for our media
   * @param {Object} data Contains the information retrieved from the API
   */
  constructor(data) {
    this._id = data.id;
    this._title = data.title;
    this._likes = data.likes;
    this._date = data.date;
    this._price = data.price;
    // We test if our object is an image and indicate in the
    // _type property if it is a video or a photo
    if (data.hasOwnProperty('image')) {
      this._url = data.image;
      this._type = 'photo';
    } else {
      this._url = data.video;
      this._type = 'video';
    }
  }

  /**
   * Photo id getter
   */
  get id() {
    return this._id;
  }
  /**
   * Photo title getter
   */
  get title() {
    return this._title;
  }
  /**
   * number likes getter
   */
  get likes() {
    return this._likes;
  }
  /**
   * date getter
   */
  get date() {
    return this._date;
  }
  /**
   * price getter
   */
  get price() {
    return this._price;
  }
  /**
   * url media getter
   */
  get url() {
    return `./assets/photos/${this._url}`;
  }

  /**
   * Indicates whether our media is a photo or video
   * @returns {Boolean}
   */
  isImage() {
    return this._type === 'photo' ? true : false;
  }

  /**
   * Increments the total number of likes for the photo
   */
  incrementLike() {
    this._likes += 1;
  }
  /**
   * Decrements the total number of likes for the photo
   */
  decrementLike() {
    this._likes += 1;
  }
}
