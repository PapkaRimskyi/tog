import Stage1 from '../../components/main-component/stage-1.js';
import TipInfo from '../../models/tip-models.js';

import { renderMarkup } from '../../utils.js';

export default class MainController {
  constructor() {
    this.mainTag = document.querySelector(`.tog-main`);

    this.stage1 = null;
    this.tipInfo = new TipInfo();

    this.stageTip = null;

    this.stageTipHoverHandler = this.stageTipHoverHandler.bind(this);
    this.stageTipHoverOutHandler = this.stageTipHoverOutHandler.bind(this);
  }

  render(participantsList) {
    this.stage1 = new Stage1(participantsList);
    renderMarkup(this.mainTag, this.stage1, `beforeend`);
    this.stageTip = this.stage1.getElement().querySelector(`.stage-tip`);
    this.stage1.stageTipInteraction(this.stageTipHoverHandler, this.stageTipHoverOutHandler);
  }

  stageTipHoverHandler(evt) {
    let stageContainer = evt.target;
    let stageLvlTip = null;
    while (!stageContainer.classList.contains(`stage-1`)) {
      stageContainer = stageContainer.parentElement;
    }
    for (let elemClass of stageContainer.classList) {
      for (let key of this.tipInfo.tipCollection.keys()) {
        if (elemClass === key) {
          stageLvlTip = this.tipInfo.getTipForStage(elemClass);
          break;
        }
      }
    }
    this.appendTipInfo(stageLvlTip);
  }

  appendTipInfo(stageLvlTip) {
    const paragraphMarkup = document.createElement(`p`);
    paragraphMarkup.setAttribute(`class`, `tip-block`);
    paragraphMarkup.textContent = stageLvlTip;
    this.stageTip.append(paragraphMarkup);
  }

  stageTipHoverOutHandler() {
    for (let child of this.stageTip.children) {
      child.remove();
    }
    this.stageTip.removeEventListener(`mouseover`, this.stageTipHoverHandler);
    this.stageTip.removeEventListener(`mouseout`, this.stageTipHoverOutHandler);
  }
}
