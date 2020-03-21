import StageController from '../../support-classes/stage-controller-class.js';
import StageModel from '../../models/stage-model.js';
import Stage4 from '../../components/main-component/stage-4.js';
import '../../../img/crown.svg';

import { renderMarkup } from '../../utils.js';

export default class Stage4Controller extends StageController {
  constructor(participantsList) {
    super(new StageModel(participantsList));

    this.LAUNCH_COUNT_LESS_THAN = 6;
    this.LAUNCH_COUNT = 1;

    this.setStageInstance(new Stage4(this.stageModel.getParticipantsList()));

    this.stageButtonHandler = this.stageButtonHandler.bind(this);
  }

  //Render

  renderStage() {
    renderMarkup(this.mainTag, this.stageInstance, `beforeend`);
    this.stageInstance.renderParticipant(this.stageModel.getParticipantsList());
    this.stageInstance.stageTipInteraction();
    this.stageInstance.stageButtonInteraction(this.stageButtonHandler);
  }

  //Handler

  stageButtonHandler() {
    event.preventDefault();
    const {stageButton, pointsContainer, namesContainer, winnerIsDeterminated} = this.stageInstance.getParamHandler();
    const participantsList = this.stageModel.getParticipantsList();
    if (stageButton.textContent !== winnerIsDeterminated) {
      this.throwCube(participantsList, `finalPoints`, false);
      this.addFinalPoints(pointsContainer, participantsList);
      this.setFinalButtonName(stageButton, participantsList, namesContainer, winnerIsDeterminated);
      this.setWinnerText(stageButton, namesContainer);
    }
  }

  //Support methods

  addSecondParticipant(finalParticipantsList, secondParticipant) {
    this.stageInstance.pushParticipant(finalParticipantsList, secondParticipant);
  }

  addFinalPoints(pointsContainer, participantsList) {
    for (let i = 0; i < pointsContainer.length; i++) {
      pointsContainer[i].textContent = participantsList[i].finalPoints;
    }
  }

  setFinalButtonName(stageButton, participantsList, namesContainer, winnerIsDeterminated) {
    if (this.LAUNCH_COUNT + 1 < this.LAUNCH_COUNT_LESS_THAN) {
      stageButton.textContent = `${this.LAUNCH_COUNT + 1} бросок`;
      this.LAUNCH_COUNT++;
    } else {
      this.highlightingStageWinner(participantsList, namesContainer, `finalPoints`);
      stageButton.textContent = winnerIsDeterminated;
      stageButton.disabled = true;
    }
  }

  setWinnerText(stageButton, namesContainer) {
    if (stageButton.disabled) {
      namesContainer.forEach((nameContainer) => this.rgbToHex(nameContainer.style.backgroundColor) === this.GREEN_COLOR ? nameContainer.parentElement.nextElementSibling.textContent = `Winner`
        : nameContainer.parentElement.nextElementSibling.textContent = `lOoSeeeR`);
    }
  }
}
