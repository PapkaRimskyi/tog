import AbstractClass from '../../support-classes/abstract-class.js';

export default class Header extends AbstractClass {
  constructor(headerMarkup) {
    super();

    this.headerMarkup = headerMarkup;
  }

  //Template

  getTemplate() {
    return this.headerMarkup;
  }

  headerDelegation(handler) {
    this.getElement().addEventListener(`click`, () => {
      if (event.target.tagName === `BUTTON` && event.target.classList.contains(`header-nav__link`)) {
        event.preventDefault();
        handler(event.target);
      }
    });
  }
}
