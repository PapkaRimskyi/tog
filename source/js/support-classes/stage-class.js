import StageTIp from './stage-tip.js';

export default class Stage extends StageTIp {
  constructor(participantsList) {
    super();

    this.participantsList = participantsList;

    this.stageTip = this.getElement().querySelector(`.stage-tip`);
    this.stageButton = this.getElement().querySelector(`.stage__button`);

    this.stageTipInteraction = this.stageTipInteraction.bind(this);
  }

  stageButtonInteraction() {
    throw new Error(`Need to rewrite under stage level. Can't be used by Stage`);
  }
}
