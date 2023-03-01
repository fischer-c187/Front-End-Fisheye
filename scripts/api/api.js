/**
 * Class qui permet de gerer le telechargement des donnees
 * @class
 */
class Api {

  /**
   * Creer une instance de Api
   * @param {String} url endpoint 
   */
  constructor(url) {
    this._url = url
  }

  /**
   * recupere nos donnees grace a la propriete url et renvoie les donnees sous format json
   * @returns {Promise} Une promesse qui se resout quand les donnees sont bien recu et transformer en un objet json
   */
  async request () {

    const response = await fetch(this._url)

    if (!response.ok) {
      throw new Error(`Error in request: ${response.status} with this url ${this._url}`)
    }

    return await response.json() 
  }

}

/**
 * se concentre sur les donnes concernant les photographes
 * @class
 */
export class PhotographersApi extends Api {

  /**
   * Creer une instance de PhotographersApi
   * @param {String} url endpoint
   */
  constructor(url) {
    super(url)
  }

  /**
   * TODO: peut etre faire un catch pour recuperer les erreurs
   * nous retourne la liste des photographes 
   * @returns {Promise} promesse resolut quand notre requete est termine
   */
  async allPhotographers () {
    try{
      const result = await this.request();
      return result.photographers;
    }
    catch(e) {
      console.error(e);
      return []
    }
  }

   /**
   * nous retourne le photographe qui correspond a l'id
   * 
   * @param {Number} id
   * 
   * @returns {Promise} 
   */
  async photographById (id) {
    try{
      const result = await this.request();
      return result.photographers
        .find(photograph => photograph.id === id);
    }
    catch(e) {
      console.error(e);
      return []
    }
  }
}

/**
 * se concentre sur les donnes concernant les photos
 * @class
 */
export class PhotoApi extends Api {
  constructor(url) {
    super(url)
  }

  /**
   * * peut etre faire un catch pour recuperer les erreurs
   * nous retourne la liste des photos qui correspondent a l'id desire
   * 
   * @param {Number} id
   * 
   * @returns {Promise} promesse resolut quand notre requete est termine
   */
  async getPhotosById (id) {
    try{
      const result = await this.request();
      return result.media.filter(photo => photo.photographerId === id)
    }
    catch(e) {
      console.error(e);
      return []
    }
  }
}