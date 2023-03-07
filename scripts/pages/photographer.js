import { Media } from '../models/Media.js';
import { MediaCard } from '../template/MediaCard.js';
import { photographerCardPresentation } from '../decorators/photographerCardPresentation.js';
import { Photographer } from '../models/photographer.js';
import { PhotographersApi, PhotoApi } from '../api/api.js';
import { LikeCounter } from '../count/counter.js';
import { LikeSubject } from '../count/likeSubject.js';
import { SorterForm } from '../template/sorterForm.js';
import { Lightbox } from '../template/lightbox.js';
import { ContactForm } from '../template/contactForm.js';

/**
 * Contains the URL of our API/JSON file
 */
const URL_ENDPOINT = './data/photographers.json';

/**
 * Retrieves and returns the id contained in the parameters in the URL
 * @returns {Number}
 */
function getId() {
  const params = new URL(document.location).searchParams;
  return parseInt(params.get('id'), 10);
}

/**
 * Instantiates and returns a Photographer object that corresponds to the page's id
 * @returns {Object Photographer}
 */
async function getPhotographe() {
  const photographeObject = await new PhotographersApi(
    URL_ENDPOINT
  ).photographById(getId());
  const photographe = new Photographer(photographeObject);

  return photographe;
}

/**
 * Returns all media that corresponds to the photographer's id
 */
async function getAllMedia() {
  const photosData = await new PhotoApi(URL_ENDPOINT).getPhotosById(getId());
  const fullMedia = photosData.map((photoData) => new Media(photoData));

  return fullMedia;
}

/**
 * Creates and adds to our page an insert that contains the daily price
 * and the number of likes
 * @param {Number} price
 */
function renderInsert(price) {
  const information = document.createElement('div');
  information.classList.add('photographe-insert');
  information.innerHTML = `
    <p><span class="total-likes"></span> <i class="fa-solid fa-heart"></i></p>
    <p><span class="photographe-price"></span>€ / jour</p>
  `;
  information.querySelector('.photographe-price').innerText = price;
  document.querySelector('main').append(information);
}

/**
 * Generation of the display of the photographer's information
 * @param {Object Photographer} photographer
 */

async function renderPhotographer(photographe) {
  const photographeCard = new photographerCardPresentation(photographe);

  renderInsert(photographe.price);
  document
    .querySelector('main')
    .prepend(photographeCard.createPhotographeCard());
}

/**
 * Generation of the gallery elements and addition to the main tag
 */
async function renderGallery(fullMedia) {
  const photoWrapper = document.querySelector('.photo-gallery');

  const likeCounter = new LikeCounter();
  const likeObserver = new LikeSubject();

  likeObserver.subscribe(likeCounter);
  fullMedia.forEach((photo) => {
    const Template = new MediaCard(photo, likeObserver);

    photoWrapper.append(Template.createMediaCard());
  });
}

/**
 * Function containing the main display logic for our page
 */
async function main() {
  const photographe = await getPhotographe();
  const medias = await getAllMedia();
  const sorterPhoto = new SorterForm(medias);
  const lightbox = new Lightbox();
  const contactForm = new ContactForm();

  await renderPhotographer(photographe);
  await renderGallery(medias);
  lightbox.render();
  sorterPhoto.render();
  contactForm.render();
}

main();
