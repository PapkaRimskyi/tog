export const stageMarkup = (numberOfStage, stageName, defaultButtonText) => `<section class="tournament stage stage-${numberOfStage}">
<h1 class="stage__headline stage-${numberOfStage}__headline--color">
  <span class="stage__headline-name">
    ${stageName}
    <a href="#" class="stage-tip">⚑</a>
  </span>
</h1>
<div class="one-v-one"></div>
<button class="button stage__button" type="button">${defaultButtonText}</button>
</section>
`;

export const stageParticipantsMarkup = (participant) => `<div class="one-v-one__participant">
<div class="one-v-one__participant-info">
  <p class="one-v-one__participant-name">${participant.name}</p>
  <p class="one-v-one__participant-points">${participant.points}</p>
</div>
<p class="one-v-one__participant-stage-result">Result here</p>
</div>
`;
