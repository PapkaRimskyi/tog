import Header from '../../components/header-components/header.js';
import RulesPopup from '../../components/header-components/rules-popup.js';
import Music from '../../components/header-components/music-tab.js';
import ParticipantsPopup from '../../components/header-components/participants-popup.js';

import DateTime from '../../support-classes/date-time-class.js';

import { renderMarkup } from '../../utils.js';

export default class HeaderController {
  constructor(mainControlllerInstance) {
    //main html component
    this.headerComponent = new Header();
    //main controller instance
    this.mainControllerInstance = mainControlllerInstance;
    //popups component
    this.participantsPopup = new ParticipantsPopup();
    this.rulesPopup = new RulesPopup();
    this.music = new Music();
    //other values
    this.documentBody = document.body;
    this.header = null;

    this.timeData = {
      date: null,
      time: null,
    }
    //popup map collection
    this.popupCollection = null;
    //functions bind by this context
    this.headerHandler = this.headerHandler.bind(this);
    this.sendFormHandler = this.sendFormHandler.bind(this);
    this.inputHandler = this.inputHandler.bind(this);
    this.crossButtonHandler = this.crossButtonHandler.bind(this);
  }

  //Render

  render() {
    renderMarkup(this.documentBody, this.headerComponent, `afterbegin`);
    this.header = this.documentBody.querySelector(`.tog-header`);
    this.popupCollection = new Map([[`.rules-js`, this.rulesPopup], [`.audio-player`, this.music], [`.participants-js`, this.participantsPopup]]);
    this.headerComponent.headerDelegation(this.headerHandler);
    this._updateTime();
  }

  //Handler

  headerHandler(pressedTarget) {
    const classCollection = [...pressedTarget.classList];
    let currentTarget = null;
    for (let className of classCollection) {
      if (this.popupCollection.has(`.${className}`)) {
        currentTarget = this.popupCollection.get(`.${className}`);
        if (!document.querySelector(`.${currentTarget.getElement().className}`)) {
          if (currentTarget.closePopupByCrossButton) {
            this._closeAllPopup();
            renderMarkup(this.header, currentTarget, `beforeend`);
            currentTarget.closePopupByCrossButton(this.crossButtonHandler);
            if (currentTarget.submitForm) {
              currentTarget.inputValidation(this.inputHandler);
              currentTarget.submitForm(this.sendFormHandler);
            }
            this._setPopupCoord(`.${currentTarget.getElement().className}`);
          } else {
            renderMarkup(pressedTarget.parentNode, currentTarget, `beforeend`);
            this._setPopupCoord(`.${currentTarget.getElement().className}`, true);
          }
        } else {
          currentTarget.deleteElement();
        }
      }
    }
  }

  crossButtonHandler(context, handlerCollection) {
    context.deleteElement();
    if (context.sendParticipantsList) {
      this._removeFormHandlers(handlerCollection);
    }
  }

  sendFormHandler(list, handlerCollection) {
    this.mainControllerInstance.render(list);
    this.participantsPopup.deleteElement();
    this._removeFormHandlers(handlerCollection);
  }

  inputHandler(checkValidation) {
    if (checkValidation) {
      this.participantsPopup.setListPassedChecks(true);
    } else {
      this.participantsPopup.setListPassedChecks(false);
    }
  }

  //Support methods

  _setPopupCoord(popupClassName, withTop = false) {
    const element = document.querySelector(`${popupClassName}`);
    if (withTop) {
      element.style.top = `${-70}px`;
      element.style.left = `${(document.documentElement.clientWidth / 2) + 70}px`;
      return;
    }
    element.style.left = `${(document.documentElement.clientWidth - element.clientWidth) / 2}px`;
  }

  _closeAllPopup() {
    for (let popup of this.popupCollection.values()) {
      if (popup !== this.music) {
        popup.deleteElement();
      }
    }
  }

  _removeFormHandlers(handlerCollection) {
    for (let item of handlerCollection) {
      for (let handler of item.list) {
        switch (item.context.tagName) {
          case item.context.tagName === `INPUT`:
            item.context.removeEventListener(`input`, handler);
            break;
          case item.context.tagName === `FORM`:
            item.context.removeEventListener(`submit`, handler);
            break;
        }
      }
    }
  }

  _updateTime() {
    this.timeData.date = this.headerComponent.getElement().querySelector(`.time-and-data__info--date`);
    this.timeData.time = this.headerComponent.getElement().querySelector(`.time-and-data__info--time`);
    const dateTimeInstance = new DateTime();
    const UPDATE_TIME = 100;
    setInterval(() => {
      const data = new Date();
      if (dateTimeInstance.setTime([data.getHours(), data.getMinutes(), data.getSeconds()]) !== `00:00:00`) {
        this.timeData.time.textContent = dateTimeInstance.setTime([data.getHours(), data.getMinutes(), data.getSeconds()]);
        this.timeData.time.setAttribute(`dateTime`, dateTimeInstance.setTime([data.getHours(), data.getMinutes(), data.getSeconds()]));
      } else {
        this.timeData.date = dateTimeInstance.setDate([data.getDate(), data.getDay(), data.getFullYear()]);
        this.timeData.date.setAttribute(`dateTime`, dateTimeInstance.setDate([data.getHours(), data.getMinutes(), data.getSeconds()]).split(`.`).reverse().join(`-`));
        this.timeData.time.textContent = dateTimeInstance.setTime([data.getHours(), data.getMinutes(), data.getSeconds()]);
        this.timeData.time.setAttribute(`dateTime`, dateTimeInstance.setTime([data.getHours(), data.getMinutes(), data.getSeconds()]));
      }
    }, UPDATE_TIME)
  }
}
