import AbstractClass from '../../support-classes/abstract-class.js';
import '../../../img/agutin-button.png';
import '../../../img/agutin-gif.gif';

const participantsMarkup = () => `<section class="enter-participants-popup">
<h2 class="visually-hidden">Окно для добавления участников</h2>
<div class="enter-participants-popup__container">
  <a class="popup__close participants-close" href="#">
    <svg class="popup__close-svg" xmlns="http://www.w3.org/2000/svg" width="34.31" height="38.25" viewBox="0 0 35 39" fill="none" stroke="#242424" stroke-width="2">
      <path d="M.99 35.94L31.77 1.02m-29.24 0L33.3 35.94"/>
    </svg>
  </a>
  <h2 class="enter-participants-popup__headline">Хотите вписать участников турнира?</h2>
  <form class="enter-participants-popup__form" action="localhost:3000" method="post" enctype="multipart/form-data">
    <input class="enter-participants-popup__participants-list" type="text" name="games" placeholder="Список игр">
    <button class="enter-participants-popup__send-participants-list" type="submit" disabled>Отправить!</button>
  </form>
</div>
</section>
`;

export default class ParticipantsPopup extends AbstractClass {
  constructor() {
    super();
  }

  getTemplate() {
    return participantsMarkup();
  }

  closePopupByCrossButton(handler) {
    this.getElement().querySelector(`.popup__close`).addEventListener(`click`, (evt) => {
      evt.preventDefault();
      handler(this);
      this.getElement().querySelector(`.popup__close`).removeEventListener(`click`, handler);
    });
  }
}
