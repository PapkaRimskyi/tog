import AbstractClass from '../../support-classes/abstract-class.js';

export default class Music extends AbstractClass {
  constructor(musicMarkup) {
    super();

    this.musicMarkup = musicMarkup;
  }

  //Template

  getTemplate() {
    return this.musicMarkup;
  }
}
