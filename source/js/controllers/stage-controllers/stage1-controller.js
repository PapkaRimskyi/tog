import StageController from '../../support-classes/stage-controller-class.js';
import StageModel from '../../models/stage-model.js';
import Stage1 from '../../components/main-component/stage-1.js';
import Stage2Controller from './stage2-controller.js';
import { renderMarkup } from '../../utils.js';

export default class Stage1Controller extends StageController {
  constructor(participantsList) {
    super(new StageModel(participantsList));

    this.setStageInstance(new Stage1(this.stageModel.getParticipantsList()));

    this._nextButtonStage = `Второй этап`;

    this.stageButtonHandler = this.stageButtonHandler.bind(this);
  }

  //Render

  renderStage() {
    renderMarkup(this.mainTag, this.stageInstance, `beforeend`);
    this.stageInstance.stageTipInteraction();
    this.stageInstance.stageButtonInteraction(this.stageButtonHandler);
  }

  //Handler

  stageButtonHandler(participantsList, stageButton, launchCount, maxLaunchCount, cellNames, cellPoints, removeHandler) {
    if (stageButton.textContent !== this._nextButtonStage) {
      this.stageInstance.throwCube(participantsList, `points`);
      for (let i = 0; i < cellNames.length; i++) {
        cellNames[i].textContent = participantsList[i].name;
        cellPoints[i].textContent = participantsList[i].points;
      }
      if (launchCount + 1 < maxLaunchCount) {
        stageButton.textContent = `${launchCount + 1} бросок`;
      } else {
        stageButton.textContent = this._nextButtonStage;
        this.stageInstance.highlightingGroupStageWinners(cellNames, 4, `points`);
      }
    } else {
      removeHandler();
      this.stageInstance.deleteElement(document.querySelector(`.stage-1`));
      this.setNextStageControllerInstance(new Stage2Controller(participantsList));
      this.nextStageControllerInstance.renderStage();
    }
  }
}
