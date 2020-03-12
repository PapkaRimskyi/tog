import AbstractClass from '../../support-classes/abstract-class.js';
import DateTime from '../../support-classes/date-time-class.js';

const createDateTime = () => {
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

const headerMarkup = () => {
  const timeData = createDateTime();
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
};


export default class Header extends AbstractClass {
  constructor() {
    super();
  }

  //Template

  getTemplate() {
    return headerMarkup();
  }

  headerDelegation(handler) {
    this.getElement().addEventListener(`click`, () => {
      if (event.target.tagName === `BUTTON` && event.target.classList.contains(`header-nav__link`)) {
        event.preventDefault();
        handler(event.target);
      }
    });
  }
}
