const burger = document.querySelector('#burger');
const menu = document.querySelector('#menu');
const overlay = document.querySelector('#overlay');

const openMenu = () => {
  burger.classList.add('nav__toggle--close');
  menu.classList.add('nav__menu--active');
  overlay.classList.add('overlay--burger');
  document.body.classList.add('blocked');

  document.addEventListener('keydown', onMenuEscPress);
  document.addEventListener('click', outMenuClick);
};

const closeMenu = () => {
  burger.classList.remove('nav__toggle--close');
  menu.classList.remove('nav__menu--active');
  overlay.classList.remove('overlay--burger');
  document.body.classList.remove('blocked');

  document.removeEventListener('keydown', onMenuEscPress);
  document.removeEventListener('keydown', onMenuEscPress);
};

const onMenuEscPress = (evt) => {
  if (evt.keyCode === 27) closeMenu();
};

const onBurgerClick = (evt) => {
  evt.preventDefault();

  if (evt.target.classList.contains('nav__toggle--close')) {
    closeMenu();
  } else {
    openMenu();
  }
};

const onMenuClick = (evt) => {
  evt.preventDefault();
  closeMenu();
};

const outMenuClick = (evt) => {
  if (evt.target === overlay || /^header/gi.test(evt.target.classList)) closeMenu();
};

burger.addEventListener('click', onBurgerClick);
menu.addEventListener('click', onMenuClick);
