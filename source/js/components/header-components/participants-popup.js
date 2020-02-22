import CrossButton from '../../support-classes/cross-button-class.js';
import '../../../img/agutin-button.png';
import '../../../img/agutin-gif.gif';

const participantsMarkup = () => `<section class="enter-participants-popup">
<h2 class="visually-hidden">Окно для добавления участников</h2>
<div class="enter-participants-popup__container">
  <a class="popup__close participants-close" href="#">
    <svg class="popup__close-svg" xmlns="http://www.w3.org/2000/svg" width="34.31" height="38.25" viewBox="0 0 35 39" fill="none" stroke="#242424" stroke-width="2">
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
    this.input = this.getElement().querySelector(`.enter-participants-popup__participants-list`);
    this.form = this.getElement().querySelector(`.enter-participants-popup__form`);

    this.gamesNameList = null;

    this.MAXGAMES = 6;
    this.listPassedChecks = null;
  }

  //Template

  getTemplate() {
    return participantsMarkup();
  }

  //Event listeners

  inputValidation() {
    this.input.addEventListener(`input`, (evt) => {
      evt.preventDefault();
      if (this._checkValidation(this.input)) {
        this.listPassedChecks = true;
      } else {
        this.listPassedChecks = false;
      }
    });
  }

  submitForm(handler) {
    this.form.addEventListener(`submit`, (evt) => {
      evt.preventDefault();
      if (this.listPassedChecks) {
        handler(this._getParticipantsList(this.gamesNameList));
        this.form.removeEventListener(`submit`, handler);
        this.deleteElement();
        this._element = null;
      }
    });
  }

  //Support methods

  _getParticipantsList(inputValueName) {
    const participantsList = [];
    for (let participant of inputValueName) {
      participantsList.push({name: participant.trim(), points: 0});
    }
    return participantsList;
  }

  _checkValidation(input) {
    this.gamesNameList = input.value.split(`,`);
    if (input.value === `` || input.value === ` `) {
      input.setCustomValidity(`Нет имени игры!`);
      return false;
    } else if (this.gamesNameList.length < this.MAXGAMES) {
      input.setCustomValidity(`Участников меньше ${this.MAXGAMES}. Добавьте еще ${this.MAXGAMES - this.gamesNameList.length}.`);
      return false;
    } else if (this.gamesNameList.length > this.MAXGAMES) {
      input.setCustomValidity(`Участников больше ${this.MAXGAMES}. Уменьшите количество на ${this.gamesNameList.length - this.MAXGAMES}.`);
    } else if (this._hasParticipantOnlySpace(this.gamesNameList)) {
      input.setCustomValidity(`Название одного из участников состоит из пустой строки или пробела.`);
      return false;
    } else if (this._hasRepeatedGames(this.gamesNameList)) {
      input.setCustomValidity(`Название некоторых участников совпадают.`);
      return false;
    } else {
      input.setCustomValidity(``);
      return true;
    }
  }

  _hasParticipantOnlySpace(participantsList) {
    for (let participant of participantsList) {
      if (participant === `` || participant === ` `) {
        return true;
      }
    }
    return false;
  }

  _hasRepeatedGames(participantsList)  {
    for (let i = 0; i < participantsList.length; i++) {
      for (let j = i + 1; j < participantsList.length; j++) {
        if (participantsList[i] === participantsList[j]) {
          return true;
        }
      }
    }
    return false;
  }
}
