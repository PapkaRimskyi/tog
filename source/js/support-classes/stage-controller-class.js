export default class StageController {
  constructor(participantsList) {
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
