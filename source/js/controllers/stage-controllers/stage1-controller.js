import StageController from '../../support-classes/stage-controller-class.js';
import Stage1 from '../../components/main-component/stage-1.js';
import Stage2Controller from './stage2-controller.js';
import { renderMarkup } from '../../utils.js';

export default class Stage1Controller extends StageController {
  constructor(participantsList) {
    super(participantsList, new Stage1(participantsList));

    this.stageButtonHandler = this.stageButtonHandler.bind(this);
  }

  renderStage() {
    renderMarkup(this.mainTag, this.stageInstance, `beforeend`);
    this.stageInstance.stageTipInteraction();
    this.stageInstance.stageButtonInteraction(this.stageButtonHandler);
  }

  stageButtonHandler(participantsList, button, launchCount, maxLaunchCount, cellNames, cellPoints) {
    if (button.textContent !== `Второй этап`) {
      this.stageInstance.throwCube(participantsList, `points`);
      for (let i = 0; i < cellNames.length; i++) {
        cellNames[i].textContent = participantsList[i].name;
        cellPoints[i].textContent = participantsList[i].points;
      }
      if (launchCount + 1 < maxLaunchCount) {
        button.textContent = `${launchCount + 1} бросок`;
      } else {
        button.textContent = `Второй этап`;
      }
    } else {
      this.stageInstance.deleteElement(document.querySelector(`.stage-1`));
      this.writeNextStageControllerInstance(new Stage2Controller(this.participantsList));
      this.nextStageControllerInstance.renderStage();
    }
  }
}
