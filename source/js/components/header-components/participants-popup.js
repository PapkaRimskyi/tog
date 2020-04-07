import CrossButton from '../../support-classes/cross-button-class.js';

export default class ParticipantsPopup extends CrossButton {
  constructor(participantsPopupMarkup) {
    super();

    this.MAXGAMES = 6;

    this.participantsPopupMarkup = participantsPopupMarkup;

    this.input = this.getElement().querySelector(`.enter-participants-popup__participants-list`);
    this.form = this.getElement().querySelector(`.enter-participants-popup__form`);
    this.sendParticipantsList = this.getElement().querySelector(`.enter-participants-popup__send-participants-list`);

    this.handlerCollection = [{context: this.input, event: `input`}, {context: this.form, event: `submit`}];

    this.gamesNameList = null;

    this.listPassedChecks = null;
  }

  //Template

  getTemplate() {
    return this.participantsPopupMarkup;
  }

  //Event listeners

  inputValidation(handler) {
    this.handlerCollection[0].list = new Set([handler]);
    this.input.addEventListener(`input`, handler);
  }

  submitForm(handler) {
    this.handlerCollection[1].list = new Set([handler]);
    this.form.addEventListener(`submit`, handler);
  }

  //Support methods

  getParticipantsList(inputValueName) {
    return [].concat(inputValueName.map((participant) => ({name: participant.trim(), points: 0})));
  }

  checkValidation() {
    this.gamesNameList = this.input.value.split(`,`);
    if (this.input.value === `` || this.input.value === ` `) {
      this.input.setCustomValidity(`Нет имени игры!`);
      return false;
    } else if (this.gamesNameList.length < this.MAXGAMES) {
      this.input.setCustomValidity(`Участников меньше ${this.MAXGAMES}. Добавьте еще ${this.MAXGAMES - this.gamesNameList.length}.`);
      return false;
    } else if (this.gamesNameList.length > this.MAXGAMES) {
      this.input.setCustomValidity(`Участников больше ${this.MAXGAMES}. Уменьшите количество на ${this.gamesNameList.length - this.MAXGAMES}.`);
    } else if (this.hasParticipantOnlySpace(this.gamesNameList)) {
      this.input.setCustomValidity(`Название одного из участников состоит из пустой строки или пробела.`);
      return false;
    } else if (this.hasRepeatedGames(this.gamesNameList)) {
      this.input.setCustomValidity(`Название некоторых участников совпадают.`);
      return false;
    } else {
      this.input.setCustomValidity(``);
      return true;
    }
  }

  hasParticipantOnlySpace(participantsList) {
    for (let participant of participantsList) {
      if (participant === `` || participant === ` `) {
        return true;
      }
    }
    return false;
  }

  hasRepeatedGames(participantsList)  {
    for (let i = 0; i < participantsList.length; i++) {
      for (let j = i + 1; j < participantsList.length; j++) {
        if (participantsList[i] === participantsList[j]) {
          return true;
        }
      }
    }
    return false;
  }

  setListPassedChecks(boolean) {
    this.listPassedChecks = boolean;
  }

  getListPassedChecks() {
    return this.listPassedChecks;
  }

  getHandlerCollection() {
    return this.handlerCollection;
  }

  getGamesNamesList() {
    return this.gamesNameList;
  }
}
