import { create } from './create';
import { elements } from './dom';
import { data } from './data';
import { sortAlphabet, sortReverse } from './utils';

class Stat {
  constructor(category, word, translation) {
    this.category = category;
    this.word = word;
    this.translation = translation;
    this.trained = 0;
    this.stars = 0;
    this.errors = 0;
    this.percent = 0;
  }
}

const createStats = () => {
  // создаем шапку таблицы
  const headRow = create('tr', null, [
    create('th', 'category', null, 'alphabet'),
    create('th', 'word', null, 'alphabet'),
    create('th', 'translation', null, 'alphabet'),
    create('th', 'trained', null, 'alphabet'),
    create('th', 'stars', null, 'alphabet'),
    create('th', 'errors', null, 'alphabet'),
    create('th', '%', null, 'alphabet')
  ]);
  elements.statsbody.appendChild(headRow);

  // создаем массив для статистики:
  const statsData = createDataArray(data);

  // создаем таблицу
  createStatsBody(statsData);

  headRow.addEventListener('click', (evt) => {
    const cell = evt.target.closest('th');
    const key = cell.textContent === '%' ? 'percent' : cell.textContent;
    if (cell.className === 'alphabet') {
      createStatsBody(sortReverse(statsData, key));
      cell.className = 'reverse';
    } else {
      createStatsBody(sortAlphabet(statsData, key));
      cell.className = 'alphabet';
    }
  });
};

const createDataArray = (array) => {
  const arr = [];
  for (let i = 0; i < array.length; i += 1) {
    for (let j = 0; j < array[i].cards.length; j += 1) {
      const category = array[i].name;
      const word = array[i].cards[j].name;
      const translation = array[i].cards[j].translation;
      // ecли данных нет, создаем их и загружаем в хранилище
      if (!localStorage.getItem(word)) {
        localStorage.setItem(word, JSON.stringify(new Stat(category, word, translation)));
      }
      //  получаем данные из хранилища
      arr.push(JSON.parse(localStorage.getItem(word)));
    }
  }
  return arr;
};

const createStatsBody = (array) => {
  //  удаляем строки
  while (elements.statsbody.childElementCount > 1) {
    elements.statsbody.removeChild(elements.statsbody.lastChild);
  }

  array.forEach(element => {
    const tr = create('tr', null, [
      create('td', element.category),
      create('td', element.word),
      create('td', element.translation),
      create('td', element.trained.toString()),
      create('td', element.stars.toString()),
      create('td', element.errors.toString()),
      create('td', element.percent.toString())
    ]);

    elements.statsbody.appendChild(tr);
  });
};

export { createStats };
