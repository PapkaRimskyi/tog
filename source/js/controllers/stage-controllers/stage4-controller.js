import StageController from '../../support-classes/stage-controller-class.js';
import Stage4 from '../../components/main-component/stage-4.js';

import { renderMarkup } from '../../utils.js';

export default class Stage4Controller extends StageController {
  constructor(participantsList) {
    super(participantsList, new Stage4(participantsList));

    // this.stageButtonHandler = this.stageButtonHandler.bind(this);
  }

  renderStage() {
    renderMarkup(this.mainTag, this.stageInstance, `beforeend`);
    this.stageInstance.renderParticipant();
    this.stageInstance.stageTipInteraction();
  }

  addSecondParticipant(secondParticipant) {
    this.stageInstance.pushParticipant(secondParticipant);
  }
}
