import Stage from '../../support-classes/stage-class.js';

import { renderMarkup} from '../../utils.js';

const stage3Markup = () => `<section class="tournaments stage stage-3">
<h1 class="stage__headline stage-3__headline--color">
  <span class="stage__headline-name">
    Полуфинал
    <a href="#" class="stage-tip">⚑</a>
  </span>
</h1>
<div class="one-v-one"></div>
<button class="button stage__button" type="button">Мне повезет!</button>
</section>
`;

const stage3ParticipantsMarkup = (participant) => `<div class="one-v-one__participant">
<div class="one-v-one__participant-info">
  <p class="one-v-one__participant-name">${participant.name}</p>
  <p class="one-v-one__participant-points">${participant.points}</p>
</div>
<p class="one-v-one__participant-stage-result">Result here</p>
</div>
`;

export default class Stage3 extends Stage {
  constructor(participantsList) {
    super(participantsList);

    this.isRandomStatus = true;
    this.participantNameContainers = null;
  }

  getTemplate() {
    return stage3Markup();
  }

  renderParticipant() {
    for (let i = 0; i < this.participantsList.length; i++) {
      renderMarkup(this.participantContainer, stage3ParticipantsMarkup(this.participantsList[i]), `beforeend`, true);
    }
    this.participantNameContainers = this.getElement().querySelectorAll(`.one-v-one__participant-name`);
  }

  stageButtonInteraction(handler) {
    this.stageButton.addEventListener(`click`, (evt) => {
      evt.preventDefault();
      handler(this.participantsList, this.participantNameContainers, this.stageButton);
    })
  }

  setRandomStatus(boolean) {
    this.isRandomStatus = boolean;
  }
}
