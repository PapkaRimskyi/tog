import { stageMarkup, stageParticipantsMarkup } from '../../markup/stage-markup.js';

import Stage from '../../support-classes/stage-class.js';

import { renderMarkup} from '../../utils.js';

export default class Stage2 extends Stage {
  constructor(participantsList) {
    super(participantsList);

    this.participantNumber = 0;
    this.participantsCompleted = 0;
    this.isMultipleStatus = true;
  }

  getTemplate() {
    return stageMarkup(2, `Четвертьфинал`, `Мультимножитель!`);
  }

  renderParticipant() {
    this.participantsCompleted = this.participantNumber + 2;
    for (this.participantNumber; this.participantNumber < this.participantsCompleted; this.participantNumber++) {
      renderMarkup(this.participantContainer, stageParticipantsMarkup(this.participantsList[this.participantNumber]), `beforeend`, true);
    }
    this.participantsNameContainer = this.getElement().querySelectorAll(`.one-v-one__participant-name`);
    this.participantsPointsContainer = this.getElement().querySelectorAll(`.one-v-one__participant-points`);
  }

  stageButtonInteraction(handler) {
    this.stageButton.addEventListener(`click`, (evt) => {
      evt.preventDefault();
      handler(this.participantsList, this.participantsNameContainer, this.participantsCompleted, this.participantNumber, this.participantContainer, this.stageButton, this.isMultipleStatus);
    });
  }

  setMultipleStatus(boolean) {
    this.isMultipleStatus = boolean;
  }
}
