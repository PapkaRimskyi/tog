import { createDomElement } from '../utils.js';

export default class AbstractClass {
  constructor() {
    if (new.target === AbstractClass) {
      throw new Error(`Can't be used by AbstractClass`);
    } else {
      this._element = null;
    }
  }

  getTemplate() {
    throw new Error(`Can't be used by AbstractClass`);
  }

  getElement() {
    if (this._element !== null) {
      return this._element;
    }
    this._element = createDomElement(this.getTemplate());
    return this._element;
  }

  deleteElement() {
    if (document.querySelector(`.${this.getElement().className}`)) {
      document.querySelector(`.${this.getElement().className}`).remove();
    }
  }
}
