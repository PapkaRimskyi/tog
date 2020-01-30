import Stage1 from '../../components/main-component/stage-1.js';
import StageTip from '../../support-classes/stage-tip.js';
import { renderMarkup } from '../../utils.js';

export default class Stage1Controller extends StageTip {
  constructor(participantsList) {
    super();
    this.mainTag = document.querySelector(`.tog-main`);
    this.stage1Instance = new Stage1(participantsList);
    this.stageTip = null;

    this.stageTipHoverHandler = this.stageTipHoverHandler.bind(this);
    this.stageTipHoverOutHandler = this.stageTipHoverOutHandler.bind(this);
    this.stage1ButtonHandler = this.stage1ButtonHandler.bind(this);
  }

  renderStage() {
    renderMarkup(this.mainTag, this.stage1Instance, `beforeend`);
    this.stageTip = this.stage1Instance.getElement().querySelector(`.stage-tip`);
    this.stage1Instance.stageTipInteraction(this.stageTipHoverHandler, this.stageTipHoverOutHandler);
    this.stage1Instance.stage1ButtonInteraction(this.stage1ButtonHandler);
  }

  stage1ButtonHandler(participantsList, button) {
    this.stage1Instance.throwCube(participantsList);
    const launchVariables = this.stage1Instance.getLaunchAndMaxLaunchCount();
    for (let i = 0; i < this.stage1Instance.cellNames.length; i++) {
      this.stage1Instance.getCellCollection(`cellNames`)[i].textContent = participantsList[i].name;
      this.stage1Instance.getCellCollection(`cellPoints`)[i].textContent = participantsList[i].points;
    }
    if (launchVariables.launchCount !== launchVariables.maxLaunchCount) {
      button.textContent = `${launchVariables.launchCount + 1} бросок`;
    } else {
      button.textContent = `Второй этап`;
    }
  }
}
