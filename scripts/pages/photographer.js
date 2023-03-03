import { Media } from '../models/Media.js';
import { MediaCard } from '../template/MediaCard.js';
import { photographerCardPresentation } from '../decorators/photographerCardPresentation.js';
import { Photographer } from '../models/photographer.js';
import { PhotographersApi, PhotoApi } from '../api/api.js';
import { LikeCounter } from '../count/counter.js';
import { LikeSubject } from '../count/likeSubject.js';
import { SorterForm } from '../template/sorterForm.js';
import { Lightbox } from '../template/lightbox.js';

/**
 * contient l'url de notre api/fichier json
 */
const URLEndpoint = './data/photographers.json';


/**
 * Recupere et retourne l'id contenu dans les parametres dans l'url
 * @returns {Number}
 */
function getId() {
  const params = new URL(document.location).searchParams;
  return parseInt(params.get('id'), 10);
}

/**
 * instancie et retourne un objet photographe qui correspond a l'id de la page
 * @returns {Object Photographer}
 */
async function getPhotographe() {
  const photographeObject = await new PhotographersApi(
    URLEndpoint
  ).photographById(getId());
  const photographe = new Photographer(photographeObject);

  return photographe;
}

async function getAllMedia() {
  const photosData = await new PhotoApi(URLEndpoint).getPhotosById(getId());
  const fullMedia = photosData.map((photoData) => new Media(photoData));

  return fullMedia
}

/**
 * cree et ajoute a notre page un encart qui contient le prix par jour
 * et le nombre de like
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
 * generation de l'affichage des informations du photographe
 * @param {Object Photographer} photographe 
 */
async function renderPhotographer(photographe) {
  const photographeCard = new photographerCardPresentation(photographe);

  renderInsert(photographe.price);
  document
    .querySelector('main')
    .prepend(photographeCard.createPhotographeCard());
}

/**
 * generation des elements de la gallerie et ajout dans la balise main
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
 * Fonction qui contient la logique principal d'affichage de notre page
 */
async function main() {
  const photographe = await getPhotographe();
  const medias = await getAllMedia();
  const sorterPhoto = new SorterForm(medias);
  const lightbox = new Lightbox();

  await renderPhotographer(photographe);
  await renderGallery(medias);
  lightbox.render()
  sorterPhoto.render()
}

main();
