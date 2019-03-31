'use strict';

(function () {
  var buttonGroup2 = document.querySelector('.tournament-stages__button--group-2');
  var buttonGroup3 = document.querySelector('.tournament-stages__button--group-3');
  var inputStage2 = document.querySelectorAll('.tournament-stages__group--2 .tournament-stages__input');
  var inputStage3 = document.querySelectorAll('.tournament-stages__group--3 .tournament-stages__input');

  var getThreeRandomThrowsGroup2 = function () {
    for (var i = 0; i < inputStage2.length; i++) {
      for (var j = 0; j < 3; j++) {
        var randomThrow = window.randomNumber(1, 6);
        window.participantsStage2[i][window.buttonGroup1.throwCollection[j]] = randomThrow;
      }
      window.participantsStage2[i].totalPoints = window.participantsStage2[i].throw1 + window.participantsStage2[i].throw2 + window.participantsStage2[i].throw3;
    }
  }

  var getWinnerStage2 = function () {
    getThreeRandomThrowsGroup2();
    var firstTotalPoints = window.participantsStage2[0].totalPoints;
    var secondTotalPoints = window.participantsStage2[1].totalPoints;
    if (firstTotalPoints > secondTotalPoints) {
      window.participantsFinal.push(window.participantsStage2[0]);
    } else {
      window.participantsFinal.push(window.participantsStage2[1]);
    }
    inputStage3[1].value = window.participantsFinal[1].gameName;
    buttonGroup3.disabled = false;
  }

  var distributionGroupStage2 = function () {
    getWinnerStage2();
    buttonGroup2.disabled = true;
    buttonGroup2.removeEventListener('click', distributionGroupStage2);
  }

  buttonGroup2.addEventListener('click', distributionGroupStage2);
})();
