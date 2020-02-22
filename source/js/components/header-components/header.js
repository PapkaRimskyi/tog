import AbstractClass from '../../support-classes/abstract-class.js';
import DateTime from '../../support-classes/date-time-class.js';

const createDateTime = () => {
  const dateTimeInstance = new DateTime();
  const date = new Date();
  const data = dateTimeInstance.setDate([date.getDate(), date.getMonth(), date.getFullYear()]);
  const time = dateTimeInstance.setTime([date.getHours(), date.getMinutes(), date.getSeconds()]);
  const dateTimeAttrValue = data.split(`.`).reverse().join(`-`);
  return {
    data,
    time,
    dateTimeAttrValue,
  }
}

const headerMarkup = () => {
  const dateTime = createDateTime();
  return `<header class="tog-header">
  <h1 class="tog-header__title">Tournament of Games</h1>
  <div class="tog-header__container">
    <section class="time-and-data">
      <h2 class="visually-hidden">Дата и время</h2>
      <p class="time-and-data__info">
        <time class="time-and-data__info time-and-data__info--date" datetime="${dateTime.dateTimeAttrValue}">${dateTime.data}</time>|<time class="time-and-data__info time-and-data__info--time" dateTime="${dateTime.time}">${dateTime.time}</time>
      </p>
    </section>
    <nav class="header-nav header-nav--margin-left">
      <ul class="header-nav__list">
        <li class="header-nav__item">
          <a class="header-nav__link rules-js" href="#">Правила</a>
        </li>
        <li class="header-nav__item">
          <a class="header-nav__link audio-player" href="#">Плеер</a>
        </li>
        <li class="header-nav__item">
          <a class="header-nav__link" href="#">Гороскоп</a>
        </li>
      </ul>
    </nav>
    <section class="participants">
      <h2 class="visually-hidden">Добавить участников</h2>
      <a class="participants__link participants-js" href="#">Вписать участников</a>
    </section>
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
    this.getElement().addEventListener(`click`, (evt) => {
      if (evt.target.tagName === `A`) {
        evt.preventDefault();
        handler(evt.target);
      }
    });
  }
}
