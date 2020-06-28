import Popup from './Popup';

export default class PopupLogin extends Popup {
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

  _getElementsForm() {
    this.form = this.block.querySelector(this.elements.form);
    this.inputEmail = this.form.querySelector(this.elements.inputEmail);
    this.inputPassword = this.form.querySelector(this.elements.inputPassword);
    this.errorServer = this.form.querySelector(this.elements.errorServeer);
    this.buttonSubmit = this.form.querySelector(this.elements.buttonSubmit);
  }

  _setListeners() {

    const { validation } = this._dependencies;

    this._setHandlers([
      { element: this.buttonClose, event: 'click', handler: this.close.bind(this) },
      { element: this.buttonOpenOtherPopup, event: 'click', handler: this._openPopupRegistration.bind(this) },
      { element: this.form, event: 'input', handler: validation.checkFormLogin.bind(validation) },
      { element: this.buttonSubmit, event: 'click', handler: this._submit.bind(this) },
    ]);
  }

  _removeListeners() {

    const { validation } = this._dependencies;

    this._removeHandlers([
      { element: this.buttonClose, event: 'click', handler: this.close.bind(this) },
      { element: this.buttonOpenOtherPopup, event: 'click', handler: this._openPopupRegistration.bind(this) },
      { element: this.form, event: 'input', handler: validation.checkFormLogin.bind(validation) },
      { element: this.buttonSubmit, event: 'click', handler: this._submit.bind(this) },
    ]);
  }

  _openPopupRegistration() {

    const { popupRegistration } = this._dependencies;

    this.close();
    popupRegistration.open();
  }

  _submit(event) {
    event.preventDefault();

    const { mainApi } = this._dependencies;

    this._disableInputs([this.inputEmail, this.inputPassword]);
    this._disableButton(this.buttonSubmit);
    mainApi
      .signin({
        email: this.inputEmail.value,
        password: this.inputPassword.value,
      })
      .then(res => {
        if(res.statusCode === '200') {
          this.close();
          this._getUserData();
        } else {
          console.log(res.data)
          throw new Error(res.message);
        }
      }).catch(err => {
        this._activatErrorServer(this.errorServer, err);
        this._activateInputs([this.inputEmail, this.inputPassword]);
        this._activateButton(this.buttonSubmit);
      });
  }

  _getUserData() {

    const { storage, header, mainApi } = this._dependencies;

    mainApi
      .getUser()
      .then(res => {
        if (res.statusCode === '200') {
          storage.setPropertyValue('userName', res.data.name);
          header._showAuthorizedUserMenu(res.data.name)
        } else {
          throw new Error(res.message);
        }
      }).catch(err => console.log(err))
  }

}
