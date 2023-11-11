import { validNum, cardType } from './Validity';

export default class CartWidjet {
  constructor() {
    this.container = document.querySelector('.container');
    this.form = this.container.querySelector('.form');
    this.input = this.form.querySelector('.input');
    this.button = this.form.querySelector('.submit');
    this.cards = Array.from(this.container.querySelectorAll('.card'));
    this.messageContainer = this.container.querySelector('.message_container');
    this.message = this.messageContainer.querySelector('.message');

    this.onSubmit = this.onSubmit.bind(this);
  }

  init() {
    this.form.addEventListener('submit', this.onSubmit);
  }

  onSubmit(e) {
    e.preventDefault();
    const result = validNum(this.input.value);
    this.invalidCard();

    if (this.input.value === '') {
      this.message.textContent = 'Введите номер карты';
      this.cards.forEach((el) => {
        el.classList.remove('valid');
      });
    } else if (result) {
      this.message.textContent = 'Верный номер карты';
      this.input.style.color = 'green';
      this.currentCard();
    } else {
      this.input.style.color = 'red';
      this.message.textContent = 'Такой карты не существует';
      this.invalidCard();
    }
  }

  currentCard() {
    const element = cardType(this.input.value);

    this.cards.forEach((el) => {
      if (el.classList.contains(`${element}`)) {
        el.classList.add('valid');
      }
    });
  }

  invalidCard() {
    this.cards.forEach((el) => {
      if (el.classList.contains('valid')) {
        el.classList.remove('valid');
      }
    });
  }
}
