import Popup from './Popup';

export default class PopupRegistration extends Popup {
  constructor(parameters, content){
    super(parameters, content);
    this.open = this.open.bind(this);
  }

  open() {
    this._setContent();
    this._open();
    this._getElementsPopup();
    this._getElementsForm();
    this._setListeners();
  }

  close() {
    this._close();
    this._clearContent();
    this._removeListeners();
  }

  // получаем элементы формы попапа
  _getElementsForm() {
    this.form = this.block.querySelector(this.elements.form);
    this.inputEmail = this.form.querySelector(this.elements.inputEmail);
    this.inputPassword = this.form.querySelector(this.elements.inputPassword);
    this.inputName = this.form.querySelector(this.elements.inputName);
    this.errorServer = this.form.querySelector(this.elements.errorServeer);
    this.buttonSubmit = this.form.querySelector(this.elements.buttonSubmit);
  }

  _setListeners() {

    const { validation } = this._dependencies;

    this._setHandlers([
      { element: this.buttonClose, event: 'click', handler: this.close.bind(this) },
      { element: this.buttonOpenOtherPopup, event: 'click', handler: this._openPopupLogin.bind(this) },
      { element: this.form, event: 'input', handler: validation.checkFormRegistration.bind(validation) },
      { element: this.buttonSubmit, event: 'click', handler: this._submit.bind(this) },
    ]);
  }

  _removeListeners() {

    // const { validation } = this._dependencies;

    this._removeHandlers([
      { element: this.buttonClose, event: 'click', handler: this.close.bind(this) },
      { element: this.buttonOpenOtherPopup, event: 'click', handler: this._openPopupLogin.bind(this) },
      // { element: this.form, event: 'input', handler: validation.checkFormRegistration.bind(validation) },
      { element: this.buttonSubmit, event: 'click', handler: this._submit.bind(this) },
    ]);
  }

  _openPopupLogin() {
    const { popupLogin } = this._dependencies;
    this.close();
    popupLogin.open();
  }

  _openPopupSuccess() {
    const { popupSuccess } = this._dependencies;
    this.close();
    popupSuccess.open();
  }

  _submit(event) {
    event.preventDefault();

    const { mainApi } = this._dependencies;

    this._disableInputs([this.inputEmail, this.inputPassword, this.inputName]);
    this._disableButton(this.buttonSubmit);
    mainApi
      .signup({
        email: this.inputEmail.value,
        password: this.inputPassword.value,
        name: this.inputName.value,
      })
      .then(res => {
        if(res.statusCode === '201') {
          this._openPopupSuccess()
        } else {
          throw new Error(res.message);
        }
      })
      .catch(err => {
        this._activatErrorServer(this.errorServer, err);
        this._activateInputs([this.inputEmail, this.inputPassword, this.inputName]);
        this._activateButton(this.buttonSubmit);
      });
    }

}
