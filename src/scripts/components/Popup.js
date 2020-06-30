import BaseComponent from './BaseComponent';

export default class Popup extends BaseComponent {
  constructor(parameters, content){
    super(parameters);
    this.content = content;
  }

  _setContent() {
    this.block.insertAdjacentHTML("beforeend", this.content);
  }

  _clearContent() {
    this.block.removeChild(this.contentContainer);
  }

  _getElementsPopup() {
    this.contentContainer = this.block.querySelector(this.elements.contentContainer);
    this.buttonClose = this.block.querySelector(this.elements.buttonClose);
    this.buttonOpenOtherPopup = this.block.querySelector(this.elements.buttonOpenOtherPopup);
  }

  // ОШИБКА СЕРВЕРА!!!!
  _activatErrorServer(elementErrorServeer, errorMessage) {
    elementErrorServeer.classList.add(this.modifiers.errorActive);
    elementErrorServeer.textContent = errorMessage;
  }

}
