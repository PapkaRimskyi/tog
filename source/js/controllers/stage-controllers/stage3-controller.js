import Stage3 from '../../components/main-component/stage-3.js';
// import Stage4 from '../../components/main-component/stage-4.js';
import { renderMarkup } from '../../utils.js';

export default class Stage3Controller {
  constructor(participantsList) {
    this.participantsList = participantsList;
    this.stage3Instance = new Stage3(participantsList.semifinalStage);
    // this.stage4Instance = new Stage4(participantsList.finalStage);

    this.mainTag = document.querySelector(`.tog-main`);

    this.stageButtonHandler = this.stageButtonHandler.bind(this);
  }

  renderStage() {
    renderMarkup(this.mainTag, this.stage3Instance, `beforeend`);
    this.stage3Instance.renderParticipant();
    this.stage3Instance.stageTipInteraction();
    this.stage3Instance.stageButtonInteraction(this.stageButtonHandler);
  }

  stageButtonHandler(participantsList, nameContainers, button) {
    if (button.textContent !== 'К финалу!') {
      this.randomValues(participantsList, nameContainers);
      button.textContent = `К финалу!`;
    }
  }

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
