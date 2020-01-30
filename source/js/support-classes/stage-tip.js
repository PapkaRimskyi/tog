import TipInfo from '../models/tip-models.js';

export default class StageTip {
  constructor() {
    this.tipInfoInstance = new TipInfo();
  }

  stageTipHoverHandler(evt) {
    let stageLvlTip = null;
    let stageContainer = this.determineStageLvl(evt);
    for (let elemClass of stageContainer.classList) {
      for (let key of this.tipInfoInstance.getTipCollection().keys()) {
        if (elemClass === key) {
          stageLvlTip = this.tipInfoInstance.getTipForStage(elemClass);
          break;
        }
      }
    }
    this.appendTipInfo(stageLvlTip);
  }

  stageTipHoverOutHandler() {
    for (let child of this.stageTip.children) {
      child.remove();
    }
    this.stageTip.removeEventListener(`mouseover`, this.stageTipHoverHandler);
    this.stageTip.removeEventListener(`mouseout`, this.stageTipHoverOutHandler);
  }

  appendTipInfo(stageLvlTip) {
    const paragraphMarkup = document.createElement(`p`);
    paragraphMarkup.setAttribute(`class`, `tip-block`);
    paragraphMarkup.textContent = stageLvlTip;
    this.stageTip.append(paragraphMarkup);
  }

  hasStageClass(stageContainer) {
    let status = true;
    for (let lvlName of this.tipInfoInstance.getStageLvlList()) {
      for (let className of stageContainer.classList) {
        if (lvlName === className) {
          status = false;
          return status;
        }
      }
    }
    return status;
  }

  determineStageLvl(evt) {
    let stageContainer = evt.target;
    while(this.hasStageClass(stageContainer)) {
      stageContainer = stageContainer.parentElement;
    }
    return stageContainer;
  }
}
