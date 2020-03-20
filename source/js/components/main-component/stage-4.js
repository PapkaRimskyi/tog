import Stage from '../../support-classes/stage-class.js';

import { renderMarkup} from '../../utils.js';

export default class Stage4 extends Stage {
  constructor(firstParticipant) {
    super(firstParticipant);

    this.winnerIsDeterminated = `У нас есть победитель!`;
  }

  //Template

  getTemplate() {
    return this.markupConstructorInstance.stageMarkup(4, `Финал`, `1 бросок`);
  }

  //Render

  renderParticipant(participantsList) {
    for (let i = 0; i < participantsList.length; i++) {
      renderMarkup(this.participantContainer, this.markupConstructorInstance.stageParticipantsMarkup(participantsList[i], true), `beforeend`, true);
    }
    this.participantsNamesContainer = this.getElement().querySelectorAll(`.one-v-one__participant-name`);
    this.participantsPointsContainer = this.getElement().querySelectorAll(`.one-v-one__participant-points`);
  }

  //Button interaction

  stageButtonInteraction(handler) {
    this.stageButton.addEventListener(`click`, handler);
  }

  //Support methods

  pushParticipant(finalParticipantsList, secondParticipant) {
    finalParticipantsList.push(secondParticipant);
  }

  getParamHandler() {
    return {
      stageButton: this.stageButton,
      pointsContainer: this.participantsPointsContainer,
      namesContainer: this.participantsNamesContainer,
      winnerIsDeterminated: this.winnerIsDeterminated,
    }
  }
}
