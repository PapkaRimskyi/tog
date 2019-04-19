'use strict';

(function () {
  //
  // var getWinnerStage = function (inputStg, stageInfo, nextGroup, nextStageInput, throwResultsStage) {
  //   for (var i = 0; i < inputStg.length; i++) {
  //     if (inputStg[i].style.borderColor === 'green') {
  //      nextGroup.push(stageInfo[i]);
  //      for (var j = 0; j < nextStageInput.length; j++) {
  //        if (nextStageInput[j].value === '') {
  //          nextStageInput[j].value = stageInfo[i].gameName;
  //          throwResultsStage[j].innerHTML = 'Набрал ' + stageInfo[i].totalPoints + '(о)';
  //          return;
  //        }
  //      }
  //     }
  //   }
  // }
  //
  // var buttonQuarterFinalHandler = function () {
  //   window.qualifyingStage.getThreeRandomThrows(quarterFinalsStageInput.length, participantsQuarterFinals, throwResultsQuarterFinalsStage, window.qualifyingStage.threeThrows);
  //   window.qualifyingStage.rerollThrows(quarterFinalsStageInput.length, participantsQuarterFinals, window.qualifyingStage.threeThrows, throwResultsQuarterFinalsStage);
  //   window.qualifyingStage.markWhoWon(participantsQuarterFinals, quarterFinalsStageInput, quarterFinalsStageInput.length);
  //   getWinnerStage(quarterFinalsStageInput, participantsQuarterFinals, participantsSemiFinal, semiFinalStageInput, throwResultsSemiFinalStage);
  //   buttonGroupQuarterFinal.disabled = true;
  //   buttonGroupSemiFinal.disabled = false;
  //   buttonGroupQuarterFinal.removeEventListener('click', buttonQuarterFinalHandler);
  // }
  //
  // buttonGroupQuarterFinal.addEventListener('click', buttonQuarterFinalHandler);
  //
  // var buttonSemiFinalHandler = function () {
  //   window.qualifyingStage.getThreeRandomThrows(semiFinalStageInput.length, participantsSemiFinal, throwResultsSemiFinalStage, window.qualifyingStage.threeThrows);
  //   window.qualifyingStage.rerollThrows(semiFinalStageInput.length, participantsSemiFinal, window.qualifyingStage.threeThrows, throwResultsSemiFinalStage);
  //   window.qualifyingStage.markWhoWon(participantsSemiFinal, semiFinalStageInput, semiFinalStageInput.length);
  //   getWinnerStage(semiFinalStageInput, participantsSemiFinal, participantsFinal, finalStageInput, throwResultsFinalStage);
  //   buttonGroupSemiFinal.disabled = true;
  //   buttonGroupSemiFinal.removeEventListener('click', buttonSemiFinalHandler);
  // }
  //
  // buttonGroupSemiFinal.addEventListener('click', buttonSemiFinalHandler);
})();
