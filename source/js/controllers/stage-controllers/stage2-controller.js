import Stage2 from '../../components/main-component/stage-2.js';
import { renderMarkup } from '../../utils.js';

export default class Stage2Controller {
  constructor(participantsList) {
    this.mainTag = document.querySelector(`.tog-main`);
    this.COUNT_OF_PARTICIPANTS_QUARTER_FINAL = 4;
    this.MIN_MULTIPLE = 1;
    this.MAX_MULTIPLE = 3;
    this.participantsList = participantsList.slice(0, this.COUNT_OF_PARTICIPANTS_QUARTER_FINAL);
    this.stage2Instance = new Stage2(this.participantsList);

    this.getMultiple = this.getMultiple.bind(this);
    this.renderNextParticipant = this.renderNextParticipant.bind(this);
  }

  renderStage() {
    renderMarkup(this.mainTag, this.stage2Instance, `beforeend`);
    this.stage2Instance.renderParticipant();
    this.stage2Instance.stageTipInteraction();
    this.stage2Instance.stage2ButtonInteraction(this.getMultiple, this.renderNextParticipant);
  }

  getMultiple(participantslist, nameContainers, stage2Button) {
    for (let name of nameContainers) {
      const resultContainer = name.parentElement.nextElementSibling;
      for (let participant of participantslist) {
        if (name.textContent === participant.name) {
          participant.multiple = this.randomMultiple();
          resultContainer.textContent = `${participant.points} * ${participant.multiple} = ${participant.points * participant.multiple}`;
          participant.points = participant.points * participant.multiple;
        }
      }
    }
    this.stage2Instance.setMultipleStatus(false);
    stage2Button.textContent = 'Следующие участники!';
  }

  renderNextParticipant(participantContainer, stage2Button) {
    Array.from(participantContainer.children).forEach((participant) => participant.remove());
    this.stage2Instance.renderParticipant();
    this.stage2Instance.setMultipleStatus(true);
    stage2Button.textContent = `Мультимножитель!`;
  }

  randomMultiple() {
    return Math.floor(this.MIN_MULTIPLE + Math.random() * (this.MAX_MULTIPLE + 1 - this.MIN_MULTIPLE));
  }
}
