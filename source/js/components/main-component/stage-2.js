import Stage from '../../support-classes/stage-class.js';

import { renderMarkup } from '../../utils.js';

export default class Stage2 extends Stage {
  constructor(participantsList) {
    super(participantsList);

    this.STAGE_BUTTON_STATUS = {
      multiple: `Мультимножитель!`,
      nextParticipants: `Следующие участники`,
      nextStage: `Следующий этап`,
    }

    this.participantIndex = 0;
    this.numberOfParticipantsCompleted = null;

    this.isMultipleStatus = true;
  }

  //Template

  getTemplate() {
    return this.markupConstructorInstance.getStageLevelMarkup(2, `Четвертьфинал`, `Мультимножитель!`);
  }

  //Render

  renderParticipant(participantsList) {
    this.numberOfParticipantsCompleted = this.participantIndex + 2;
    for (this.participantIndex; this.participantIndex < this.numberOfParticipantsCompleted; this.participantIndex++) {
      renderMarkup(this.participantContainer, this.markupConstructorInstance.getStageParticipantsMarkup(participantsList[this.participantIndex]), `beforeend`, true);
    }
    this.participantsNameContainer = this.getElement().querySelectorAll(`.one-v-one__participant-name`);
  }

  //Button interaction

  stageButtonInteraction(handler) {
    this.stageButton.addEventListener(`click`, handler);
  }

  //Support methods

  setMultipleStatus(boolean) {
    this.isMultipleStatus = boolean;
  }

  getParamHandler() {
    return {
      stageButtonStatus: this.STAGE_BUTTON_STATUS,
      stageButton: this.stageButton,
      multipleStatus: this.isMultipleStatus,
      nameContainers: this.participantsNameContainer,
      participantsIndex: this.participantIndex,
      participantsContainer: this.participantContainer,
      completedParticipant: this.numberOfParticipantsCompleted,
    }
  }
}
