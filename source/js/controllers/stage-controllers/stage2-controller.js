import Stage2 from '../../components/main-component/stage-2.js';
import Stage3Controller from './stage3-controller.js';
import { renderMarkup } from '../../utils.js';

const buttonStatus = {
  multiple: `Мультимножитель!`,
  nextParticipants: `Следующие участники!`,
  nextStage: `Следующий этап!`,
}

export default class Stage2Controller {
  constructor(participantsList) {
    this.stage3Controller = null;

    this.mainTag = document.querySelector(`.tog-main`);

    this.COUNT_OF_PARTICIPANTS_QUARTER_FINAL = 4;
    this.MIN_MULTIPLE = 1;
    this.MAX_MULTIPLE = 3;

    this.participantsList = participantsList.slice(0, this.COUNT_OF_PARTICIPANTS_QUARTER_FINAL);
    this.stage2Instance = new Stage2(this.participantsList);

    this.stageButtonHandler = this.stageButtonHandler.bind(this);
  }

  renderStage() {
    renderMarkup(this.mainTag, this.stage2Instance, `beforeend`);
    this.stage2Instance.renderParticipant();
    this.stage2Instance.stageTipInteraction();
    this.stage2Instance.stageButtonInteraction(this.stageButtonHandler);
  }

  getMultiple(participantsList, nameContainers, participantsCompleted, stageButton) {
    for (let name of nameContainers) {
      const resultContainer = name.parentElement.nextElementSibling;
      for (let participant of participantsList) {
        if (name.textContent === participant.name) {
          participant.multiple = this.randomMultiple();
          resultContainer.textContent = `${participant.points} * ${participant.multiple} = ${participant.points * participant.multiple}`;
          participant.points = participant.points * participant.multiple;
        }
      }
    }
    this.stage2Instance.setMultipleStatus(false);
    this.isAllParticipantsCounted(participantsCompleted, participantsList, stageButton);
  }

  renderNextParticipant(participantContainer, stageButton) {
    this.deletePreviousParticipants(participantContainer);
    this.stage2Instance.renderParticipant();
    this.stage2Instance.setMultipleStatus(true);
    stageButton.textContent = buttonStatus.multiple;
  }

  stageButtonHandler(participantsList, nameContainers, participantsCompleted, participantNumber, participantsContainer, stageButton, multipleStatus) {
    if (stageButton.textContent !== buttonStatus.nextStage) {
      if (multipleStatus) {
        this.getMultiple(participantsList, nameContainers, participantsCompleted, stageButton);
      } else {
        if (participantNumber !== participantsList.length) {
          this.renderNextParticipant(participantsContainer, stageButton);
        }
      }
    } else {
      this.stage2Instance.deleteElement(document.querySelector(`.stage-2`));
      this.stage2Instance.sortParticipantsList(participantsList);
      const participants = {
        finalStage: participantsList.slice(0, 1),
        semifinalStage: participantsList.slice(1, 3),
      }
      this.stage3Controller = new Stage3Controller(participants);
      this.stage3Controller.renderStage();
    }
  }

  deletePreviousParticipants(participantContainer) {
    Array.from(participantContainer.children).forEach((participant) => participant.remove());
  }

  randomMultiple() {
    return Math.floor(this.MIN_MULTIPLE + Math.random() * (this.MAX_MULTIPLE + 1 - this.MIN_MULTIPLE));
  }


  isAllParticipantsCounted(participantCount, participantsList, button) {
    if (participantCount === participantsList.length) {
      button.textContent = buttonStatus.nextStage;
    } else {
      button.textContent = buttonStatus.nextParticipants;
    }
  }
}
