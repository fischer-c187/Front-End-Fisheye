/**
 * Decorateur de l'objet photographer, modifie le comportement de la fonction 
 * createPhotographeCard() pour correspondre a la sortie attendu
 * @param {Object Photographer} photographer 
 * @returns {Object Photographer}
 */
export function photographerCardPresentation (photographer) {
  photographer._wrapper = document.createElement('div')
  photographer._wrapper.classList.add('photograph-header')


  photographer.createPhotographeCard = function () {
    const card = `
      <div class="description">
        <h1 class="description__name card__name"></h1>
        <p class="description__location card__location">
          <span class="description__city"></span>,
          <span class="description__country"></span>
        </p>
        <p class="description__tagline card__tagline"></p>
      </div>
      <button type="button" aria-label="Contact Me" class="contact_button" id="contact-form">Contactez-moi</button>
      <img src="${photographer.image}" alt="${photographer.name}" class="card__image">
    `

    photographer._wrapper.innerHTML = card;

    const value = {
      "description__name": photographer.name,
      "description__city": photographer.city,
      "description__country": photographer.country,
      "description__tagline": photographer.tagline
    };

    for (const selector in value) {
      photographer._wrapper
        .querySelector(`.${selector}`)
        .innerText = value[selector];
      
    }

    return photographer._wrapper;
  }

  return photographer
}