import StageController from '../../support-classes/stage-controller-class.js';
import Stage4 from '../../components/main-component/stage-4.js';

import { renderMarkup } from '../../utils.js';

export default class Stage4Controller extends StageController {
  constructor(participantsList) {
    super(participantsList, new Stage4(participantsList));

    this.stageButtonHandler = this.stageButtonHandler.bind(this);
  }

  renderStage() {
    renderMarkup(this.mainTag, this.stageInstance, `beforeend`);
    this.stageInstance.renderParticipant();
    this.stageInstance.stageTipInteraction();
    this.stageInstance.stageButtonInteraction(this.stageButtonHandler);
  }

  addSecondParticipant(secondParticipant) {
    this.stageInstance.pushParticipant(secondParticipant);
  }

  stageButtonHandler(participantsList, button, launchCount, maxLaunchCount, pointsContainer) {
    if (button.textContent !== `У нас есть победитель!`) {
      this.stageInstance.throwCube(participantsList, `finalPoints`);
      for (let i = 0; i < pointsContainer.length; i++) {
        pointsContainer[i].textContent = participantsList[i].finalPoints;
      }
      if (launchCount + 1 < maxLaunchCount) {
        button.textContent = `${launchCount + 1} бросок`;
      } else {
        button.textContent = `У нас есть победитель!`;
        button.disabled = true;
      }
    }
  }
}
