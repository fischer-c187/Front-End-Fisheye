import { PhotographersApi } from '../api/api.js';
import { Photographer } from '../models/photographer.js';
import { PhotographeCard } from '../template/PhotographeCard.js';

/**
 * Contains the URL of our API/JSON file
 */
const URL = './data/photographers.json';

/**
 * Contains the main logic for the elements to be displayed on our index page
 */
async function main() {
  const wrapper = document.querySelector('.photographer_section');
  const apiPhotographer = new PhotographersApi(URL);
  const photographerData = await apiPhotographer.allPhotographers();
  const photographers = photographerData.map((data) => new Photographer(data));

  photographers.forEach((photographer) => {
    const template = new PhotographeCard(photographer);

    wrapper.appendChild(template.createPhotographeCard());
  });
}

main();
