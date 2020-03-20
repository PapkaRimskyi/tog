import StageController from '../../support-classes/stage-controller-class.js';
import StageModel from '../../models/stage-model.js';
import Stage3 from '../../components/main-component/stage-3.js';
import Stage4Controller from '../stage-controllers/stage4-controller.js';
import { renderMarkup } from '../../utils.js';

export default class Stage3Controller extends StageController {
  constructor(participantsList) {
    super(new StageModel(participantsList));

    this.setStageInstance(new Stage3(this.stageModel.getSemifinalParticipants()));

    this.setNextStageControllerInstance(new Stage4Controller(this.stageModel.getFinalParticipants()));

    this.stageButtonHandler = this.stageButtonHandler.bind(this);
  }

  //Render

  renderStage() {
    renderMarkup(this.mainTag, this.stageInstance, `beforeend`);
    this.stageInstance.renderParticipant(this.stageModel.getSemifinalParticipants());
    this.stageInstance.stageTipInteraction();
    this.stageInstance.stageButtonInteraction(this.stageButtonHandler);
  }

  //Handler

  stageButtonHandler() {
    event.preventDefault();
    const {stageButton, nameContainers, finalStatus} = this.stageInstance.getParamHandler();
    const participantsList = this.stageModel.getSemifinalParticipants();
    if (stageButton.textContent !== finalStatus) {
      this.randomValues(participantsList, nameContainers);
      stageButton.textContent = finalStatus;
      this.sortParticipantsList(participantsList, `points`);
      this.highlightingStageWinner(participantsList, nameContainers, `points`);
    } else {
      stageButton.removeEventListener(`click`, this.stageButtonHandler);
      this.stageInstance.removeTipHandler();
      this.stageInstance.deleteElement(document.querySelector(`.stage-3`));
      this.nextStageControllerInstance.addSecondParticipant(this.stageModel.getFinalParticipants(), participantsList[0]);
      this.nextStageControllerInstance.renderStage();
    }
  }

  //Support methods

  randomValues(participantsList, nameContainers) {
    for (let name of nameContainers) {
      const resultContainer = name.parentElement.nextElementSibling;
      participantsList.forEach((participant) => {
        if (name.textContent === participant.name) {
          this.setRandomValues(participant, resultContainer);
        }
      });
    }
  }

  setRandomValues(participant, resultContainer) {
    participant.sign = this.getRandomSign(1, 10);
    participant.randomNumber = this.getRandomNumber(0, 100, participant);
    resultContainer.textContent = `${participant.points} ${participant.sign} ${participant.randomNumber} = ${this.calculateResult(participant)}`;
    participant.points = this.calculateResult(participant);
  }

  getRandomNumber(min, max, participant) {
    if (participant.sign === `-`) {
      return this.randomNumber(min, participant.points);
    }
    return this.randomNumber(min, max);
  }

  calculateResult(participant) {
    if (participant.sign === `-`) {
      return participant.points - participant.randomNumber;
    }
    return participant.points + participant.randomNumber;
  }
}
