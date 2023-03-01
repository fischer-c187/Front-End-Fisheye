import { PhotographersApi } from '../api/api.js';
import { Photographer } from '../models/photographer.js';
import { PhotographeCard } from '../template/PhotographeCard.js';

/**
 * contient l'url de notre api/fichier json
 */
const URL = './data/photographers.json'

/**
 * contient la logique principal des element a afficher sur notre page index
 */
async function main() {
    const wrapper = document.querySelector('.photographer_section')
    const apiPhotographer = new PhotographersApi(URL)
    const photographerData = await apiPhotographer.allPhotographers()
    const photographers = photographerData.map(data => new Photographer(data))

    photographers.forEach(photographer => {
        const template = new PhotographeCard(photographer);

        wrapper.appendChild(template.createPhotographeCard())
    });
}

main()
