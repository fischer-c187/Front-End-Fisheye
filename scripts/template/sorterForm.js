import { PhotoSorting } from '../sorter/SortingPhoto.js';
import { MediaCard } from './MediaCard.js';
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
      .querySelector('.sorter-form')
      .addEventListener('change', event => {
        const sorter = event.target.value;
        console.log('sorter media debut', this._medias)
        this.sorterMedia(sorter);
        
      })
  }

  sorterMedia(sorter) {
    PhotoSorting.sorte(this._medias, sorter)
    this.clearMedia()
    this._medias.forEach( media => {
      const Template = new MediaCard(photo)
    })
  }

  render() {
    const sorterForm = `
      <form action="#" method="POST" class="sorter-form">
        <label for="sorter-select">Triez par</label>
        <select name="sorter-select" id="sorter-select">
            <option value="like">Popularité</option>
            <option value="date">Date</option>
            <option value="alpha">Titre</option>
        </select>
      </form>
    `
    this._sorterFormWrapper.innerHTML = sorterForm;
    this.onChangeSorter()
  }
}