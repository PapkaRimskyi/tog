import CrossButton from "../../support-classes/cross-button-class";

export default class DeveloperPopup extends CrossButton {
  constructor(developerPopupMarkup) {
    super();

    this.developerPopupMarkup = developerPopupMarkup;
  }

  getTemplate() {
    return this.developerPopupMarkup;
  }
}
