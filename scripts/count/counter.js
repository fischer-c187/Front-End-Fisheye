/**
 * stock le compte general de like sur la page du photographe
 * @class
 * 
 */
export class LikeCounter {
  /**
   * instancie la classe LikeCounter
   */
  constructor () {
    this._nbrLikes = 0;
    this._likeCount = document.querySelector('.total-likes');
  }

  /**
   * modifie le compte general de like et increments ou decrement notre compteur
   * @param {String} action action a effectue
   * @param {Number} number nombre a ajouter dans le cas d'un 'ADD'
   */
  update (action, number) {
    if (action === 'INCR') {
      this._nbrLikes += 1;
    } 
    else if (action === 'DECR') {
      this._nbrLikes -= 1;
    }
    else if (action === 'ADD') {
      this._nbrLikes += number;
    }
    else {
      throw 'unknow action';
    }

    this._likeCount.innerText = this._nbrLikes;
  }
}