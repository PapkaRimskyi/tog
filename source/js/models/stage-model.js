export default class StageModel {
  constructor(participantsList) {
    this.participantsList = participantsList;
  }

  getParticipantsList() {
    return this.participantsList;
  }

  cropParticipantsList(min, max) {
    this.participantsList = this.participantsList.slice(min, max);
  }

  getSemifinalParticipants() {
    return this.participantsList.semifinalStage;
  }

  getFinalParticipants() {
    return this.participantsList.finalStage;
  }
}
