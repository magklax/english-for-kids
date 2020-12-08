/* eslint-disable class-methods-use-this */

import Card from './Card';
import { elements, templates } from './dom';
import { hide, show } from './utils';
import { root } from './root';

export default class Category {
  constructor(obj) {
    this.src = obj.src;
    this.name = obj.name;
    this.color = obj.color;
    this.cards = obj.cards;
  }

  onCategoryClick() {
    show(elements.start, elements.cards);
    hide(elements.categories);
    elements.title.textContent = this.name;
    root.array = this.cards;
    [].forEach.call(elements.navitems, item => item.classList.remove('current'));
    document.querySelector(`#${this.name}`).classList.add('current');
    this.createCards();
  }

  renderMenuCategory() {
    const categoryElement = templates.menu.cloneNode(true);
    categoryElement.style.backgroundColor = this.color;
    categoryElement.setAttribute('id', this.name);
    categoryElement.querySelector('img').src = this.src;
    categoryElement.querySelector('img').alt = this.name;
    categoryElement.querySelector('.nav__name').textContent = this.name;

    categoryElement.addEventListener('click', (evt) => {
      evt.preventDefault();
      root.resetGame(); // сбрасываем игру
      root.closeStats(); // убираем статистику
      this.onCategoryClick();
    });

    return categoryElement;
  }

  renderMainCategory() {
    const categoryElement = templates.main.cloneNode(true);

    categoryElement.style.backgroundColor = this.color;
    categoryElement.querySelector('img').src = this.src;
    categoryElement.querySelector('img').alt = this.name;
    categoryElement.querySelector('.categories__name').textContent = this.name;

    categoryElement.addEventListener('click', (evt) => {
      evt.preventDefault();
      this.onCategoryClick();
    });

    return categoryElement;
  }

  createCards() {
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < root.array.length; i += 1) {
      fragment.appendChild(new Card(root.array[i]).renderCard());
    }
    elements.cards.innerHTML = '';
    elements.cards.appendChild(fragment);
  }
}
