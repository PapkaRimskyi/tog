'use strict';

(function () {

  var getWinnerStage = function (inputStg, stageInfo, nextGroup) {
    for (var i = 0; i < inputStg.length; i++) {
      if (inputStg[i].style.borderColor === 'green') {
       nextGroup.push(stageInfo[i]);
       inputStage3[1].value = stageInfo[i].gameName;
       throwResultsFinal[1].innerHTML = 'Набрал ' + stageInfo[i].totalPoints + '(о)';
      }
    }
  }

  var button2ClickFunction = function () {
    window.buttonGroup1.getThreeRandomThrows(inputStage2.length, participantsStage2, throwResultsStage2, window.buttonGroup1.threeThrows);
    window.buttonGroup1.rerollThrows(inputStage2.length, participantsStage2, window.buttonGroup1.threeThrows, throwResultsStage2);
    window.buttonGroup1.markWhoWon(participantsStage2, inputStage2, inputStage2.length);
    getWinnerStage(inputStage2, participantsStage2, participantsFinal);
    buttonGroupStage2.disabled = true;
    buttonGroupStage3.disabled = false;
    buttonGroupStage2.removeEventListener('click', button2ClickFunction);
  }

  buttonGroupStage2.addEventListener('click', button2ClickFunction);
})();
