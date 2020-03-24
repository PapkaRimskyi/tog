export default class MarkupConstructor {
  constructor(participantsList) {
    this.participantsList = participantsList;
  }

  stageMarkup(numberOfStage, stageName, defaultButtonText, type) {
  return `<section class="tournament stage stage-${numberOfStage}">
  <h1 class="stage__headline stage-${numberOfStage}__headline--color">
    <span class="stage__headline-name">
      ${stageName}
      <a href="#" class="stage-tip">⚑</a>
    </span>
  </h1>
  ${this.checkTypeStage(type)}
  <button class="button stage__button" type="button">${defaultButtonText}</button>
  </section>`;
  }

  tableMarkup() {
  return `<table class="stage__table">
  ${this.participantsList.map((participant) => {
    return `<tr>
    <td>
      <p class="stage__participant stage__participant--name">${participant.name}</p>
    </td>
    <td>
      <p class="stage__participant stage__participant--points">${participant.points}</p>
    </td>
  </tr>`;
  }).join(``)}
  </table>`;
  }

  oneVersusOneMarkup() {
    return `<div class="one-v-one"></div>`;
  }

  stageParticipantsMarkup(participant, zeroPoints = false) {
  return `<div class="one-v-one__participant">
  <div class="one-v-one__participant-info">
    <p class="one-v-one__participant-name">${participant.name}</p>
    <p class="one-v-one__participant-points">${zeroPoints === false ? participant.points : 0}</p>
  </div>
  <p class="one-v-one__participant-stage-result">Result here</p>
  </div>`;
  }

  crownSvg() {
    return `<svg class="one-v-one__winner" width="50" height="50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 90 90" fill="#D4AF37">
    <path d="M72.771 30.157a1.7 1.7 0 0 0-1.965.092l-14.07 11.014-8.97-10.764c-.646-.773-1.966-.775-2.611.002l-8.967 10.762-14.074-11.014a1.698 1.698 0 1 0-2.702 1.73l5.972 25.209c.112 3.973 3.379 7.17 7.379 7.17h27.395c3.999 0 7.266-3.197 7.378-7.17l5.973-25.209a1.698 1.698 0 0 0-.738-1.822zm-8.586 26.43a1.77 1.77 0 0 0-.045.391 3.985 3.985 0 0 1-3.981 3.98H32.764a3.985 3.985 0 0 1-3.982-3.98c0-.131-.016-.264-.046-.391L23.84 35.915l11.551 9.039c.724.57 1.767.457 2.354-.25l8.716-10.461 8.719 10.463a1.699 1.699 0 0 0 2.354.248l11.549-9.039-4.898 20.672z"/>
    <path d="M45.257 45.929a1.712 1.712 0 0 0-.493 1.189c0 .459.17.902.493 1.209.322.322.748.49 1.207.49.441 0 .884-.168 1.207-.49.305-.307.492-.75.492-1.209 0-.441-.188-.883-.492-1.189-.63-.629-1.803-.629-2.414 0z"/>
  </svg>
    `;
  }

  checkTypeStage(type = `!tableMarkup`) {
    switch(type) {
      case `tableMarkup`:
        return this.tableMarkup();
      case `!tableMarkup`:
        return this.oneVersusOneMarkup();
    }
  }
}
