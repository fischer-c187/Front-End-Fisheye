/**
 * Observer pattern that manages the overall like count
 * @class
 */
export class LikeSubject {
  /**
   * Instantiates the LikeSubject class
   */
  constructor() {
    this._observers = [];
  }
  /**
   * Allows adding observers to the list
   * @param {Object} observer
   */
  subscribe(observer) {
    this._observers.push(observer);
  }

  /**
   * Removes the observer from the list
   * @param {Object} observer
   */
  unsubscribe(observer) {
    this._observers = this._observers.filter((obs) => obs !== observer);
  }

  /**
   * Triggers a function on all subscribers
   * @param {String} action Corresponds to the action to be performed
   * @param {Number} number Corresponds to the number to be added
   */
  fire(action, number = 0) {
    this._observers.forEach((obs) => obs.update(action, number));
  }
}
