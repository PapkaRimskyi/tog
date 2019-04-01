'use strict';

(function () {
  var getWinnerFinalStage = function () {
    window.buttonGroup2.makeThrowsSemifinalAndFinal(inputStage3, window.participantsFinal, window.buttonGroup1.throwCollection, throwResultsFinal);
    var firstTotalPoints = window.participantsFinal[0].totalPoints;
    var secondTotalPoints = window.participantsFinal[1].totalPoints;
    if (firstTotalPoints > secondTotalPoints) {
      winnerInput.value = window.participantsFinal[0].gameName;
    } else {
      winnerInput.value = window.participantsFinal[1].gameName;
    }
    winnerContainer.classList.add('tournament-stages__stage-container--winner-display');
  }

  var distributionGroupFinalStage = function () {
    getWinnerFinalStage();
    buttonGroupStage3.disabled = true;
    buttonGroupStage3.removeEventListener('click', distributionGroupFinalStage);
  }

  buttonGroupStage3.addEventListener('click', distributionGroupFinalStage);
})();
