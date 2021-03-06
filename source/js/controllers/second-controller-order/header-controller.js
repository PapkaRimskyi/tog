import HeaderMarkup from '../../markup/header-markup.js';

import Header from '../../components/header-components/header.js';
import RulesPopup from '../../components/header-components/rules-popup.js';
import Music from '../../components/header-components/music-tab.js';
import DeveloperPopup from '../../components/header-components/developer-popup.js';
import ParticipantsPopup from '../../components/header-components/participants-popup.js';

import DateTime from '../../support-classes/date-time-class.js';

import { renderMarkup } from '../../utils.js';

export default class HeaderController {
  constructor(mainControlllerInstance) {
    this.mainControllerInstance = mainControlllerInstance;

    this.headerMarkupInstance = new HeaderMarkup();

    this.headerComponent = new Header(this.headerMarkupInstance.getHeaderMarkup());

    this.rulesPopup = new RulesPopup(this.headerMarkupInstance.getRulesPopupMarkup());
    this.music = new Music(this.headerMarkupInstance.getMusicMarkup());
    this.developerPopup = null;
    this.participantsPopup = new ParticipantsPopup(this.headerMarkupInstance.getParticipantsPopupMarkup());

    this.documentBody = document.body;
    this.header = null;

    this.timeData = {
      date: null,
      time: null,
    }

    this.githubUrl = `https://api.github.com/users/papkarimskyi`;

    //popup map collection
    this.popupCollection = null;

    this.headerHandler = this.headerHandler.bind(this);
  }

  //Render

  render() {
    renderMarkup(this.documentBody, this.headerComponent, `afterbegin`);
    this.header = this.documentBody.querySelector(`.tog-header`);
    this.popupCollection = new Map([[`rules-popup`, this.rulesPopup], [`audio-popup`, this.music], [`developer-popup`, this.developerPopup], [`participants-popup`, this.participantsPopup]]);
    this.headerComponent.headerDelegation(this.headerHandler);
    this.updateTime();
  }

  //Handler

  async headerHandler(elem) {
    for (let popup of this.popupCollection.keys()) {
      if (popup === elem.id) {
        await this.isClickedOnDevPopup(popup);
        const popupClass = this.popupCollection.get(`${popup}`);
        if (!this.header.querySelector(`.${popupClass.getElement().className}`)) {
          this.closeOtherPopup(popupClass);
          renderMarkup(this.header, popupClass, `beforeend`);
          this.setCrossButtonHandler(popupClass);
          this.setFormHandler(popupClass, elem);
        } else {
          this.crossButtonHandler.call(popupClass, this.removeFormHandlers.bind(this));
        }
      }
    }
  }

  setCrossButtonHandler(popup) {
    if (popup.closePopupByCrossButton) {
      popup.closePopupByCrossButton(this.crossButtonHandler.bind(popup, this.removeFormHandlers.bind(popup)));
    }
  }

  crossButtonHandler(removeFormHandlers) {
    event.preventDefault();
    if (this.closePopupByCrossButton) {
      this.getElement().querySelector(`.popup-close`).removeEventListener(`click`, this.getCrossHandler());
      removeFormHandlers();
    }
    this.deleteElement();
  }

  setFormHandler(popup, button) {
    if (popup.inputValidation && popup.submitForm) {
      popup.inputValidation(this.participantsInputHandler.bind(popup));
      popup.submitForm(this.sendButtonHandler.bind(popup, this.mainControllerInstance, this.removeFormHandlers.bind(popup), button));
    }
  }

  removeFormHandlers() {
    if (this.inputValidation && this.submitForm) {
      for (let elem of this.getHandlerCollection()) {
        elem.context.removeEventListener(`${elem.event}`, ...elem.list);
      }
    }
  }

  participantsInputHandler() {
    this.setListPassedChecks(this.checkValidation());
  }

  sendButtonHandler(mainControllerInstance, removeFormHandler, button) {
    event.preventDefault();
    if (this.getListPassedChecks()) {
      mainControllerInstance.render(this.getParticipantsList(this.getGamesNamesList()));
      removeFormHandler();
      button.disabled = true;
      this.deleteElement();
      this.input.value = ``;
      this.getHandlerCollection().forEach((context) => delete context.list);
    }
  }

  //Support methods

  closeOtherPopup(popupInstance) {
    if (popupInstance !== this.music) {
      for (let popup of this.popupCollection.values()) {
        if (popup !== this.music && popup) {
          if (this.header.querySelector(`.${popup.getElement().className}`)) {
            popup.getElement().querySelector(`.popup-close`).removeEventListener(`click`, popup.getCrossHandler());
            popup.deleteElement();
          }
        }
      }
    }
  }

  async isClickedOnDevPopup(button) {
    switch (button) {
      case `developer-popup`:
        if (!document.querySelector(`.${button}`)) {
          this.developerPopup = await fetch(this.githubUrl)
            .then((serverRespond) => serverRespond.json())
            .then((developerData) => new DeveloperPopup(this.headerMarkupInstance.getAboutDeveloperPopup(developerData)))
            .catch((err) => alert(`Произошла ошибка при запросе данных. ${err}`));
          this.popupCollection.set(`${button}`, this.developerPopup);
        }
        break;
      default:
        break;
    }
  }

  updateTime() {
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
