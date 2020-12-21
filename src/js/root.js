import wonSound from './../audio/effects/won.wav';
import loseSound from './../audio/effects/lose.wav';
import { hide, show, shuffleArray } from './utils';
import { elements } from './dom';
import { createStats } from './statistics';

const STARS_NUMBER = 14;

const root = {
  play: false,
  start: false,
  hardstudy: false,
  errors: 0,
  stars: 0,
  array: [],
  name: null,
  index: 0,

  onToggleChange() {
    this.play = !this.play;

    if (this.play) {
      document.body.classList.add('played');
    } else {
      document.body.classList.remove('played');
    }
  },

  createStar(img) {
    const image = new Image();
    image.src = img;
    if (elements.starsbox.childElementCount >= STARS_NUMBER) {
      elements.starsbox.removeChild(elements.starsbox.childNodes[STARS_NUMBER - 1]);
    }
    elements.starsbox.prepend(image);
  },

  playAudio(audio) {
    new Audio(audio).play();
  },

  getCurrentCard() {
    if (this.index < this.array.length) {
      this.name = this.array[this.index].name;
      this.playAudio(this.array[this.index].sound);
    } else {
      this.endGame();
    }
  },

  onStartClick() {
    this.start = true;
    // убираем переключатель и старт
    hide(elements.toggle.parentElement, elements.start);
    // показываем шкалу и повтор
    show(elements.repeat, elements.starsbox);
    //  shuffle array
    shuffleArray(this.array);
    // проигрываем первую карточку
    this.getCurrentCard();
  },

  onRepeatClick() {
    this.getCurrentCard();
  },

  endGame() {
    let title;
    let text;
    let classname;

    if (this.errors > 0) {
      title = 'Game Over';
      text = `Oh no! You made ${this.errors.toString()} mistakes.`;
      classname = 'gameover__box--lose';
      this.playAudio(loseSound);
    } else {
      title = 'You Won!';
      text = `Excellent!`;
      classname = 'gameover__box--win';
      this.playAudio(wonSound);
    }

    elements.gameover.querySelector('#gameover-box').className = classname;
    elements.gameover.querySelector('.gameover__title').textContent = title;
    elements.gameover.querySelector('.gameover__text').textContent = text;

    // открываем конец игры:
    document.body.classList.add('blocked');
    elements.overlay.classList.add('overlay--gameover');
    elements.overlay.style.top = window.pageYOffset + 'px';
    show(elements.gameover);

    // сбрасываем игру
    setTimeout(() => { this.resetGame(); }, 4000);
  },

  resetState() {
    this.start = false;
    this.play = false;
    this.start = false;
    this.hardstudy = false;
    this.errors = 0;
    this.stars = 0;
    this.index = 0;
    this.array = [];
  },

  resetGame() {
    document.body.className = ''; // удаляем классы
    elements.overlay.className = 'overlay'; // удаляем классы
    // показываем изначальные элементы:
    show(elements.categories, elements.toggle.parentElement);
    // прячем лишние элементы:
    hide(
      elements.gameover,
      elements.repeat,
      elements.cards,
      elements.starsbox
    );
    elements.starsbox.innerHTML = ''; // удаляем звезды
    elements.title.textContent = 'English for Kids'; // возращаем заголовок
    elements.toggle.checked = true; // возвращаем переключатель в первоначальный режим
    //  сбрасываем изменения состояния:
    this.resetState();
  },

  openStats() {
    // прячем категории и переключатель
    hide(elements.categories, elements.toggle.parentElement);
    // создаем статистику и показываем
    createStats();
    show(elements.stats, elements.statsdelete, elements.statsstudy);
    elements.statstoggle.classList.add('opened');
  },

  closeStats() {
    // удаляем и скрываем статистику
    elements.statsbody.innerHTML = '';
    hide(elements.stats, elements.statsdelete, elements.statsstudy);
    elements.statstoggle.classList.remove('opened');
  },

  onStatsToggleClick(evt) {
    // сбрасываем игру
    this.resetGame();

    if (evt.target.classList.contains('opened')) {
      this.closeStats();
    } else {
      this.openStats();
    }
  },

  onStatsDeleteClick() {
    localStorage.clear();
    createStats();
  }
};

export { root };
