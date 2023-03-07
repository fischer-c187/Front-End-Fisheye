/**
 * Class that manages the contact form
 * @class
 */
export class ContactForm {
  /**
   * Create an instance of the ContactForm class
   * this._error allows us to store the error message, the validation condition, and
   * the validity of all the inputs in our form
   */
  constructor() {
    this._wrapper = document.createElement('dialog');
    this._wrapper.classList.add('contact-modal');
    this._wrapper.setAttribute('aria-labelledby', 'contact-title-label');
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
   * Opens the contact form
   */
  open() {
    document.querySelector('#contact-form').addEventListener('click', () => {
      this._wrapper.showModal();
    });
  }

  /**
   * Closes the contact form
   */
  close() {
    this._wrapper
      .querySelector('.header-contact__close')
      .addEventListener('click', () => {
        this._wrapper.close();
      });
  }

  /**
   * Allows us to test the validity of text
   * @param {RegExp} regex
   * @param {String} text
   * @returns {Boolean}
   */
  regexTest(regex, text) {
    return regex.test(text);
  }

  /**
   * Allows us to create an element containing the error that corresponds to the input received as a parameter
   * @param {HTMLElement} element input that contains the error
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
   * Handles the activation of an error by adding a label below our input
   * the validity of our input is set to false in our error object
   * @param {HTMLElement} element input that contains the error
   */
  enableError(element) {
    let errorElement = document.querySelector(
      `.error-form[for=${element.name}]`
    );

    if (!errorElement) {
      errorElement = this.createErrorElement(element);
      element.insertAdjacentElement('afterend', errorElement);
    }

    this._error[element.name].valid = false;
  }

  /**
   * When the input is valid, we remove the error label if it exists.
   * and we set to true our input in the error object
   * @param {HTMLElement} element input that is valid
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
   * Function associated with the blur/input event on our inputs, testing the validity of the input
   * use of an arrow function to not change the value of this
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
   * Initializes all events of our form: inputs and submit button
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
  
  /**
   * Retrieve all the values from the inputs and display them in the console.
   */
  getAllValue() {
    const input = this._wrapper.querySelectorAll('.contact__input');
    const value = {};
    input.forEach((element) => {
      value[element.name] = element.value;
    });
    console.log(value);
  }

  /**
   * Function associated with the form submission button, checks if all inputs
   * are valid and if not inserts an error below the concerned inputs
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
   * Displays a success message when the form is successfully submitted
   */
  displaySuccessMessage() {
    const wrapperSuccess = document.createElement('div');
    wrapperSuccess.classList.add('contact--success');

    wrapperSuccess.innerHTML =
      '\
      <div class="contact--success"> \
        <p class="contact__success-message">Votre message a bien été envoyé !</p> \
        <button class="contact__btn-close contact_button" aria-label="close dialog">Fermer</button> \
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
   * This method generates and adds the contact form to the page for the current photographer.
   * It creates the HTML content of the contact form and places it in our wrapper element.
   * It also adds the necessary events to open and close the form as well as input validations.
   */
  render() {
    const photographe = document.querySelector('.description__name').innerText;
    const form = `
      <header class="header-contact">
        <h2 class="header-contact__title" id="contact-title-label">
          Contactez-moi
          <span class="header-contact__photographe">${photographe}</span>
        </h2>
        
        <button type="button" class="header-contact__close" aria-label="Close Dialog">
          <img src="assets/icons/close.svg" alt="close dialog">
        </button>

      </header>
      <form class="contact">
          <label for="firstname" class="contact__label" id="first_name">Prénom</label>
          <input type="text" name="firstname" id="firstname" class="contact__input" aria-labelledby="first_name">
          <label for="lastname" class="contact__label" id="last_name" >Nom</label>
          <input type="text" name="lastname" id="lastname" class="contact__input" aria-labelledby="last_name">
          <label for="email" class="contact__label" id="email">Email</label>
          <input type="text" name="email" id="email" class="contact__input" aria-labelledby="email">
          <label for="message" class="contact__label" id="your_message">Votre Message</label>
          <textarea name="message" id="message" class="contact__area contact__input" aria-labelledby="your_message"></textarea>
        <button type="submit" class="contact_button contact__submit" aria-label="send">Envoyer</button>
      </form>
    `;

    this._wrapper.innerHTML = form;
    this.open();
    this.close();
    this.initializeInputValidation();
    document.body.appendChild(this._wrapper);
  }
}
