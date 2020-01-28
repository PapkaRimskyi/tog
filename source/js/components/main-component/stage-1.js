import AbstractClass from '../../support-classes/abstract-class.js';

const stage1Markup = (participantsList) => `<section class="tournament stage-1">
  <h1 class="stage-1__headline">
    <span class="stage-1__headline-name">
      Групповой этап
      <a href="#" class="stage-tip">⚑</a>
    </span>
  </h1>
  <table class="stage-1__table">
  ${participantsList.map((participant) => {
    return `<tr>
    <td>
      <p class="stage-1__participant stage-1__participant--name">${participant.name}</p>
    </td>
    <td>
      <p class="stage-1__participant stage-1__participant--points">${participant.points}</p>
    </td>
  </tr>`;
  }).join(``)}
  </table>
  <button class="button stage-1__button" type="button">1 бросок</button>
</section>
`;

export default class Stage1 extends AbstractClass {
  constructor(list) {
    super();
    this.list = list;
  }

  getTemplate() {
    return stage1Markup(this.list);
  }

  stageTipInteraction(handlerIn, handlerOut) {
    this.getElement().querySelector(`.stage-tip`).addEventListener(`mouseover`, (evt) => {
      evt.preventDefault();
      const tipFlag = this.getElement().querySelector(`.stage-tip`);
      handlerIn(evt);
      tipFlag.addEventListener(`mouseout`, handlerOut);
    });
  }
}
