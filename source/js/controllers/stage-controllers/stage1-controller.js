import StageController from '../../support-classes/stage-controller-class.js';
import StageModel from '../../models/stage-model.js';
import Stage1 from '../../components/main-component/stage-1.js';
import Stage2Controller from './stage2-controller.js';
import { renderMarkup } from '../../utils.js';

export default class Stage1Controller extends StageController {
  constructor(participantsList) {
    super(new StageModel(participantsList));

    this.LAUNCH_COUNT_LESS_THAN = 4;
    this.LAUNCH_COUNT = 1;

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

  stageButtonHandler() {
    event.preventDefault();
    const {cellNames, cellPoints, stageButton, nextStage} = this.stageInstance.getParamHandler();
    const participantsList = this.stageModel.getParticipantsList();
    if (stageButton.textContent !== nextStage) {
      this.throwCube(participantsList, `points`, this.LAUNCH_COUNT, this.LAUNCH_COUNT_LESS_THAN);
      this.writeInfoInCell(cellNames, cellPoints, participantsList);
      this.setButtonName(cellNames, stageButton, this.LAUNCH_COUNT, this.LAUNCH_COUNT_LESS_THAN, nextStage);
    } else {
      stageButton.removeEventListener(`click`, this.stageButtonHandler);
      this.stageInstance.removeTipHandler();
      this.stageInstance.deleteElement(document.querySelector(`.stage-1`));
      this.setNextStageControllerInstance(new Stage2Controller(participantsList));
      this.nextStageControllerInstance.renderStage();
    }
  }


  //Support methods

  writeInfoInCell(cellNames, cellPoints, participantsList) {
    for (let i = 0; i < cellNames.length; i++) {
      cellNames[i].textContent = participantsList[i].name;
      cellPoints[i].textContent = participantsList[i].points;
    }
  }

  setButtonName(cellNames, stageButton, launchCount, maxLaunchCount, nextStage) {
    if (launchCount + 1 < maxLaunchCount) {
      stageButton.textContent = `${launchCount + 1} бросок`;
      this.LAUNCH_COUNT++;
    } else {
      stageButton.textContent = nextStage;
      this.highlightingGroupStageWinners(cellNames, this.LAUNCH_COUNT_LESS_THAN);
      this.stageModel.cropParticipantsList(0, this.LAUNCH_COUNT_LESS_THAN);
    }
  }
}
