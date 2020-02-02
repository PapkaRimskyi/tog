import StageTip from '../../support-classes/stage-tip.js';

import { renderMarkup} from '../../utils.js';

const stage2Markup = () => `<section class="tournament stage-2">
<h1 class="stage-2__headline">
  <span class="stage-2__headline-name">
    Четвертьфинал
    <a href="#" class="stage-tip">⚑</a>
  </span>
</h1>
<div class="one-v-one"></div>
<button class="button stage-2__button" type="button">Мультимножитель!</button>
</section>
`;

const stage2ParticipantsMarkup = (participant) => `<div class="one-v-one__participant">
<div class="one-v-one__participant-info">
  <p class="one-v-one__participant-name">${participant.name}</p>
  <p class="one-v-one__participant-points">${participant.points}</p>
</div>
<p class="one-v-one__participant-stage-result">Result here</p>
</div>
`;

export default class Stage2 extends StageTip {
  constructor(participantsList) {
    super();
    this.stageTip = this.getElement().querySelector(`.stage-tip`);
    this.participantsList = participantsList;
    this.participantStep = 0;
    this.container = this.getElement().querySelector(`.one-v-one`);

    this.stageTipInteraction = this.stageTipInteraction.bind(this);
  }

  getTemplate() {
    return stage2Markup();
  }

  renderParticipant() {
    const loopCount = this.participantStep + 2;
    for (this.participantStep; this.participantStep < loopCount; this.participantStep++) {
      renderMarkup(this.container, stage2ParticipantsMarkup(this.participantsList[this.participantStep]), `beforeend`, true);
    }
  }
}
