import CrossButton from '../../support-classes/cross-button-class.js';

export default class RulesPopup extends CrossButton {
  constructor(rulesPopupMarkup) {
    super();

    this.rulesPopupMarkup = rulesPopupMarkup;
  }

  //Template

  getTemplate() {
    return this.rulesPopupMarkup;
  }
}
