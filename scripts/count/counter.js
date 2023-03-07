/**
 * Stores the overall like count on the photographer's page
 * @class
 */
export class LikeCounter {
  /**
   * Instantiates the LikeCounter class
   */
  constructor() {
    this._nbrLikes = 0;
    this._likeCount = document.querySelector('.total-likes');
  }

  /**
   * Modifies the overall like count and increments or decrements the counter
   * @param {String} action Action to be performed
   * @param {Number} number Number to add in the case of an 'ADD'
   */
  update(action, number) {
    if (action === 'INCR') {
      this._nbrLikes += 1;
    } else if (action === 'DECR') {
      this._nbrLikes -= 1;
    } else if (action === 'ADD') {
      this._nbrLikes += number;
    } else {
      throw 'unknow action';
    }

    this._likeCount.innerText = this._nbrLikes;
  }
}
