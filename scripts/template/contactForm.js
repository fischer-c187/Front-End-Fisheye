/**
 * class qui gere le formulaire de contact
 * @class
 */
export class ContactForm {
  /**
   * creer une instance de la class ContactForm
   * this._error nous permet de stocker le message d'erreur, la condition de la validation et
   * la validite de tous les inputs de notre formulaire
   */
  constructor() {
    this._wrapper = document.createElement('dialog');
    this._wrapper.classList.add('contact-modal');
    this._error = {
      firstname: {
        message:
          'Veuillez entrer 2 caractères ou plus pour le champ du prénom.',
        condition: /^[a-z\-\s]{2,}$/i,
        valid: false,
      },
      lastname: {
        message: 'Veuillez entrer 2 caractères ou plus pour le champ du nom.',
        condition: /^[a-z\-\s]{2,}$/i,
        valid: false,
      },
      email: {
        message: 'Veuillez entrer un email valide..',
        condition: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        valid: false,
      },
      message: {
        message: 'Veuillez entrer un message de plus de 20 charactères.',
        condition: /^.{20,}$/,
        valid: false,
      },
    };
  }

  /**
   * ouverture du formulaire de contact
   */
  open() {
    document.querySelector('#contact-form').addEventListener('click', () => {
      this._wrapper.showModal();
    });
  }

  /**
   * fermeture du formulaire de contact
   */
  close() {
    this._wrapper
      .querySelector('.header-contact__close')
      .addEventListener('click', () => {
        this._wrapper.close();
      });
  }

  /**
   * nous permet de tester la validite d'un texte
   * @param {RegExp} regex 
   * @param {String} text 
   * @returns {Boolean}
   */
  regexTest(regex, text) {
    return regex.test(text);
  }
  
  /**
   * nous permet de creer un element contennant l'erreur qui correspond a l'input recu en parametre
   * @param {HTMLElement} element input qui contient l'erreur
   * @returns {HTMLElement}
   */
  createErrorElement(element) {
    const errorElement = document.createElement('label');

    errorElement.classList.add('error-form');
    errorElement.setAttribute('for', element.name);
    errorElement.innerHTML = `<strong>
      ${this._error[element.name].message}
    </storng>`;

    return errorElement;
  }

  /**
   * gere l'activation d'une erreur en ajoutant un label en-dessous de notre input
   * la validite de notre input est passe a false dans notre objet error
   * @param {HTMLElement} element input qui contient l'erreur
   */
  enableError(element) {
    let errorElement = document.querySelector(
      `.error-form[for=${element.name}]`
    );
    // on test si le label existe deja, si ce n'est pas le cas on le cree et l'ajoute a notre formulaire
    if (!errorElement) {
      errorElement = this.createErrorElement(element);
      element.insertAdjacentElement('afterend', errorElement);
    }

    this._error[element.name].valid = false;
  }

  /**
   * quand l'input est valide on supprime le label d'erreur si il existe.
   * et on passe a true notre input dans l'objet error
   * @param {HTMLElement} element input qui est valide
   */
  disableError(element) {
    const errorElement = document.querySelector(
      `.error-form[for=${element.name}]`
    );
    if (errorElement) {
      errorElement.remove();
    }

    this._error[element.name].valid = true;
  }

  /**
   * fonction associe a l'event blur/input sur nos input, on test la validite de l'input
   * utilisation d'une fonction fleche pour ne pas modifier la valeur de this
   * @param {Event} event 
   */
  validationInput = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    const regex = this._error[name].condition;

    if (this.regexTest(regex, value)) {
      this.disableError(event.target);
    } else {
      this.enableError(event.target, this._error[name].message);
    }
  };

  /**
   * initilise tous les evenements de notre formulaire : inputs et bouton de soumission 
   */
  initializeInputValidation() {
    const input = this._wrapper.querySelectorAll('.contact__input');

    input.forEach((element) => {
      element.addEventListener('input', this.validationInput);
      element.addEventListener('blur', this.validationInput);
    });

    this._wrapper
      .querySelector('.contact__submit')
      .addEventListener('click', this.validateForm);
  }

  getAllValue() {
    const input = this._wrapper.querySelectorAll('.contact__input');
    const value = {};
    input.forEach(element => {
      value[element.name] = element.value;
    });
    console.log(value)
  }

  /**
   * fonction associe au bouton de soumission du formulaire, on verifie si tous les inputs 
   * sont valides et si ce n'est pas le cas insert une erreur en dessous des inputs concernes
   * @param {Event} event 
   */
  validateForm = (event) => {
    event.preventDefault();

    let isValid = true;
    for (let key of Object.keys(this._error)) {
      if (!this._error[key].valid) {
        isValid = false;
        this.enableError(
          document.querySelector(`.contact__input[name=${key}]`),
          this._error[key].message
        );
      }
    }
    if (isValid) {
      this.getAllValue();
      this.displaySuccessMessage();
    }
  };

  /**
   * affiche un message quand le formulaire est envoye avec succes
   */
  displaySuccessMessage() {
    const wrapperSuccess = document.createElement('div');
    wrapperSuccess.classList.add('contact--success');

    wrapperSuccess.innerHTML =
      '\
      <div class="contact--success"> \
          <p class="contact__success-message">Votre message a bien été envoyé !</p> \
          <button class="contact__btn-close contact_button">Fermer</button> \
        </div>';

    this._wrapper.innerHTML = '';
    this._wrapper.append(wrapperSuccess);

    this._wrapper
      .querySelector('.contact__btn-close')
      .addEventListener('click', () => {
        this._wrapper.close();
      });
  }

  /**
   * Methode qui permet de generer et d'ajouter a la page le formulaire de contact
   * pour le photographe en cours. Elle cree le contenu HTML du formulaire de contact
   * puis le place dans notre element wrapper. Elle ajoute aussi les evenements necessaires
   * pour ouvrir et fermer le formulaire ainsi que les validations d'inputs.
   */
  render() {
    const photographe = document.querySelector('.description__name').innerText;
    const form = `
      <header class="header-contact">
        <h2 class="header-contact__title">
          Contactez-moi
          <span class="header-contact__photographe">${photographe}</span>
        </h2>
        <a href="#" class="header-contact__close">
          <img src="assets/icons/close.svg" alt="">
        </a>

      </header>
      <form class="contact">
          <label for="firstname" class="contact__label">Prénom</label>
          <input type="text" name="firstname" id="firstname" class="contact__input">
          <label for="lastname" class="contact__label">Nom</label>
          <input type="text" name="lastname" id="lastname" class="contact__input">
          <label for="email" class="contact__label">Email</label>
          <input type="text" name="email" id="email" class="contact__input">
          <label for="message" class="contact__label">Votre Message</label>
          <textarea name="message" id="message" class="contact__area contact__input"></textarea>
        <button type="submit" class="contact_button contact__submit">Envoyer</button>
      </form>
    `;

    this._wrapper.innerHTML = form;
    this.open();
    this.close();
    this.initializeInputValidation();
    document.body.appendChild(this._wrapper);
  }
}
