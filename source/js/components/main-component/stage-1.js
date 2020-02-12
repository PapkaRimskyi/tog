import Stage from '../../support-classes/stage-class.js';

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
  <button class="button stage__button" type="button">1 бросок</button>
</section>
`;

export default class Stage1 extends Stage {
  constructor(participantsList) {
    super(participantsList);

    this.cellNames = this.getElement().querySelectorAll(`.stage-1__participant--name`);
    this.cellPoints = this.getElement().querySelectorAll(`.stage-1__participant--points`);

    this.LAUNCH_COUNT_LESS_THAN = 4;
    this.launchCount = 1;
  }

  getTemplate() {
    return stage1Markup(this.participantsList);
  }

  stageButtonInteraction(handler) {
    this.stageButton.addEventListener(`click`, (evt) => {
      evt.preventDefault();
      handler(this.participantsList, this.stageButton, this.launchCount, this.LAUNCH_COUNT_LESS_THAN, this.cellNames, this.cellPoints);
    });
  }
}
