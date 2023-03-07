/**
 * Class to sort data based on different sorting criteria
 * @class
 */
export class PhotoSorting {
  /**
   * Sorts an array of data based on the specified sort criteria
   *
   * @param {Array} data The data to be sorted
   * @param {String} orderBy The criteria to sort the data by (can be 'like', 'alpha', or 'date')
   * @throws {String} If the specified orderBy value is not recognized
   */
  static sorte(data, orderBy) {
    if (orderBy === 'like') {
      data.sort((a, b) => b.likes - a.likes);
    } else if (orderBy === 'alpha') {
      data.sort((a, b) => a.title.localeCompare(b.title));
    } else if (orderBy === 'date') {
      data.sort((a, b) => {
        const d1 = new Date(a.date);
        const d2 = new Date(b.date);
        return d2 - d1;
      });
    } else {
      throw 'unknow orderBy';
    }
  }
}
