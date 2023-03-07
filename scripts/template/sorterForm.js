import { PhotoSorting } from '../sorter/SortingPhoto.js';

/**
 * Class that is responsible for handling the sorting form for the media items.
 * @class
 */
export class SorterForm {
  /**
   * Creates an instance of the sorterForm class
   * @param {Array} data array of media objects
   */
  constructor(data) {
    this._medias = data;
    this._photoSorter = new PhotoSorting();
    this._sorterFormWrapper = document.querySelector('.sorter-wrapper');
    this._mediaWrapper = document.querySelector('.photo-gallery');
  }

  /**
   * clears the media items from the media wrapper element
   */
  clearMedia() {
    this._mediaWrapper.innerHTML = '';
  }

  /**
   * handles the change event of the sorting select element
   */
  onChangeSorter() {
    this._sorterFormWrapper
      .querySelector('#sorter-select')
      .addEventListener('change', (event) => {
        const sorter = event.target.value;
        this.sorterMedia(sorter);
      });
  }

  /**
   * Sorts the media items based on the selected sorting value
   * @param {String} sorter 
   */
  sorterMedia(sorter) {
    PhotoSorting.sorte(this._medias, sorter);
    this._medias.forEach((media) => {
      const element = this._mediaWrapper.querySelector(`#id-${media.id}`);
      this._mediaWrapper.append(element);
    });
  }

  /**
   * performs an initial sort that sorts by media popularity
   */
  initialSorte() {
    this._sorterFormWrapper
      .querySelector('#sorter-select')
      .dispatchEvent(new Event('change'));
  }

  /**
   * Renders the sorting form in the sorter form wrapper element.
   */
  render() {
    const sorterForm = `
      <form action="#" method="POST" class="sorter-form">
        <label for="sorter-select" class="sorter-form__label">
          Trier par
        </label>
        <div class="select">
        <select name="sorter-select" id="sorter-select" class="sorter-form__select" aria-label="Order By">
            <option value="like">Popularité</option>
            <option value="date">Date</option>
            <option value="alpha">Titre</option>
        </select>
        </div>
      </form>
    `;
    this._sorterFormWrapper.innerHTML = sorterForm;
    this.onChangeSorter();
    this.initialSorte();
  }
}
