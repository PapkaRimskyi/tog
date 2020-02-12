import Stage from '../../support-classes/stage-class.js';

import { renderMarkup} from '../../utils.js';

const stage2Markup = () => `<section class="tournament stage-2">
<h1 class="stage-2__headline">
  <span class="stage-2__headline-name">
    Четвертьфинал
    <a href="#" class="stage-tip">⚑</a>
  </span>
</h1>
<div class="one-v-one"></div>
<button class="button stage__button" type="button">Мультимножитель!</button>
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

export default class Stage2 extends Stage {
  constructor(participantsList) {
    super(participantsList);
    this.participantContainer = this.getElement().querySelector(`.one-v-one`);
    this.participantNameContainers = null;

    this.participantNumber = 0;
    this.participantsCompleted = 0;
    this.isMultipleStatus = true;
  }

  getTemplate() {
    return stage2Markup();
  }

  renderParticipant() {
    this.participantsCompleted = this.participantNumber + 2;
    for (this.participantNumber; this.participantNumber < this.participantsCompleted; this.participantNumber++) {
      renderMarkup(this.participantContainer, stage2ParticipantsMarkup(this.participantsList[this.participantNumber]), `beforeend`, true);
    }
    this.participantNameContainers = this.getElement().querySelectorAll(`.one-v-one__participant-name`);
  }

  stageButtonInteraction(throwMultiHandler, renderNextParticipantHandler) {
    this.stageButton.addEventListener(`click`, (evt) => {
      evt.preventDefault();
      if (this.stageButton.textContent !== `Следующий этап!`) {
        if (this.isMultipleStatus) {
          throwMultiHandler(this.participantsList, this.participantNameContainers, this.participantsCompleted, this.stageButton);
          if (this.participantsCompleted === this.participantsList.length) {
            this.stageButton.textContent = 'Следующий этап!';
          }
        } else {
          if (this.participantNumber !== this.participantsList.length) {
            renderNextParticipantHandler(this.participantContainer, this.stageButton);
          }
        }
      }
    });
  }

  setMultipleStatus(value) {
    this.isMultipleStatus = value;
  }
}
