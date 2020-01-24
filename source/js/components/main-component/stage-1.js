import AbstractClass from '../../support-classes/abstract-class.js';

const stage1Markup = () => `<section class="tournament stage-1">
<h1 class="stage-1__headline">
  <span class="stage-1__headline-name">
    Групповой этап
    <a href="#" class="stage-tip">⚑</a>
  </span>
</h1>
<table class="stage-1__table">
  <tr>
    <td>
      <p class="stage-1__participant stage-1__participant--name">test</p>
    </td>
    <td>
      <p class="stage-1__participant stage-1__participant--points">test</p>
    </td>
  </tr>
  <tr>
    <td>
      <p class="stage-1__participant stage-1__participant--name">test</p>
    </td>
    <td>
      <p class="stage-1__participant stage-1__participant--points">test</p>
    </td>
  </tr>
  <tr>
    <td>
      <p class="stage-1__participant stage-1__participant--name">test</p>
    </td>
    <td>
      <p class="stage-1__participant stage-1__participant--points">test</p>
    </td>
  </tr>
  <tr>
    <td>
      <p class="stage-1__participant stage-1__participant--name">test</p>
    </td>
    <td>
      <p class="stage-1__participant stage-1__participant--points">test</p>
    </td>
  </tr>
  <tr>
    <td>
      <p class="stage-1__participant stage-1__participant--name">test</p>
    </td>
    <td>
      <p class="stage-1__participant stage-1__participant--points">test</p>
    </td>
  </tr>
  <tr>
    <td>
      <p class="stage-1__participant stage-1__participant--name">test</p>
    </td>
    <td>
      <p class="stage-1__participant stage-1__participant--points">test</p>
    </td>
  </tr>
</table>
<button class="button stage-1__button" type="button">1 бросок</button>
</section>
`;

export default class Stage1 extends AbstractClass {
  constructor() {
    super();
  }

  getTemplate() {
    return stage1Markup();
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
