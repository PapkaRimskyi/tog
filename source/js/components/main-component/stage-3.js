import { stageMarkup, stageParticipantsMarkup } from '../../markup/stage-markup.js';

import Stage from '../../support-classes/stage-class.js';

import { renderMarkup} from '../../utils.js';

export default class Stage3 extends Stage {
  constructor(participantsList) {
    super(participantsList);

    this.isRandomStatus = true;
  }

  getTemplate() {
    return stageMarkup(3, `Полуфинал`, `Мне повезет!`);
  }

  renderParticipant() {
    for (let i = 0; i < this.participantsList.length; i++) {
      renderMarkup(this.participantContainer, stageParticipantsMarkup(this.participantsList[i]), `beforeend`, true);
    }
    this.participantsInfoContainer = this.getElement().querySelectorAll(`.one-v-one__participant-name`);
  }

  stageButtonInteraction(handler) {
    this.stageButton.addEventListener(`click`, (evt) => {
      evt.preventDefault();
      handler(this.participantsList, this.participantsInfoContainer, this.stageButton);
    })
  }

  setRandomStatus(boolean) {
    this.isRandomStatus = boolean;
  }
}
