import ParticipantsListMethods from './participants-list-methods.js';

export default class StageController extends ParticipantsListMethods {
  constructor(participantsList) {
    super();
    this.mainTag = document.querySelector(`.tog-main`);

    this.stageModel = participantsList;
    this.stageInstance = null;
    this.nextStageControllerInstance = null;
  }

  setNextStageControllerInstance(nextStageControllerInstance) {
    this.nextStageControllerInstance = nextStageControllerInstance;
  }

  setStageInstance(stage) {
    this.stageInstance = stage;
  }

  modifiedParticipantList(min, max) {
    this.stageModel.cropParticipantsList(min, max);
  }
}
