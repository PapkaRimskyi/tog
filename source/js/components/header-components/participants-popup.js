import CrossButton from '../../support-classes/cross-button-class.js';
import '../../../img/agutin-button.png';
import '../../../img/agutin-gif.gif';

const participantsMarkup = () => `<section class="enter-participants-popup">
<h2 class="visually-hidden">Окно для добавления участников</h2>
<div class="enter-participants-popup__container">
  <a class="popup-close participants-close" href="#">
    <svg class="popup-close__svg" xmlns="http://www.w3.org/2000/svg" width="34.31" height="38.25" viewBox="0 0 35 39" fill="none" stroke="#242424" stroke-width="2">
      <path d="M.99 35.94L31.77 1.02m-29.24 0L33.3 35.94"/>
    </svg>
  </a>
  <h2 class="enter-participants-popup__headline">Хотите вписать участников турнира?</h2>
  <form class="enter-participants-popup__form" action="localhost:8081" method="post" enctype="multipart/form-data">
    <input class="enter-participants-popup__participants-list" type="text" name="games" placeholder="Список игр">
    <button class="enter-participants-popup__send-participants-list" type="submit">Отправить!</button>
  </form>
</div>
</section>
`;

export default class ParticipantsPopup extends CrossButton {
  constructor() {
    super();

    this.MAXGAMES = 6;

    this.input = this.getElement().querySelector(`.enter-participants-popup__participants-list`);
    this.form = this.getElement().querySelector(`.enter-participants-popup__form`);
    this.sendParticipantsList = this.getElement().querySelector(`.enter-participants-popup__send-participants-list`);

    this.handlerCollection = [{context: this.input, event: `input`}, {context: this.form, event: `submit`}];

    this.gamesNameList = null;

    this.listPassedChecks = null;
  }

  //Template

  getTemplate() {
    return participantsMarkup();
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
