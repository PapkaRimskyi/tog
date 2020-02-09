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
    this.stage2Button = this.getElement().querySelector(`.stage-2__button`);
    this.participantContainer = this.getElement().querySelector(`.one-v-one`);
    this.participantNameContainers = null;

    this.participantsList = participantsList;
    this.participantId = 0;
    this.participantsCompleted = 0;
    this.isMultipleStatus = true;

    this.stageTipInteraction = this.stageTipInteraction.bind(this);
  }

  getTemplate() {
    return stage2Markup();
  }

  renderParticipant() {
    this.participantsCompleted = this.participantId + 2;
    for (this.participantId; this.participantId < this.participantsCompleted; this.participantId++) {
      renderMarkup(this.participantContainer, stage2ParticipantsMarkup(this.participantsList[this.participantId]), `beforeend`, true);
    }
    this.participantNameContainers = this.getElement().querySelectorAll(`.one-v-one__participant-name`);
  }

  stage2ButtonInteraction(throwMultiHandler, renderNextParticipantHandler) {
    this.stage2Button.addEventListener(`click`, (evt) => {
      evt.preventDefault();
      if (this.stage2Button.textContent !== `Следующий этап!`) {
        if (this.isMultipleStatus) {
          throwMultiHandler(this.participantsList, this.participantNameContainers, this.participantsCompleted, this.stage2Button);
          if (this.participantsCompleted === this.participantsList.length) {
            this.stage2Button.textContent = 'Следующий этап!';
          }
        } else {
          if (this.participantId !== this.participantsList.length) {
            renderNextParticipantHandler(this.participantContainer, this.stage2Button);
          }
        }
      }
    });
  }

  setMultipleStatus(value) {
    this.isMultipleStatus = value;
  }
}
