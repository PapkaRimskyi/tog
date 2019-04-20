'use strict';

(function () {

  var pushNextStage = function (groupInput, groupData, winnerNextGroupData, loserGroupData) {
    for (var i = 0; i < groupInput.length; i++) {
      if (groupInput[i].style.borderColor === 'green') {
        winnerNextGroupData.push(groupData[i]);
      } else {
        if (loserGroupData) {
          loserGroupData.push(groupData[i]);
        }
      }
    }
  }

  var writeParticipantsDataNextStage = function (nextStageInput, nextStageData, nextStageResult) {
    for (var i = 0; i < nextStageInput.length; i++) {
      if (nextStageInput[i].value !== nextStageData[i].gameName || nextStageInput[i].value === '') {
        nextStageInput[i].value = nextStageData[i].gameName;
        nextStageResult[i].textContent = 'Набрал ' + nextStageData[i].totalPoint + '(о)';
        break;
      }
    }
  }

  var haveInputTwoParticipants = function (groupInput, groupButton) {
    var countYes = 0;
    for (var i = 0; i < groupInput.length; i++) {
      if (groupInput[i].value !== '') {
        countYes += 1;
      }
    }
    if (countYes === 2) {
      groupButton.disabled = false;
    }
  }

  var showWinnerOfTournament = function (groupInput, groupData) {
    for (var i = 0; i < groupInput.length; i++) {
      if (groupInput[i].style.borderColor === 'green') {
        winnerInput.value = groupData[i].gameName;
        winnerContainer.classList.add('tournament-stages__stage-container--winner-display');
        crownOfWinner.classList.add('tournament-stages__crown--animation');
      }
    }
  }

  var winnerQuarterFinalButtonHandler = function () {
    window.qualifyingStage.getRandomThrows(winnerQuarterFinalInput, window.participantsQuarterFinal, window.qualifyingStage.threeThrows);
    window.qualifyingStage.rerollThrows(winnerQuarterFinalInput, window.qualifyingStage.threeThrows, window.participantsQuarterFinal);
    window.qualifyingStage.showResults(winnerQuarterFinalInput, window.participantsQuarterFinal, winnerQuarterFinalResults, window.qualifyingStage.threeThrows);
    pushNextStage(winnerQuarterFinalInput, window.participantsQuarterFinal, window.participantsSemiFinal, window.participantsLoserSemiFinal);
    writeParticipantsDataNextStage(winnerSemiFinalInput, window.participantsSemiFinal, winnerSemiFinalResults);
    writeParticipantsDataNextStage(loserSemiFinalInput, window.participantsLoserSemiFinal, loserSemiFinalResult);
    haveInputTwoParticipants(loserSemiFinalInput, loserSemiFinalButton);
    winnerQuarterFinalButton.disabled = true;
    winnerSemiFinalButton.disabled = false;
    winnerQuarterFinalButton.removeEventListener('click', winnerQuarterFinalButtonHandler);
  }

  winnerQuarterFinalButton.addEventListener('click', winnerQuarterFinalButtonHandler);

  var winnerSemiFinalButtonHandler = function () {
    window.qualifyingStage.getRandomThrows(winnerSemiFinalInput, window.participantsSemiFinal, window.qualifyingStage.threeThrows);
    window.qualifyingStage.rerollThrows(winnerSemiFinalInput, window.qualifyingStage.threeThrows, window.participantsSemiFinal);
    window.qualifyingStage.showResults(winnerSemiFinalInput, window.participantsSemiFinal, winnerSemiFinalResults, window.qualifyingStage.threeThrows);
    pushNextStage(winnerSemiFinalInput, window.participantsSemiFinal, window.participantsFinal, window.participantsLoserFinal);
    writeParticipantsDataNextStage(winnerFinalInput, window.participantsFinal, winnerFinalResults);
    writeParticipantsDataNextStage(loserFinalInput, window.participantsLoserFinal, loserFinalResult);
    haveInputTwoParticipants(loserFinalInput, loserFinalButton);
    winnerSemiFinalButton.disabled = true;
  }

  winnerSemiFinalButton.addEventListener('click', winnerSemiFinalButtonHandler);

  var winnerFinalButtonHandler = function () {
    window.qualifyingStage.getRandomThrows(winnerFinalInput, window.participantsFinal, window.qualifyingStage.fiveThrows);
    window.qualifyingStage.rerollThrows(winnerFinalInput, window.qualifyingStage.fiveThrows, window.participantsFinal);
    window.qualifyingStage.showResults(winnerFinalInput, window.participantsFinal, winnerFinalResults, window.qualifyingStage.fiveThrows);
    showWinnerOfTournament(winnerFinalInput, window.participantsFinal);
    winnerFinalButton.disabled = true;
    winnerFinalButton.removeEventListener('click', winnerFinalButtonHandler);
  }

  winnerFinalButton.addEventListener('click', winnerFinalButtonHandler);

  window.winnerStage = {
    pushNextStage: pushNextStage,
    writeParticipantsDataNextStage: writeParticipantsDataNextStage,
    haveInputTwoParticipants: haveInputTwoParticipants
  }

})();
