/* eslint-disable no-param-reassign */

const cardTemplate = document.querySelector('#card-template')
  .content.querySelector('.cards__item');

export default class Card {
  constructor(arr) {
    this.src = arr.src;
    this.name = arr.name;
    this.translation = arr.translation;
    this.sound = arr.sound;
  }

  renderCard() {
    const cardElement = cardTemplate.cloneNode(true);
    const imgs = cardElement.querySelectorAll('img');
    const flip = cardElement.querySelector('.cards__flip');
    const sound = cardElement.querySelector('.cards__voice');

    [...imgs].forEach(element => {
      element.src = this.src;
      element.alt = this.name;
    });

    cardElement.querySelector('.cards__name--en').textContent = this.name;
    cardElement.querySelector('.cards__name--ru').textContent = this.translation;

    flip.addEventListener('click', (evt) => {
      evt.preventDefault();
      cardElement.classList.toggle('flipped');
    });

    sound.addEventListener('click', (evt) => {
      evt.preventDefault();

      const audio = new Audio();
      audio.src = this.sound;
      audio.play();
    });

    cardElement.addEventListener('click', (evt) => {
      evt.preventDefault();
    });

    cardElement.addEventListener('mouseleave', (evt) => {
      const target = evt.target;
      if (target.classList.contains('flipped')) target.classList.remove('flipped');
    });

    return cardElement;
  }
}
