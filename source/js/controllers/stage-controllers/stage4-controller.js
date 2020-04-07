import StageController from '../../support-classes/stage-controller-class.js';
import StageModel from '../../models/stage-model.js';
import Stage4 from '../../components/main-component/stage-4.js';
import '../../../img/crown.svg';
import '../../../img/arrow.png';

import { renderMarkup } from '../../utils.js';

export default class Stage4Controller extends StageController {
  constructor(participantsList) {
    super(new StageModel(participantsList));

    this.LAUNCH_COUNT_LESS_THAN = 6;
    this.LAUNCH_COUNT = 1;

    this.setStageInstance(new Stage4(this.stageModel.getParticipantsList()));

    this.stageButtonHandler = this.stageButtonHandler.bind(this);
    this.reloadButtonHandler = this.reloadButtonHandler.bind(this);
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
    const {stageButton, pointsContainer, namesContainer, winnerIsDeterminated, crownMarkup} = this.stageInstance.getParamHandler();
    const participantsList = this.stageModel.getParticipantsList();
    if (stageButton.textContent !== winnerIsDeterminated) {
      this.throwCube(participantsList, `finalPoints`, false, false);
      this.LAUNCH_COUNT++;
      this.writeParticipantsResult(participantsList, pointsContainer);
      this.addFinalPoints(pointsContainer, participantsList);
      this.setFinalButtonName(stageButton, participantsList, namesContainer, winnerIsDeterminated);
      this.setWinnerText(stageButton, namesContainer, crownMarkup);
    }
  }

  reloadButtonHandler() {
    event.preventDefault();
    const {stageButton, reloadButton} = this.stageInstance.getParamHandler();
    stageButton.removeEventListener(`click`, this.stageButtonHandler);
    this.stageInstance.removeTipHandler();
    this.stageInstance.deleteElement(document.querySelector(`.stage-4`));
    reloadButton.removeEventListener(`click`, this.reloadButtonHandler);
    this.stageInstance.deleteElement(reloadButton);
    document.getElementById(`participants-popup`).disabled = false;
  }

  //Support methods

  writeParticipantsResult(participantsList, pointsContainer) {
    if (this.LAUNCH_COUNT + 1 === this.LAUNCH_COUNT_LESS_THAN) {
      while(this.checkForSimilarPoints(participantsList)) {
        for (let i = 0; i < this.LAUNCH_COUNT_LESS_THAN; i++) {
          this.throwCube(participantsList, `finalPoints`, true, false);
        }
      }
      this.addFinalPoints(pointsContainer, participantsList);
    }
  }

  checkForSimilarPoints(participantsList) {
    for (let i = 0; i < participantsList.length; i++) {
      return participantsList[0].finalPoints === participantsList[participantsList.length - 1].finalPoints ? true : false;
    }
  }

  addFinalPoints(pointsContainer, participantsList) {
    for (let i = 0; i < pointsContainer.length; i++) {
      pointsContainer[i].textContent = participantsList[i].finalPoints;
    }
  }

  setFinalButtonName(stageButton, participantsList, namesContainer, winnerIsDeterminated) {
    if (this.LAUNCH_COUNT < this.LAUNCH_COUNT_LESS_THAN) {
      stageButton.textContent = `${this.LAUNCH_COUNT} бросок`;
    } else {
      this.highlightingStageWinner(participantsList, namesContainer, `finalPoints`);
      stageButton.textContent = winnerIsDeterminated;
      stageButton.disabled = true;
      stageButton.style.marginBottom = `10px`;
      this.stageInstance.renderReloadButton(this.reloadButtonHandler);
    }
  }

  setWinnerText(stageButton, namesContainer, crownMarkup) {
    if (stageButton.disabled) {
      namesContainer.forEach((nameContainer) => {
        const resultContainer = nameContainer.parentElement.nextElementSibling;
        if (this.rgbToHex(nameContainer.style.backgroundColor) === this.GREEN_COLOR) {
          resultContainer.textContent = `Winner`;
          this.setAnimationToWinner(resultContainer.textContent, resultContainer, crownMarkup);
        } else {
          resultContainer.textContent = `lOoSeeeR`;
        }
      });
    }
  }

  setAnimationToWinner(participantStatus, resultContainer, crownMarkup) {
    switch (participantStatus) {
      case `Winner`:
        resultContainer.style.position = `relative`;
        renderMarkup(resultContainer, crownMarkup, `beforeend`, true);
        break;
    }
  }

  addSecondParticipant(finalParticipantsList, secondParticipant) {
    this.stageInstance.pushParticipant(finalParticipantsList, secondParticipant);
  }
}
