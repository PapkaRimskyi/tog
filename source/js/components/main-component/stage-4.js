import Stage from '../../support-classes/stage-class.js';

import { renderMarkup} from '../../utils.js';

export default class Stage4 extends Stage {
  constructor(firstParticipant) {
    super(firstParticipant);

    this.winnerIsDeterminated = `У нас есть победитель!`;

    this.reloadButton = null;
  }

  //Template

  getTemplate() {
    return this.markupConstructorInstance.getStageLevelMarkup(4, `Финал`, `1 бросок`);
  }

  //Render

  renderParticipant(participantsList) {
    for (let i = 0; i < participantsList.length; i++) {
      renderMarkup(this.participantContainer, this.markupConstructorInstance.getStageParticipantsMarkup(participantsList[i], true), `beforeend`, true);
    }
    this.participantsNamesContainer = this.getElement().querySelectorAll(`.one-v-one__participant-name`);
    this.participantsPointsContainer = this.getElement().querySelectorAll(`.one-v-one__participant-points`);
  }

  renderReloadButton(handler) {
    renderMarkup(document.querySelector(`.tog-main`), this.markupConstructorInstance.reloadButtonGame(), `beforeend`, true);
    this.reloadButton = document.querySelector(`.button--reload`);
    this.reloadButton.addEventListener(`click`, handler);
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
      crownMarkup: this.markupConstructorInstance.crownSvg(),
      reloadButton: this.reloadButton,
    }
  }
}
