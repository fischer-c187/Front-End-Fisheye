
/**
 * observer pattern qui gere le compteur general de like
 * @class
 */
export class LikeSubject {
  /**
   * instancie la class LikeSubject
   */
  constructor(){
    this._observers = [];
  }
  /**
   * Permet d'ajouter des observer a notre liste
   * @param {Object} observer 
   */
  subscribe (observer) {
    this._observers.push(observer);
  }

  /**
   * retire l'observer de la liste 
   * @param {Object} observer 
   */
  unsubscribe (observer) {
    this._observers = this._observers.filter(obs => obs !== observer);
  }
  
  /**
   * declanche une fonction sur l'ensemble des subscribers
   * @param {String} action correspond a l'action a effectue
   * @param {Number} number correspond au nombre a ajouter
   */
  fire (action, number=0) {
    this._observers.forEach(obs => obs.update(action, number))
  }
}