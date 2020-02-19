import { stageMarkup, stageParticipantsMarkup } from '../../markup/stage-markup.js';

import Stage from '../../support-classes/stage-class.js';

import { renderMarkup} from '../../utils.js';

export default class Stage4 extends Stage {
  constructor(firstParticipant) {
    super(firstParticipant);

    this.LAUNCH_COUNT_LESS_THAN = 6;
    this.launchCount = 1;
  }

  getTemplate() {
    return stageMarkup(4, `Финал`, `1 бросок`);
  }

  pushParticipant(secondParticipant) {
    this.participantsList.push(secondParticipant);
  }

  renderParticipant() {
    for (let i = 0; i < this.participantsList.length; i++) {
      renderMarkup(this.participantContainer, stageParticipantsMarkup(this.participantsList[i]), `beforeend`, true);
    }
    this.participantsInfoContainer = this.getElement().querySelectorAll(`.one-v-one__participant-points`);
  }

  stageButtonInteraction(handler) {
    this.stageButton.addEventListener(`click`, (evt) => {
      evt.preventDefault();
      handler(this.participantsList, this.stageButton, this.launchCount, this.LAUNCH_COUNT_LESS_THAN, this.participantsInfoContainer);
    });
  }
}
