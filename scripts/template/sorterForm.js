import { PhotoSorting } from '../sorter/SortingPhoto.js';

export class SorterForm {
  constructor (data) {
    this._medias = data;
    // this._observer = 
    this._photoSorter = new PhotoSorting();
    this._sorterFormWrapper = document.querySelector('.sorter-wrapper');
    this._mediaWrapper = document.querySelector('.photo-gallery');
  }

  clearMedia () {
    this._mediaWrapper.innerHTML = '';
  }

  onChangeSorter(){
    this._sorterFormWrapper
      .querySelector('#sorter-select')
      .addEventListener('change', event => {
        const sorter = event.target.value;
        this.sorterMedia(sorter);
        
      })
  }

  sorterMedia(sorter) {
    PhotoSorting.sorte(this._medias, sorter)
    this._medias
      .forEach( media => {
        const element = this._mediaWrapper.querySelector(`#id-${media.id}`)
        this._mediaWrapper.append(element)
      })
  }

  initialSorte () {
    this._sorterFormWrapper
    .querySelector('#sorter-select')
    .dispatchEvent(new Event('change'))
  }

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
    `
    this._sorterFormWrapper.innerHTML = sorterForm;
    this.onChangeSorter()
    this.initialSorte()
  }
}