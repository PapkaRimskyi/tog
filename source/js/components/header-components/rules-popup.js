import CrossButton from '../../support-classes/cross-button-class.js';

const rulesMarkup = () => `<section class="rules-popup">
<h2 class="visually-hidden">Окно со списком правил</h2>
<div class="rules-popup__container">
  <a class="popup__close rules-close" href="#">
    <svg class="popup__close-svg" xmlns="http://www.w3.org/2000/svg" width="34.31" height="38.25" viewBox="0 0 35 39" fill="none" stroke="#242424" stroke-width="2">
      <path d="M.99 35.94L31.77 1.02m-29.24 0L33.3 35.94"/>
    </svg>
  </a>
  <h2 class="rules-popup__headline">Список правил</h2>
  <ol class="rules-popup__list">
    <li class="rules-popup__item">
      <p class="rules-popup__text">Турнир проходит в 4 этапа.</p>
    </li>
    <li class="rules-popup__item">
      <p class="rules-popup__text">В 1 фазе участники выстраиваются согласно алфавитному порядку. Дальше идет построение по количеству очков.</p>
    </li>
    <li class="rules-popup__item">
      <p class="rules-popup__text">Числа рандомятся 3 раза, но в финале 5 раз.</p>
    </li>
    <li class="rules-popup__item">
      <p class="rules-popup__text">Игра, занявшая первое место, побеждает в турнире. Условие игрЫ в Игры, которые займут 2 и 3 место обговариваются ДО начала турнира.</p>
    </li>
    <li class="rules-popup__item">
      <p class="rules-popup__text">Мошнить на победителя нельзя (кроме DBD и R6). Придется играть.</p>
    </li>
  </ol>
</div>
</section>
`;

export default class RulesPopup extends CrossButton {
  constructor() {
    super();
  }

  getTemplate() {
    return rulesMarkup();
  }
}
