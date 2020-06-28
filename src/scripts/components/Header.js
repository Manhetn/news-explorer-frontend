import BaseComponent from './BaseComponent';

export default class Header extends BaseComponent {
  constructor(parameters) {
    super(parameters);
  }

  fillHeader() {

    const { storage } = this._dependencies;
    const userName = storage.getPropertyValue('userName');

    this._getElements();
    this._setListener();
    if (userName) {
      this._showAuthorizedUserMenu(userName);
    } else {
      this._showUnauthorizedUserMenu();
    }
  }

  _getElements() {

    const { page } = this._dependencies;

    this.menu = this.block.querySelector(this.elements.menu);
    this.buttonOpenMenu = this.block.querySelector(this.elements.buttonOpenMenu);
    this.buttonCloseMenu = this.menu.querySelector(this.elements.buttonCloseMenu);
    this.buttonLoqout = this.menu.querySelector(this.elements.buttonLoqout);
    this.nameUser = this.buttonLoqout.querySelector(this.elements.nameUser);

    if (page.namePage === 'Main') {
      this.linkToThePageUser = this.menu.querySelector(this.elements.linkToThePageUser);
      this.buttonLogin = this.menu.querySelector(this.elements.buttonLogin);
    }
  }

  _setListener() {
    const { page } = this._dependencies;

    this._setHandlers([
      { element: this.buttonOpenMenu, event: 'click', handler: this._openMenu.bind(this) },
      { element: this.buttonCloseMenu, event: 'click', handler: this._closeMenu.bind(this) },
      { element: this.buttonLoqout, event: 'click', handler: this._logout.bind(this) },
    ]);

    if (page.namePage === 'Main') {

      const { popupLogin } = this._dependencies;

      this._setHandlers([
        { element: this.buttonLogin, event: 'click', handler: popupLogin.open.bind(popupLogin) },
      ]);
    }
  }

  _showAuthorizedUserMenu(name) {
    const { page } = this._dependencies;

    if (page.namePage === 'Articles') {
      this.buttonLoqout.removeAttribute('disabled', false);
      this.nameUser.textContent = name;
    } else {
      this.linkToThePageUser.classList.add(this.modifiers.linkVisble);
      this.buttonLogin.setAttribute('disabled', true);
      this.buttonLoqout.removeAttribute('disabled', false);
      this.nameUser.textContent = name;
    }
  }

  _showUnauthorizedUserMenu() {
    this.linkToThePageUser.classList.remove(this.modifiers.linkVisble);
    this.buttonLogin.removeAttribute('disabled', false);
    this.buttonLoqout.setAttribute('disabled', true);
    this.nameUser.textContent = '';
  }

  _openMenu() {
    this.menu.classList.add(this.modifiers.isOpen);
  }

  _closeMenu() {
    this.menu.classList.remove(this.modifiers.isOpen);
  }

  _logout() {

    const { page, storage, mainApi, backToTheMainPage } = this._dependencies;

    mainApi
      .logout()
      .then(res => {
        if (res.statusCode === '200') {
          if (page.namePage === 'Articles') {
            backToTheMainPage();
          } else {
            this._showUnauthorizedUserMenu();
            // console.log(page.namePage);
          }
          storage.removeProperties('userName');
        } else {
          throw new Error(res.message);
        }
      })
      .catch(err => console.log(err));
  }

}
