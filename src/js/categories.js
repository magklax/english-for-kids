/* eslint-disable class-methods-use-this */

import Card from './cards';
import { dataArray } from './data';

const cards = document.querySelector('#cards');
const menu = document.querySelector('#menu');
const categories = document.querySelector('#categories');
const menuTemplate = document.querySelector('#category-menu-template')
  .content.querySelector('.nav__item');
const mainTemplate = document.querySelector('#category-main-template')
  .content.querySelector('.categories__item');

class Category {
  constructor(obj) {
    this.src = obj.src;
    this.name = obj.name;
    this.color = obj.color;
    this.cards = obj.cards;
  }

  renderMenuCat() {
    const catElement = menuTemplate.cloneNode(true);

    catElement.style.backgroundColor = this.color;
    catElement.querySelector('img').src = this.src;
    catElement.querySelector('img').alt = this.name;
    catElement.querySelector('.nav__name').textContent = this.name;

    catElement.addEventListener('click', (evt) => {
      evt.preventDefault();

      dataArray.forEach(obj => {
        if (obj.name === evt.target.textContent || obj.name === evt.target.alt) {
          categories.style.display = 'none';
          this.createCards(obj.cards);
        }
      });
    });

    return catElement;
  }

  renderMainCat() {
    const catElement = mainTemplate.cloneNode(true);

    catElement.style.backgroundColor = this.color;
    catElement.querySelector('img').src = this.src;
    catElement.querySelector('img').alt = this.name;
    catElement.querySelector('.categories__name').textContent = this.name;

    return catElement;
  }

  createCards(arr) {
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < arr.length; i += 1) {
      fragment.appendChild(new Card(arr[i]).renderCard());
    }

    cards.innerHTML = '';
    cards.appendChild(fragment);
  }
}

const createMainCats = () => {
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < dataArray.length; i += 1) {
    fragment.appendChild(new Category(dataArray[i]).renderMainCat());
  }

  return fragment;
};

const createMenuCats = () => {
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < dataArray.length; i += 1) {
    fragment.appendChild(new Category(dataArray[i]).renderMenuCat());
  }

  return fragment;
};

menu.appendChild(createMenuCats());
categories.appendChild(createMainCats());
