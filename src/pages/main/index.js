import './index.css';

// eslint-disable-next-line no-undef
const root = document.querySelector('.page');

// constants header
const menuHeader = root.querySelector('.header__menu');
const buttonOpenMenu = root.querySelector('.header__button_type_menu_open');
const buttonOpenLogin = menuHeader.querySelector('.header__button_type_login');
const buttonCloseMenuHeadr = menuHeader.querySelector('.header__button_type_menu_close');
const linkPageUser = menuHeader.querySelector('.header__link_page-user');
const buttonLogout = menuHeader.querySelector('.header__button_type_logout');

// constants popup login
const popupLogin = root.querySelector('.popup_type_login');
const buttonCloseLogin = popupLogin.querySelector('.popup__close');
const buttonLoginOpenReg = popupLogin.querySelector('.popup__subbutton');
const formLogin = popupLogin.querySelector('.popup__form');
const inputEmailLogin = formLogin.elements.email;
const inputPasswordLogin = formLogin.elements.password;
const buttonLogin = formLogin.querySelector('.popup__button');

// constants popup reg
const popupReg = root.querySelector('.popup_type_reg');
const buttonCloseReg = popupReg.querySelector('.popup__close');
const buttonRegOpenLogin = popupReg.querySelector('.popup__subbutton');
const formReg = popupReg.querySelector('.popup__form');
const inputEmailReg = formReg.elements.email;
const inputPasswordReg = formReg.elements.password;
const inputNamReg = formReg.elements.name;
const buttonReg = formReg.querySelector('.popup__button');

// constants popup success
const popupSuccess = root.querySelector('.popup_type_success');
const buttonSuccess = popupSuccess.querySelector('.popup__subbutton');
const buttonCloseSuccess = popupSuccess.querySelector('.popup__close');

// constants search
const searchForm = root.querySelector('.search__form');
const buttonSearch = searchForm.querySelector('.search__button');

// constants article list
const articlesList = root.querySelector('.articles')

// functions header
function openPopupLogin() {
  popupLogin.classList.add('popup_is-opened');
}

function openMenu() {
  menuHeader.classList.add('header__menu_is-opened');
}

function closeMenu() {
  menuHeader.classList.remove('header__menu_is-opened');
}

function logout() {
  linkPageUser.classList.remove('header__link_visble');
  buttonOpenLogin.removeAttribute('disabled', false);
  buttonLogout.setAttribute('disabled', true);
}

// functions popup login
function closePopupLogin() {
  popupLogin.classList.remove('popup_is-opened');
};

function checkFormLogin() {
  if (inputEmailLogin.validity.valid && inputPasswordLogin.validity.valid ) {
    buttonLogin.removeAttribute('disabled', false);
  }
}

function openPopupReg() {
  popupReg.classList.add('popup_is-opened');
};

function openRegCloseLogin() {
  closePopupLogin();
  openPopupReg();
}

function login(event) {
  event.preventDefault();
  linkPageUser.classList.add('header__link_visble');
  buttonLogout.removeAttribute('disabled', false);
  buttonOpenLogin.setAttribute('disabled', true);
  closePopupLogin();
}

// functions popup reg


function closePopupReg() {
  popupReg.classList.remove('popup_is-opened');
}

function checkFormReg() {
  // eslint-disable-next-line no-bitwise
  if (inputEmailReg.validity.valid && inputPasswordReg.validity.valid & inputNamReg.validity.valid) {
    buttonReg.removeAttribute('disabled', false);
  }
}

function registration(event) {
  event.preventDefault();
  popupSuccess.classList.add('popup_is-opened');
  closePopupReg();
}

function openLoginCloseReg() {
  closePopupReg();
  openPopupLogin();
}

// functions popup success
function closeSuccess() {
  popupSuccess.classList.remove('popup_is-opened');
}

function openLoginCloseSuccess() {
  closeSuccess();
  openPopupLogin();
}

// functions search
function showArticles(event) {
  event.preventDefault();
  articlesList.classList.add('articles_is-opened');
}

// listeners header
buttonOpenLogin.addEventListener('click', openPopupLogin);
buttonOpenMenu.addEventListener('click', openMenu);
buttonCloseMenuHeadr.addEventListener('click', closeMenu);
buttonLogout.addEventListener('click', logout);

// listeners popup login
buttonCloseLogin.addEventListener('click', closePopupLogin);
buttonLoginOpenReg.addEventListener('click', openRegCloseLogin);
formLogin.addEventListener('input', checkFormLogin);
buttonLogin.addEventListener('click', login);

// listeners popup reg
buttonCloseReg.addEventListener('click', closePopupReg);
buttonReg.addEventListener('click', registration);
formReg.addEventListener('input', checkFormReg);
buttonRegOpenLogin.addEventListener('click', openLoginCloseReg)

// listeners popup success
buttonCloseSuccess.addEventListener('click', closeSuccess);
buttonSuccess.addEventListener('click', openLoginCloseSuccess);

// listeners search
buttonSearch.addEventListener('click', showArticles);

