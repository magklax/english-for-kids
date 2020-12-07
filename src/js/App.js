/* eslint-disable class-methods-use-this */
/* eslint-disable func-names */

import Category from './Category';
import { data } from './data';
import { elements } from './dom';
import { root } from './root';
import { createStats } from './statistics';
import { show, sortAlphabet } from './utils';

const MAX_WORDS_NUMBER = 8;

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

  getDifficultWords() {
    const result = [];
    for (let i = 0; i < localStorage.length; i += 1) {
      if (localStorage.key(i) !== 'loglevel:webpack-dev-server') {
        result.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
      }
    }
    return sortAlphabet(result, 'percent').filter(obj => obj.percent > 0 && obj.percent < 100).slice(0, MAX_WORDS_NUMBER);
  }

  onStatsStudyClick() {
    root.hardstudy = true;
    const difficultWords = this.getDifficultWords();
    const result = [];
    for (let i = 0; i < difficultWords.length; i += 1) {
      result.push(data.find(categoryObj => categoryObj.name === difficultWords[i].category).cards
        .find(cardObj => cardObj.name === difficultWords[i].word));
    }

    root.array = result;
    elements.title.textContent = 'Study Difficult Words';
    new Category(data).createCards(root.array);

    root.closeStats(); // убираем статистику
    show(elements.cards, elements.start, elements.toggle.parentElement);
  }
}
