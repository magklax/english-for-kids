/* eslint-disable func-names */
/* eslint-disable no-param-reassign */

const hide = function () {
  for (let i = 0; i < arguments.length; i += 1) {
    arguments[i].classList.add('visually-hidden');
  }
};

const show = function () {
  for (let i = 0; i < arguments.length; i += 1) {
    arguments[i].classList.remove('visually-hidden');
  }
};

const sortAlphabet = (arr, key) => {
  return arr.sort((a, b) => (a[key] > b[key]) ? 1 : -1);
};

const sortReverse = (arr, key) => {
  return arr.sort((b, a) => (a[key] > b[key]) ? 1 : -1);
};

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }

  return array;
};

export {
  hide, show, sortAlphabet, sortReverse, shuffleArray
};
