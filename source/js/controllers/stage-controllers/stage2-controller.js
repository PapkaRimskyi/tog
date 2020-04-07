import StageController from '../../support-classes/stage-controller-class.js';
import StageModel from '../../models/stage-model.js';
import Stage2 from '../../components/main-component/stage-2.js';
import Stage3Controller from './stage3-controller.js';
import { renderMarkup } from '../../utils.js';

export default class Stage2Controller extends StageController {
  constructor(participantsList) {
    super(new StageModel(participantsList));
    this.MIN_MULTIPLE = 1;
    this.MAX_MULTIPLE = 3;
    this.setStageInstance(new Stage2(this.stageModel.getParticipantsList()));

    this.stageButtonHandler = this.stageButtonHandler.bind(this);
  }

  //Render

  renderStage() {
    renderMarkup(this.mainTag, this.stageInstance, `beforeend`);
    this.stageInstance.renderParticipant(this.stageModel.getParticipantsList());
    this.stageInstance.stageTipInteraction();
    this.stageInstance.stageButtonInteraction(this.stageButtonHandler);
  }

  renderNextParticipant(participantContainer, stageButton, multipleStatus) {
    this.deletePreviousParticipants(participantContainer);
    this.stageInstance.renderParticipant(this.stageModel.getParticipantsList());
    stageButton.textContent = multipleStatus;
  }

  //Handler

  stageButtonHandler() {
    event.preventDefault();
    const {stageButton, stageButtonStatus, multipleStatus, nameContainers, participantsIndex, completedParticipant, participantsContainer} = this.stageInstance.getParamHandler();
    const participantsList = this.stageModel.getParticipantsList();
    if (stageButton.textContent !== stageButtonStatus.nextStage) {
      this.checkStageButtonStatus(multipleStatus, participantsList, nameContainers, completedParticipant, stageButton, stageButtonStatus, participantsIndex, participantsContainer);
    } else {
      stageButton.removeEventListener(`click`, this.stageButtonHandler);
      this.stageInstance.removeTipHandler();
      this.stageInstance.deleteElement(document.querySelector(`.stage-2`));
      this.setNextStageControllerInstance(new Stage3Controller(this.distributeParticipantsToStages(participantsList)));
      this.nextStageControllerInstance.renderStage();
    }
  }

  //Support methods

  checkStageButtonStatus(multipleStatus, participantsList, nameContainers, completedParticipant, stageButton, stageButtonStatus, participantsIndex, participantsContainer) {
    if (multipleStatus) {
      this.writeParticipantsResult(participantsList, nameContainers);
      this.stageInstance.setMultipleStatus(false);
      this.isAllParticipantsCounted(completedParticipant, participantsList, stageButton, stageButtonStatus);
      this.highlightingStageWinner(participantsList, nameContainers, `points`);
    } else {
      if (participantsIndex !== participantsList.length) {
        this.renderNextParticipant(participantsContainer, stageButton, stageButtonStatus.multiple);
        this.stageInstance.setMultipleStatus(true);
      }
    }
  }

  writeParticipantsResult(participantsList, nameContainers) {
    do {
      this.getMultiple(participantsList, nameContainers);
    } while (this.checkForSimilarPoints(participantsList, nameContainers));
    nameContainers.forEach((name) => {
      const resultContainer = name.parentElement.nextElementSibling;
      participantsList.forEach((participant) => {
        if (name.textContent === participant.name) {
          resultContainer.textContent = `${participant.points} * ${participant.multiple} = ${participant.points * participant.multiple}`;
          participant.points = participant.points * participant.multiple;
        }
      })
    })
  }

  getMultiple(participantsList, nameContainers) {
    nameContainers.forEach((name) => {
      participantsList.forEach((participant) => name.textContent === participant.name ? participant.multiple = this.randomNumber(this.MIN_MULTIPLE, this.MAX_MULTIPLE) : false);
    });
  }

  checkForSimilarPoints(participantsList, nameContainers) {
    const participantCouple = [];
    nameContainers.forEach((name) => {
      participantsList.forEach((participant) => {
        if (name.textContent === participant.name) {
          participantCouple.push(participant);
        }
      });
    });
    return participantCouple[0].points * participantCouple[0].multiple === participantCouple[participantCouple.length - 1].points * participantCouple[participantCouple.length - 1].multiple ? true : false;
  }

  isAllParticipantsCounted(completedParticipant, participantsList, button, buttonStatus) {
    if (completedParticipant === participantsList.length) {
      button.textContent = buttonStatus.nextStage;
    } else {
      button.textContent = buttonStatus.nextParticipants;
    }
  }

  distributeParticipantsToStages(participantsList) {
    this.sortParticipantsList(participantsList);
    return {
      finalStage: participantsList.slice(0, 1),
      semifinalStage: participantsList.slice(1, 3),
    }
  }

  deletePreviousParticipants(participantContainer) {
    Array.from(participantContainer.children).forEach((participant) => participant.remove());
  }
}
