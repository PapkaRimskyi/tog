'use strict';

(function () {

  var getWinnerOfThisGame = function () {
    for (var i = 0; i < inputStage3.length; i++) {
      if (inputStage3[i].style.borderColor === 'green') {
       winnerInput.value = participantsFinal[i].gameName;
       winnerContainer.classList.add('tournament-stages__stage-container--winner-display');
       crownOfWinner.classList.add('tournament-stages__crown--animation');
      }
    }
  }

  var button3ClickFunction = function () {
    window.buttonGroup1.getThreeRandomThrows(inputStage3.length, participantsFinal, throwResultsFinal, window.buttonGroup1.fiveThrows);
    window.buttonGroup1.rerollThrows(inputStage3.length, participantsFinal, window.buttonGroup1.fiveThrows, throwResultsFinal);
    window.buttonGroup1.markWhoWon(participantsFinal, inputStage3, inputStage3.length);
    getWinnerOfThisGame();
    buttonGroupStage3.disabled = true;
    buttonGroupStage3.removeEventListener('click', button3ClickFunction);
  }

  buttonGroupStage3.addEventListener('click', button3ClickFunction);
})();
