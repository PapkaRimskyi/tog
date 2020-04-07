import Stage from '../../support-classes/stage-class.js';

export default class Stage1 extends Stage {
  constructor(participantsList) {
    super(participantsList);

    this.nextStage = `Второй этап`;

    this.cellNames = this.getElement().querySelectorAll(`.stage__participant--name`);
    this.cellPoints = this.getElement().querySelectorAll(`.stage__participant--points`);
  }

  //Template

  getTemplate() {
    return this.markupConstructorInstance.getStageLevelMarkup(1, `Групповой этап`, `1 бросок`, `tableMarkup`);
  }

  //Button interaction

  stageButtonInteraction(handler) {
    this.stageButton.addEventListener(`click`, handler);
  }

  getParamHandler() {
    return {
      cellNames: this.cellNames,
      cellPoints: this.cellPoints,
      stageButton: this.stageButton,
      nextStage: this.nextStage,
    }
  }
}
