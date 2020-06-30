const POPUP_PARAMETERS = {
  block: document.querySelector('.popup'),
  elements: {
    contentContainer: '.popup__container',
    buttonClose: '.popup__close',
    buttonOpenOtherPopup: '.popup__subbutton',
    form: '.form',
    inputEmail: '.form__input_email',
    inputPassword: '.form__input_password',
    formInputs: '.form__input',
    inputName: '.form__input_name',
    errorServeer: '.form__error_server',
    buttonSubmit: '.form__button',
  },
  modifiers: {
    isOpen: 'popup_is-opened',
    errorActive: 'form__error_visible',
  },
}

export default POPUP_PARAMETERS;

