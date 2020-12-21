/* eslint-disable no-param-reassign */

import { root } from './root';
import { templates } from './dom';
import starImage from './../icons/star.svg';
import errorImage from './../icons/error.svg';
import starSound from './../audio/effects/star.wav';
import errorSound from './../audio/effects/error.wav';

export default class Card {
  constructor(obj) {
    this.src = obj.src;
    this.name = obj.name;
    this.translation = obj.translation;
    this.sound = obj.sound;
  }

  renderCard() {
    const cardElement = templates.card.cloneNode(true);
    const imgs = cardElement.querySelectorAll('img');
    const flip = cardElement.querySelector('.cards__flip');

    [...imgs].forEach(element => {
      element.src = this.src;
      element.alt = this.name;
    });

    cardElement.dataset.name = this.name;
    cardElement.querySelector('.cards__name--en').textContent = this.name;
    cardElement.querySelector('.cards__name--ru').textContent = this.translation;

    const onFlipClick = () => {
      if (!root.play) cardElement.classList.toggle('flipped');
    };

    const onCardClick = (evt) => {
      evt.preventDefault();
      const obj = JSON.parse(localStorage.getItem(this.name));

      if (!root.play && evt.target !== flip && !cardElement.classList.contains('flipped')) {
        root.playAudio(this.sound);
        // обновляем статистику
        obj.trained += 1;
      } else if (root.play && root.start) {
        if (this.name === root.name) {
          cardElement.classList.add('disabled');
          root.createStar(starImage);
          root.playAudio(starSound);
          root.stars += 1;
          root.index += 1;
          obj.stars += 1;
          setTimeout(root.getCurrentCard.bind(root), 1000);
        } else {
          root.createStar(errorImage);
          root.playAudio(errorSound);
          root.errors += 1;
          obj.errors += 1;
        }
        obj.percent = Math.trunc((obj.stars * 100) / (obj.errors + obj.stars)) || '0';
      }
      localStorage.setItem(this.name, JSON.stringify(obj));
    };

    const onCardMouseLeave = (evt) => {
      const target = evt.target;
      if (target.classList.contains('flipped')) {
        target.classList.remove('flipped');
      }
    };

    flip.addEventListener('click', onFlipClick);
    cardElement.addEventListener('click', onCardClick);
    cardElement.addEventListener('mouseleave', onCardMouseLeave);

    return cardElement;
  }
}
