import Popup from './Popup';

export default class PopupSuccess extends Popup {
  constructor(parameters, content){
    super(parameters, content);
    this.open = this.open.bind(this);
  }

  open() {
    this._setContent();
    this._open();
    this._getElementsPopup();
    this._setListeners();
  }

  close() {
    this._close();
    this._clearContent();
    this._removeListeners();
  }

  _setListeners() {
    this._setHandlers([
      { element: this.buttonClose, event: 'click', handler: this.close.bind(this) },
      { element: this.buttonOpenOtherPopup, event: 'click', handler: this._openPopupLogin.bind(this) },
    ]);
  }

  _removeListeners() {
    this._removeHandlers([
      { element: this.buttonClose, event: 'click', handler: this.close.bind(this) },
      { element: this.buttonOpenOtherPopup, event: 'click', handler: this._openPopupLogin.bind(this) },
    ]);
  }

  _openPopupLogin() {
    const { popupLogin } = this._dependencies;
    this.close();
    popupLogin.open();
  }

}
