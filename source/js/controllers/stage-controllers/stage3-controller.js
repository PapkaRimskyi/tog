import StageController from '../../support-classes/stage-controller-class.js';
import Stage3 from '../../components/main-component/stage-3.js';
import Stage4Controller from '../stage-controllers/stage4-controller.js';
import { renderMarkup } from '../../utils.js';

export default class Stage3Controller extends StageController {
  constructor(participantsList) {
    super(participantsList, new Stage3(participantsList.semifinalStage));

    this.writeNextStageControllerInstance(new Stage4Controller(this.participantsList.finalStage));

    this.stageButtonHandler = this.stageButtonHandler.bind(this);
  }

  //Render

  renderStage() {
    renderMarkup(this.mainTag, this.stageInstance, `beforeend`);
    this.stageInstance.renderParticipant();
    this.stageInstance.stageTipInteraction();
    this.stageInstance.stageButtonInteraction(this.stageButtonHandler);
  }

  //Handler

  stageButtonHandler(participantsList, nameContainers, button) {
    if (button.textContent !== 'К финалу!') {
      this.randomValues(participantsList, nameContainers);
      button.textContent = `К финалу!`;
      this.stageInstance.sortParticipantsList(this.participantsList.semifinalStage, `points`);
      this.stageInstance.highlightingStageWinner(participantsList, nameContainers, `points`);
    } else {
      this.stageInstance.deleteElement(document.querySelector(`.stage-3`));
      this.nextStageControllerInstance.addSecondParticipant(this.participantsList.semifinalStage[0]);
      this.nextStageControllerInstance.renderStage();
    }
  }

  //Support methods

  randomValues(participantsList, nameContainers) {
    for (let name of nameContainers) {
      const resultContainer = name.parentElement.nextElementSibling;
      for (let participant of participantsList) {
        if (name.textContent === participant.name) {
          this.setRandomValues(participant, resultContainer);
        }
      }
    }
  }

  setRandomValues(participant, resultContainer) {
    participant.sign = this.getRandomSign(1, 10);
    participant.randomNumber = this.getRandomNumber(0, 100, participant);
    resultContainer.textContent = `${participant.points} ${participant.sign} ${participant.randomNumber} = ${this.calculateResult(participant)}`;
    participant.points = this.calculateResult(participant);
  }

  getRandomSign(minValue, maxValue) {
    if (this.randomNumber(minValue, maxValue) % 2 === 0) {
      return `+`;
    }
    return `-`;
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

  randomNumber(min, max) {
    return Math.floor(min + Math.random() * (max + 1 - min));
  }
}
