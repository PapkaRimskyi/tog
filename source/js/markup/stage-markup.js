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

  checkTypeStage(type = `!tableMarkup`) {
    switch(type) {
      case `tableMarkup`:
        return this.tableMarkup();
      case `!tableMarkup`:
        return this.oneVersusOneMarkup();
    }
  }
}
