export default class StageController {
  constructor(participantsList, stage = null) {
    this.mainTag = document.querySelector(`.tog-main`);

    this.participantsList = participantsList;
    this.stageInstance = stage;
    this.nextStageControllerInstance = null;
  }

  writeNextStageControllerInstance(nextStageControllerInstance) {
    this.nextStageControllerInstance = nextStageControllerInstance;
  }

  writeStageInstance(stage) {
    this.stageInstance = stage;
  }

  modifiedParticipantList(min, max) {
    this.participantsList = this.participantsList.slice(min, max);
  }
}
