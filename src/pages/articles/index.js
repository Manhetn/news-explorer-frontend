import './index.css';

// eslint-disable-next-line no-undef
const root = document.querySelector('.page');
const menuHeader = root.querySelector('.header__menu');
const buttonOpenMenu = root.querySelector('.header__button_type_menu_open');
const buttonCloseMenuHeadr = menuHeader.querySelector('.header__button_type_menu_close');

function openMenu() {
  menuHeader.classList.add('header__menu_is-opened');
}

function closeMenu() {
  menuHeader.classList.remove('header__menu_is-opened');
}

buttonOpenMenu.addEventListener('click', openMenu);
buttonCloseMenuHeadr.addEventListener('click', closeMenu);
