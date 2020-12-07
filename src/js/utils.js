/* eslint-disable func-names */

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

export {
  hide, show, sortAlphabet, sortReverse
};
