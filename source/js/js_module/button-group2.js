'use strict';

(function () {
  var makeThrowsSemifinalAndFinal = function (groupStage, participantsInfo, throwNumberCollection, gameStage) {
    for (var i = 0; i < groupStage.length; i++) {
      for (var j = 0; j < window.buttonGroup1.maxThrows; j++) {
        var randomThrow = window.randomNumber(1, 6);
        participantsInfo[i][throwNumberCollection[j]] = randomThrow;
        window.buttonGroup1.insertThrowsValue(j, gameStage, i, participantsInfo, throwNumberCollection);
      }
    }
  }

  var getWinnerStage2 = function () {
    makeThrowsSemifinalAndFinal(inputStage2, window.participantsStage2, window.buttonGroup1.throwCollection, throwResultsStage2);
    for (var i = 0; i < inputStage2.length; i+=2) {
      var firstTotalPoints = window.participantsStage2[i].totalPoints;
      var secondTotalPoints = window.participantsStage2[i + 1].totalPoints;
      window.buttonGroup1.comparison(firstTotalPoints, secondTotalPoints, window.participantsFinal, window.participantsStage2, inputStage2, i, window.buttonGroup1.tr);
    }
    inputStage3[1].value = window.participantsFinal[1].gameName;
    buttonGroupStage3.disabled = false;
  }

  var distributionGroupStage2 = function () {
    getWinnerStage2();
    buttonGroupStage2.disabled = true;
    buttonGroupStage2.removeEventListener('click', distributionGroupStage2);
  }

  buttonGroupStage2.addEventListener('click', distributionGroupStage2);

  window.buttonGroup2 = {
    makeThrowsSemifinalAndFinal: makeThrowsSemifinalAndFinal
  }
})();
