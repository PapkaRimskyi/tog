import Stage from '../../support-classes/stage-class.js';

import { renderMarkup} from '../../utils.js';

const stage4Markup = () => `<section class="tournaments stage stage-4">
<h1 class="stage__headline stage-4__headline--color">
  <span class="stage__headline-name">
    Финал
    <a href="#" class="stage-tip">⚑</a>
  </span>
</h1>
<div class="one-v-one"></div>
<button class="button stage__button" type="button">Мне повезет!</button>
</section>
`;

const stage4ParticipantsMarkup = (participant) => `<div class="one-v-one__participant">
<div class="one-v-one__participant-info">
  <p class="one-v-one__participant-name">${participant.name}</p>
  <p class="one-v-one__participant-points">${participant.points}</p>
</div>
<p class="one-v-one__participant-stage-result">Result here</p>
</div>
`;

export default class Stage4 extends Stage {
  constructor(firstParticipant) {
    super(firstParticipant);

    this.participantNameContainers = null;
  }

  getTemplate() {
    return stage4Markup();
  }

  pushParticipant(secondParticipant) {
    this.participantsList.push(secondParticipant);
  }

  renderParticipant() {
    for (let i = 0; i < this.participantsList.length; i++) {
      renderMarkup(this.participantContainer, stage4ParticipantsMarkup(this.participantsList[i]), `beforeend`, true);
    }
    this.participantNameContainers = this.getElement().querySelectorAll(`.one-v-one__participant-name`);
  }
}
