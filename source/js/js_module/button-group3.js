'use strict';

(function () {
  var buttonGroup3 = document.querySelector('.tournament-stages__button--group-3');
  var inputStage3 = document.querySelectorAll('.tournament-stages__group--3 .tournament-stages__input');
  var winnerInput = document.querySelector('.tournament-stages__stage-container--winner .tournament-stages__input');
  var winnerContainer = document.querySelector('.tournament-stages__stage-container--winner');

  var getThreeRandomThrowsForFinalGroup = function () {
    console.log(window.participantsFinal);
    for (var i = 0; i < inputStage3.length - 1; i++) {
      for (var j = 0; j < 3; j++) {
        var randomThrow = window.randomNumber(1, 6);
        window.participantsFinal[i][window.buttonGroup1.throwCollection[j]] = randomThrow;
      }
      window.participantsFinal[i].totalPoints = window.participantsFinal[i].throw1 + window.participantsFinal[i].throw2 + window.participantsFinal[i].throw3;
    }
  }

  var getWinnerFinalStage = function () {
    getThreeRandomThrowsForFinalGroup();
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
    buttonGroup3.disabled = true;
    buttonGroup3.removeEventListener('click', distributionGroupFinalStage);
  }

  buttonGroup3.addEventListener('click', distributionGroupFinalStage);
})();
