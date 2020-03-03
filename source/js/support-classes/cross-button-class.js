import AbstractClass from './abstract-class.js';

export default class CrossButton extends AbstractClass {
  closePopupByCrossButton(handler) {
    this.getElement().querySelector(`.popup__close`).addEventListener(`click`, (evt) => {
      evt.preventDefault();
      handler(this, this.handlerCollection);
      this.getElement().querySelector(`.popup__close`).removeEventListener(`click`, handler);
    });
  }
}
