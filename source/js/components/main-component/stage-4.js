import { stageMarkup, stageParticipantsMarkup } from '../../markup/stage-markup.js';

import Stage from '../../support-classes/stage-class.js';

import { renderMarkup} from '../../utils.js';

export default class Stage4 extends Stage {
  constructor(firstParticipant) {
    super(firstParticipant);

    this.LAUNCH_COUNT_LESS_THAN = 6;
    this.launchCount = 1;
  }

  //Template

  getTemplate() {
    return stageMarkup(4, `Финал`, `1 бросок`);
  }

  //Render

  renderParticipant() {
    for (let i = 0; i < this.participantsList.length; i++) {
      renderMarkup(this.participantContainer, stageParticipantsMarkup(this.participantsList[i]), `beforeend`, true);
    }
    this.participantsNameContainer = this.getElement().querySelectorAll(`.one-v-one__participant-name`);
    this.participantsPointsContainer = this.getElement().querySelectorAll(`.one-v-one__participant-points`);
  }

  //Button interaction

  stageButtonInteraction(handler) {
    this.stageButton.addEventListener(`click`, (evt) => {
      evt.preventDefault();
      handler(this.participantsList, this.stageButton, this.launchCount, this.LAUNCH_COUNT_LESS_THAN, this.participantsPointsContainer, this.participantsNameContainer);
    });
  }

  //Support methods

  pushParticipant(secondParticipant) {
    this.participantsList.push(secondParticipant);
  }
}
