export class PhotoSorting {
  static sorte(data, orderBy) {
    if (orderBy === 'like') {
      data.sort((a, b) => b.likes - a.likes);
    } else if (orderBy === 'alpha') {
      data.sort((a, b) => a.title.localeCompare(b.title));
    } else if (orderBy === 'date') {
      data.sort((a, b) => {
        const d1 = new Date(a.date);
        const d2 = new Date(b.date);
        // console.log(d1, d2)
        return d2 - d1;
      });
    } else {
      throw 'unknow orderBy';
    }
  }
}
