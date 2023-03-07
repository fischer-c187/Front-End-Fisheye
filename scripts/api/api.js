/**
 * Class for managing data downloads
 * @class
 */
class Api {
  /**
   * Create an instance of the Api
   * @param {String} url Endpoint
   */

  constructor(url) {
    this._url = url;
  }

  /**
   * Retrieve our data using the url property and return the data in JSON format
   * @returns {Promise} A promise that resolves when the data is successfully received and transformed into a JSON object
   */

  async request() {
    const response = await fetch(this._url);

    if (!response.ok) {
      throw new Error(
        `Error in request: ${response.status} with this url ${this._url}`
      );
    }

    return await response.json();
  }
}

/**
 * Focuses on data regarding photographers
 * @class
 */
export class PhotographersApi extends Api {
  /**
   * Create an instance of the PhotographersApi
   * @param {String} url Endpoint
   */
  constructor(url) {
    super(url);
  }

  /**
   * Returns the list of photographers
   * @returns {Promise} Promise resolved when the request is complete
   */
  async allPhotographers() {
    try {
      const result = await this.request();
      return result.photographers;
    } catch (e) {
      console.error(e);
      return [];
    }
  }

  /**
   * Returns the photographer corresponding to the id
   *
   * @param {Number} id
   *
   * @returns {Promise}
   */
  async photographById(id) {
    try {
      const result = await this.request();
      return result.photographers.find((photograph) => photograph.id === id);
    } catch (e) {
      console.error(e);
      return [];
    }
  }
}

/**
 * Focuses on data regarding photos
 * @class
 */

export class PhotoApi extends Api {
  constructor(url) {
    super(url);
  }

  /**
   * Returns the list of photos corresponding to the desired id
   *
   * @param {Number} id
   *
   * @returns {Promise} Promise resolved when the request is complete
   */
  async getPhotosById(id) {
    try {
      const result = await this.request();
      return result.media.filter((photo) => photo.photographerId === id);
    } catch (e) {
      console.error(e);
      return [];
    }
  }
}
