import AbstractClass from '../../support-classes/abstract-class.js';

export default class Copyright extends AbstractClass {
  constructor(footerMarkup) {
    super();

    this.footerMarkup = footerMarkup;
  }

  //Template

  getTemplate() {
    return this.footerMarkup;
  }
}
