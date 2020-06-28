import BaseComponent from './BaseComponent';

export default class Validation extends BaseComponent {
  constructor(parameters, messages){
    super(parameters)
    this.messages = messages;
  }

  // проверка формы авторизации
  checkFormLogin(event) {
    if (event.target.classList.contains(this.elements.input)) {
      this.checkInput(event);
    }
    const { email, password } = event.currentTarget.elements;
    if (!email.validity.valid || !password.validity.valid) {
      this.deactivationButton(event);
    } else {
      this.activationButton(event);
    }
  }

  // _checkEmail(event) {
  //   const regexp = /^(([a-z0-9]+((_|\.|-)[a-z0-9]+)+)|[a-z0-9]{2,})@[a-z0-9]{2,8}(\.[a-z]{2,8})$/;
  //   if (!regexp.test(event.target.value)){
  //     console.log('no')
  //     const errorMessageText = this.messages[`${event.target.getAttribute('name')}`];
  //     this.makeErrorMessage(event, errorMessageText);
  //   } else {
  //     console.log('yes')
  //   }
  // }

  // проверка формы регистрации
  checkFormRegistration(event) {
    if (event.target.classList.contains(this.elements.input)) {
      this.checkInput(event);
    }
    const { email, password, name } = event.currentTarget.elements;
    if (!email.validity.valid || !password.validity.valid || !name.validity.valid) {
      this.deactivationButton(event);
    } else {
      this.activationButton(event);
    }
  }

  // проверка формы поисковика
  checkFormSearch(event) {
    if (event.target.classList.contains(this.elements.input)) {
      this.checkInput(event);
    }
    const { word } = event.currentTarget.elements;
    if (!word.validity.valid) {
      this.deactivationButton(event);
    } else {
      this.activationButton(event);
    }
  }

  // проверка инпута на все
  checkInput(event) {
    if (!event.target.validity.valid) {
      this.checkValidityInput(event);
      this.checkEmptyInput(event);
    } else if (event.target.validity.valid) {
      this.removeErrorMessage(event);
    }
  }

  // проверка инпута на 0
  checkEmptyInput(event) {
    if (event.target.value.length === 0) {
      this.makeErrorMessage(event, this.messages.emptyInput);
    }
  }

  // проверка инпута на валидность
  checkValidityInput(event) {
    if (!event.target.checkValidity()) {
      const errorMessageText = this.messages[`${event.target.getAttribute('name')}`];
      this.makeErrorMessage(event, errorMessageText);
    }
  }

  // делаем сообщение ошибки
  makeErrorMessage(event, message) {
    const errorMessage = event.target.parentElement.querySelector(`${this.elements.error}_${event.target.getAttribute('name')}`);
    errorMessage.textContent = message;
    errorMessage.classList.add(this.modifiers.errorActive);
  }

  // удаление сообщения ошибки
  removeErrorMessage(event){
    const errorMessage = event.target.parentElement.querySelector(`${this.elements.error}_${event.target.getAttribute('name')}`);
    errorMessage.textContent = this.messages.noError;
    errorMessage.classList.remove(this.modifiers.errorActive);
  }

  // активация кнопки
  activationButton(event) {
    const popupButton = event.currentTarget.querySelector(this.elements.buttonSubmit);
    popupButton.removeAttribute('disabled', false);
  }

  // деактивация кнопки popup
  deactivationButton(event) {
    const popupButton = event.currentTarget.querySelector(this.elements.buttonSubmit);
    popupButton.setAttribute('disabled', true);
  }

  // ОШИБКА СЕРВЕРА!!!!
  activatErrorServer(errorMessage) {
    this.errorServer.classList.add(this.modifiers.errorActive);
    this.errorServer.textContent = errorMessage;
  }


}
