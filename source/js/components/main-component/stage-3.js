import Stage from '../../support-classes/stage-class.js';

import { renderMarkup} from '../../utils.js';

export default class Stage3 extends Stage {
  constructor(participantsList) {
    super(participantsList);

    this.finalStatus = `К финалу`;
  }

  //Template

  getTemplate() {
    return this.markupConstructorInstance.getStageLevelMarkup(3, `Полуфинал`, `Мне повезет!`);
  }

  //Render

  renderParticipant(participantsList) {
    for (let i = 0; i < participantsList.length; i++) {
      renderMarkup(this.participantContainer, this.markupConstructorInstance.getStageParticipantsMarkup(participantsList[i]), `beforeend`, true);
    }
    this.participantsNamesContainer = this.getElement().querySelectorAll(`.one-v-one__participant-name`);
  }

  //Button interaction

  stageButtonInteraction(handler) {
    this.stageButton.addEventListener(`click`, handler);
  }

  //Support methods

  getParamHandler() {
    return {
      nameContainers: this.participantsNamesContainer,
      stageButton: this.stageButton,
      finalStatus: this.finalStatus,
    }
  }
}
