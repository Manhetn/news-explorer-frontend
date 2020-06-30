const HEADER_PARAMETERS = {
  block: document.querySelector('.header'),
  elements: {
    buttonOpenMenu: '.header__button_type_menu_open',
    menu: '.header__menu',
    linkToThePageUser: '.header__link_page-user',
    buttonLogin: '.header__button_type_login',
    buttonLoqout: '.header__button_type_logout',
    buttonCloseMenu: '.header__button_type_menu_close',
    nameUser: '.header__name-user',

  },
  modifiers: {
    linkVisble: 'header__link_visble',
    isOpen: 'header__menu_is-opened',
  },
}

export default HEADER_PARAMETERS;
