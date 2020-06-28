export default class BaseComponent {
  constructor(parameters){
    this.block = parameters.block;
    this.elements = parameters.elements;
    this.modifiers = parameters.modifiers;
  }

  _open() {
    this.block.classList.add(this.modifiers.isOpen);
  }

  _close() {
    this.block.classList.remove(this.modifiers.isOpen);
  }

  // добавление слушателей
  _setHandlers(handlersArray) {
    handlersArray.forEach(handlerUnit => {
      const { element, event, handler } = handlerUnit;
      element.addEventListener(event, handler);
    });
  }

  // удаление слушателей
  _removeHandlers(handlersArray) {
    handlersArray.forEach(handlerUnit => {
      const { element, event, handler } = handlerUnit;
      element.removeEventListener(event, handler);
    });
  }

  // получение данных извне
  getDependencies(dependencies) {
    this._dependencies = dependencies;
  }

  // отключаем кнопку отправки формы
  _disableButton(buttonSubmit) {
    buttonSubmit.setAttribute('disabled', true);
  }

  // включаем кнопку отправки формы
  _activateButton(buttonSubmit) {
    buttonSubmit.removeAttribute('disabled');
  }

  // отключаем инпут формы
  _disableInputs(arrayInputs) {
    arrayInputs.forEach(input => input.setAttribute('disabled', true));
  }

  // включаем инпут формы
  _activateInputs(arrayInputs) {
    arrayInputs.forEach(input => input.removeAttribute('disabled'));
  }
}
