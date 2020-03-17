import TipInfo from '../models/tip-models.js';
import ParticipantsListMethods from './participants-list-methods.js';

export default class StageTip extends ParticipantsListMethods {
  constructor() {
    super();
    this.tipInfoInstance = new TipInfo();
  }

  stageTipInteraction() {
    this.getElement().querySelector(`.stage-tip`).addEventListener(`click`, (evt) => {
      evt.preventDefault();
      this.stageTipHoverHandler();
    });
  }

  stageTipHoverHandler() {
    if (!this.getElement().querySelector(`.stage-tip`).children.length) {
      let stageLvlTip = null;
      let stageContainer = this.determineStageLvl();
      for (let elemClass of stageContainer.classList) {
        for (let key of this.tipInfoInstance.getTipCollection().keys()) {
          if (elemClass === key) {
            stageLvlTip = this.tipInfoInstance.getTipForStage(elemClass);
            break;
          }
        }
      }
      this.appendTipInfo(stageLvlTip);
    } else {
      Array.from(this.getElement().querySelector(`.stage-tip`).children).forEach((child) => child.remove());
    }
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

  determineStageLvl() {
    let stageContainer = event.target;
    while(this.hasStageClass(stageContainer)) {
      stageContainer = stageContainer.parentElement;
    }
    return stageContainer;
  }
}
