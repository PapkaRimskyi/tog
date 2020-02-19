import StageTip from './stage-tip.js';

export default class Stage extends StageTip {
  constructor(participantsList) {
    super();

    this.participantsList = participantsList;

    this.participantsInfoContainer = null;
    this.stageTip = this.getElement().querySelector(`.stage-tip`);
    this.stageButton = this.getElement().querySelector(`.stage__button`);
    this.participantContainer = this.getElement().querySelector(`.one-v-one`);

    this.stageTipInteraction = this.stageTipInteraction.bind(this);
  }

  renderParticipant() {
    throw new Error(`Need to rewrite under stage level. Can't be used by Stage`);
  }

  stageButtonInteraction() {
    throw new Error(`Need to rewrite under stage level. Can't be used by Stage`);
  }
}
