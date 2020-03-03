import { stageMarkup, stageParticipantsMarkup } from '../../markup/stage-markup.js';

import Stage from '../../support-classes/stage-class.js';

import { renderMarkup} from '../../utils.js';

export default class Stage3 extends Stage {
  constructor(participantsList) {
    super(participantsList);

    this.isRandomStatus = true;
  }

  //Template

  getTemplate() {
    return stageMarkup(3, `Полуфинал`, `Мне повезет!`);
  }

  //Render

  renderParticipant() {
    for (let i = 0; i < this.participantsList.length; i++) {
      renderMarkup(this.participantContainer, stageParticipantsMarkup(this.participantsList[i]), `beforeend`, true);
    }
    this.participantsNameContainer = this.getElement().querySelectorAll(`.one-v-one__participant-name`);
  }

  //Button interaction

  stageButtonInteraction(handler) {
    this.stageButton.addEventListener(`click`, (evt) => {
      evt.preventDefault();
      this.setButtonHandler(handler);
      handler(this.participantsList, this.participantsNameContainer, this.stageButton, this.removeButtonHandler);
    })
  }

  //Support methods

  setRandomStatus(boolean) {
    this.isRandomStatus = boolean;
  }
}
