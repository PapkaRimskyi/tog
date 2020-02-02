import Stage2 from '../../components/main-component/stage-2.js';
import { renderMarkup } from '../../utils.js';

export default class Stage2Controller {
  constructor(participantsList) {
    this.mainTag = document.querySelector(`.tog-main`);
    this.COUNT_OF_PARTICIPANTS_QUARTER_FINAL = 4;
    this.participantsList = participantsList.slice(0, this.COUNT_OF_PARTICIPANTS_QUARTER_FINAL);
    this.stage2Instance = new Stage2(this.participantsList);
  }

  renderStage() {
    renderMarkup(this.mainTag, this.stage2Instance, `beforeend`);
    this.stage2Instance.renderParticipant();
    this.stage2Instance.stageTipInteraction();
  }
}
