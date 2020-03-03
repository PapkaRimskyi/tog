import Stage from '../../support-classes/stage-class.js';

const stageMarkup = (participantsList) => `<section class="tournament stage stage-1">
  <h1 class="stage__headline stage-1__headline--color">
    <span class="stage__headline-name">
      Групповой этап
      <a href="#" class="stage-tip">⚑</a>
    </span>
  </h1>
  <table class="stage__table">
  ${participantsList.map((participant) => {
    return `<tr>
    <td>
      <p class="stage__participant stage__participant--name">${participant.name}</p>
    </td>
    <td>
      <p class="stage__participant stage__participant--points">${participant.points}</p>
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

    this.LAUNCH_COUNT_LESS_THAN = 4;
    this.LAUNCH_COUNT = 1;

    this.cellNames = this.getElement().querySelectorAll(`.stage__participant--name`);
    this.cellPoints = this.getElement().querySelectorAll(`.stage__participant--points`);
  }

  //Template

  getTemplate() {
    return stageMarkup(this.participantsList);
  }

  //Button interaction

  stageButtonInteraction(handler) {
    this.stageButton.addEventListener(`click`, (evt) => {
      evt.preventDefault();
      this.setButtonHandler(handler);
      handler(this.participantsList, this.stageButton, this.LAUNCH_COUNT, this.LAUNCH_COUNT_LESS_THAN, this.cellNames, this.cellPoints, this.removeButtonHandler);
    });
  }
}
