import AbstractClass from './abstract-class.js';

export default class CrossButton extends AbstractClass {
  constructor() {
    super();
    this.crossHandler = null;
  }

  closePopupByCrossButton(handler) {
    this.crossHandler = handler;
    this.getElement().querySelector(`.popup-close`).addEventListener(`click`, handler);
  }

  getCrossHandler() {
    return this.crossHandler;
  }
}
