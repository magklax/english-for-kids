const elements = {
  overlay: document.querySelector('#overlay'),
  menu: document.querySelector('#menu'),
  categories: document.querySelector('#categories'),
  cards: document.querySelector('#cards'),
  toggle: document.querySelector('#toggle-input'),
  starsbox: document.querySelector('#stars-box'),
  start: document.querySelector('#start-button'),
  repeat: document.querySelector('#repeat-button'),
  title: document.querySelector('h1'),
  gameover: document.querySelector('#gameover'),
  stats: document.querySelector('#statistics'),
  statsbody: document.querySelector('#statistics-body'),
  statstoggle: document.querySelector('#statistics-toggle-button'),
  statsdelete: document.querySelector('#statistics-delete-button'),
  statsstudy: document.querySelector('#statistics-study-button')
};

const templates = {
  card: document.querySelector('#card-template')
    .content.querySelector('.cards__item'),
  menu: document.querySelector('#category-menu-template')
    .content.querySelector('.nav__item'),
  main: document.querySelector('#category-main-template')
    .content.querySelector('.categories__item')
};

export { elements, templates };
