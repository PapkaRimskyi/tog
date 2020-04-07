import DateTime from '../support-classes/date-time-class.js';

import '../../img/agutin-button.png';
import '../../img/agutin-gif.gif';

export default class HeaderMarkup {
  //Markup
  getHeaderMarkup() {
    const timeData = this.createDateTime();
    return `<header class="tog-header">
    <h1 class="tog-header__title">Tournament of Games</h1>
    <div class="tog-header__container">
      <section class="time-and-data">
        <h2 class="visually-hidden">Дата и время</h2>
        <p class="time-and-data__info">
          <time class="time-and-data__info time-and-data__info--date" datetime="${timeData.dateTimeAttrValue}">${timeData.date}</time>|<time class="time-and-data__info time-and-data__info--time" dateTime="${timeData.time}">${timeData.time}</time>
        </p>
      </section>
      <nav class="header-nav">
        <ul class="header-nav__list">
          <li class="header-nav__item">
            <button class="header-nav__link rules" id="rules-popup">Правила</button>
          </li>
          <li class="header-nav__item">
            <button class="header-nav__link audio-player" id="audio-popup">Плеер</button>
          </li>
          <li class="header-nav__item">
            <button class="header-nav__link">Гороскоп</button>
          </li>
          <li class="header-nav__item">
            <button class="header-nav__link participants" id="participants-popup">Вписать участников</button>
          </li>
        </ul>
      </nav>
    </div>
  </header>
    `;
  }

  getMusicMarkup() {
    return `<section class="music">
    <h2 class="visually-hidden">Раздел с музыкой</h2>
    <audio class="music__audio" src="assets/music/fort-boyard.mp3" controls></audio>
  </section>
    `;
  }

  getParticipantsPopupMarkup() {
    return `<section class="enter-participants-popup">
    <h2 class="visually-hidden">Окно для добавления участников</h2>
    <div class="enter-participants-popup__container">
      <a class="popup-close participants-close" href="#">
        <svg class="popup-close__svg" xmlns="http://www.w3.org/2000/svg" width="34.31" height="38.25" viewBox="0 0 35 39" fill="none" stroke="#242424" stroke-width="2">
          <path d="M.99 35.94L31.77 1.02m-29.24 0L33.3 35.94"/>
        </svg>
      </a>
      <h2 class="enter-participants-popup__headline">Хотите вписать участников турнира?</h2>
      <form class="enter-participants-popup__form" action="localhost:8081" method="post" enctype="multipart/form-data">
        <input class="enter-participants-popup__participants-list" type="text" name="games" placeholder="Список игр">
        <button class="enter-participants-popup__send-participants-list" type="submit">Отправить!</button>
      </form>
    </div>
    </section>
    `;
  }

  getRulesPopupMarkup() {
    return `<section class="rules-popup">
    <h2 class="visually-hidden">Окно со списком правил</h2>
    <div class="rules-popup__container">
      <a class="popup-close rules-close" href="#">
        <svg class="popup-close__svg" xmlns="http://www.w3.org/2000/svg" width="34.31" height="38.25" viewBox="0 0 35 39" fill="none" stroke="#242424" stroke-width="2">
          <path d="M.99 35.94L31.77 1.02m-29.24 0L33.3 35.94"/>
        </svg>
      </a>
      <h2 class="rules-popup__headline">Список правил</h2>
      <ol class="rules-popup__list">
        <li class="rules-popup__item">
          <p class="rules-popup__text">Турнир проходит в 4 этапа.</p>
        </li>
        <li class="rules-popup__item">
          <p class="rules-popup__text">Флажок рядом с названием этапа - описание этапа.</p>
        </li>
        <li class="rules-popup__item">
          <p class="rules-popup__text">Игра, занявшая первое место, побеждает в турнире. Условие игрЫ в Игры, которые займут 2 и 3 место обговариваются ДО начала турнира.</p>
        </li>
      </ol>
    </div>
    </section>
    `;
  }

  //Support methods

  createDateTime() {
    const dateTimeInstance = new DateTime();
    const timeData = new Date();
    const date = dateTimeInstance.setDate([timeData.getDate(), timeData.getMonth(), timeData.getFullYear()]);
    const time = dateTimeInstance.setTime([timeData.getHours(), timeData.getMinutes(), timeData.getSeconds()]);
    const dateTimeAttrValue = date.split(`.`).reverse().join(`-`);
    return {
      date,
      time,
      dateTimeAttrValue,
    }
  }
}
