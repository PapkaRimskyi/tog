import Stage1 from '../../components/main-component/stage-1.js';
import Stage2Controller from './stage2-controller.js';
import { renderMarkup } from '../../utils.js';

export default class Stage1Controller {
  constructor(participantsList) {
    this.mainTag = document.querySelector(`.tog-main`);
    this.stage1Instance = new Stage1(participantsList);
    this.stage2Controller = null;

    this.stage1ButtonHandler = this.stage1ButtonHandler.bind(this);
  }

  renderStage() {
    renderMarkup(this.mainTag, this.stage1Instance, `beforeend`);
    this.stage1Instance.stageTipInteraction();
    this.stage1Instance.stage1ButtonInteraction(this.stage1ButtonHandler);
  }

  stage1ButtonHandler(participantsList, button, launchCount, maxLaunchCount, cellNames, cellPoints) {
    if (button.textContent !== `Второй этап`) {
      this.stage1Instance.throwCube(participantsList);
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
      this.stage1Instance.deleteElement(document.querySelector(`.stage-1`));
      this.stage2Controller = new Stage2Controller(participantsList);
      this.stage2Controller.renderStage();
    }
  }
}
