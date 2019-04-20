'use strict';

(function () {

  var loserLastChanceButtonHandler = function () {
    window.qualifyingStage.getRandomThrows(loserLastChanceInput, window.participantsLoserLastChance, window.qualifyingStage.threeThrows);
    window.qualifyingStage.rerollThrows(loserLastChanceInput, window.qualifyingStage.threeThrows, window.participantsLoserLastChance);
    window.qualifyingStage.showResults(loserLastChanceInput, window.participantsLoserLastChance, loserLastChanceResult, window.qualifyingStage.threeThrows);
    window.winnerStage.pushNextStage(loserLastChanceInput, window.participantsLoserLastChance, window.participantsLoserQuarterFinal);
    window.winnerStage.writeParticipantsDataNextStage(loserQuarterFinalInput, window.participantsLoserQuarterFinal, loserQuarterFinalResult);
    loserLastChanceButton.disabled = true;
    loserQuarterFinalButton.disabled = false;
    loserLastChanceButton.removeEventListener('click', loserLastChanceButtonHandler);
  }

  loserLastChanceButton.addEventListener('click', loserLastChanceButtonHandler);

  var loserQuarterFinalButtonHandler = function () {
    window.qualifyingStage.getRandomThrows(loserQuarterFinalInput, window.participantsLoserQuarterFinal, window.qualifyingStage.threeThrows);
    window.qualifyingStage.rerollThrows(loserQuarterFinalInput, window.qualifyingStage.threeThrows, window.participantsLoserQuarterFinal);
    window.qualifyingStage.showResults(loserQuarterFinalInput, window.participantsLoserQuarterFinal, loserQuarterFinalResult, window.qualifyingStage.threeThrows);
    window.winnerStage.pushNextStage(loserQuarterFinalInput, window.participantsLoserQuarterFinal, window.participantsLoserSemiFinal);
    window.winnerStage.writeParticipantsDataNextStage(loserSemiFinalInput, window.participantsLoserSemiFinal, loserSemiFinalResult);
    window.winnerStage.haveInputTwoParticipants(loserSemiFinalInput, loserSemiFinalButton);
    loserQuarterFinalButton.disabled = true;
  }

  loserQuarterFinalButton.addEventListener('click', loserQuarterFinalButtonHandler);

  var loserSemiFinalButtonHandler = function () {
    window.qualifyingStage.getRandomThrows(loserSemiFinalInput, window.participantsLoserSemiFinal, window.qualifyingStage.threeThrows);
    window.qualifyingStage.rerollThrows(loserSemiFinalInput, window.qualifyingStage.threeThrows, window.participantsLoserSemiFinal);
    window.qualifyingStage.showResults(loserSemiFinalInput, window.participantsLoserSemiFinal, loserSemiFinalResult, window.qualifyingStage.threeThrows);
    window.winnerStage.pushNextStage(loserSemiFinalInput, window.participantsLoserSemiFinal, window.participantsLoserFinal);
    window.winnerStage.writeParticipantsDataNextStage(loserFinalInput, window.participantsLoserFinal, loserFinalResult);
    window.winnerStage.haveInputTwoParticipants(loserFinalInput, loserFinalButton);
    loserSemiFinalButton.disabled = true;
    loserSemiFinalButton.removeEventListener('click', loserSemiFinalButtonHandler);
  }

  loserSemiFinalButton.addEventListener('click', loserSemiFinalButtonHandler);

  var loserFinalButtonHandler = function () {
    window.qualifyingStage.getRandomThrows(loserFinalInput, window.participantsLoserFinal, window.qualifyingStage.threeThrows);
    window.qualifyingStage.rerollThrows(loserFinalInput, window.qualifyingStage.threeThrows, window.participantsLoserFinal);
    window.qualifyingStage.showResults(loserFinalInput, window.participantsLoserFinal, loserFinalResult, window.qualifyingStage.threeThrows);
    window.winnerStage.pushNextStage(loserFinalInput, window.participantsLoserFinal, window.participantsFinal);
    window.winnerStage.writeParticipantsDataNextStage(winnerFinalInput, window.participantsFinal, winnerFinalResults);
    winnerFinalButton.disabled = false;
    loserFinalButton.disabled = true;
    loserFinalButton.removeEventListener('click', loserFinalButtonHandler);
  }

  loserFinalButton.addEventListener('click', loserFinalButtonHandler);
})();
