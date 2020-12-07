/* eslint-disable class-methods-use-this */
/* eslint-disable func-names */

import Category from './Category';
import { data } from './data';
import { elements } from './dom';
import { root } from './root';
import { createStats } from './statistics';
import { show } from './utils';

export default class App {
  init() {
    createStats();
    elements.menu.appendChild(this.createMenuCategories());
    elements.categories.appendChild(this.createMainCategories());
    elements.toggle.addEventListener('change', root.onToggleChange.bind(root));
    elements.start.addEventListener('click', root.onStartClick.bind(root));
    elements.repeat.addEventListener('click', root.onRepeatClick.bind(root));
    elements.statstoggle.addEventListener('click', root.onStatsToggleClick.bind(root));
    elements.statsdelete.addEventListener('click', root.onStatsDeleteClick.bind(root));
    elements.statsstudy.addEventListener('click', this.onStatsStudyClick.bind(this));
  }

  createMainCategories() {
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < data.length; i += 1) {
      fragment.appendChild(new Category(data[i]).renderMainCategory());
    }

    return fragment;
  }

  createMenuCategories() {
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < data.length; i += 1) {
      fragment.appendChild(new Category(data[i]).renderMenuCategory());
    }

    return fragment;
  }

  onStatsStudyClick() {
    root.hardstudy = true;
    const result = [];

    for (let i = 0; i < localStorage.length; i += 1) {
      if (localStorage.key(i) !== 'loglevel:webpack-dev-server') {
        const storageObj = JSON.parse(localStorage.getItem(localStorage.key(i)));
        if (storageObj.percent < 75 && storageObj.percent > 0) {
          result.push(data.find(categoryObj => categoryObj.name === storageObj.category).cards
            .find(cardObj => cardObj.name === storageObj.word));
        }
      }
    }

    root.array = result;
    elements.title.textContent = 'Study Difficult Words';
    new Category(data).createCards(root.array);

    root.closeStats(); // убираем статистику
    show(elements.cards, elements.start, elements.toggle.parentElement);
  }
}
