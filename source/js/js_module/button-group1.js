'use strict';

(function () {
  var throwsCollection = ['throw1', 'throw2', 'throw3', 'throw4', 'throw5'];
  var extraThrowCollection = ['throw4'];
  window.participantsStage1 = [];
  window.participantsStage2 = [];
  window.participantsFinal = [];
  var tr = true;

  var THREE_THROWS = 3;
  var FIVE_THROWS = 5;
  var COUNT_OF_WINNERS_FIRST_STAGE = 3;

  var comparisonFunction = function (a, b) {
    if (b.totalPoints < a.totalPoints) {
      return -1;
    }
    if (a.totalPoints > b.totalPoints) {
      return 1;
    }
    return 0;
  }

  var comparisonExtraPoints = function (a, b) {
    if (b.extraTotalPoints < a.extraTotalPoints) {
      return -1;
    }
    if (a.extraTotalPoints > b.extraTotalPoints) {
      return 1;
    }
    return 0;
  }

  var markWhoWon = function (stageInfo, inputStg, inputStgLeight) {
    for (var i = 0; i < inputStgLeight; i+=2) {
      var firstInput = stageInfo[i].totalPoints;
      var secondInput = stageInfo[i + 1].totalPoints;
      if (firstInput > secondInput) {
        inputStg[i].style.borderColor = 'green';
        inputStg[i + 1].style.borderColor = 'red';
      } else {
        inputStg[i + 1].style.borderColor = 'green';
        inputStg[i].style.borderColor = 'red';
      }
    }
  }

  var rerollThrows = function (inputStg, stageInfo, maxThrows, resultInput) {
    for (var i = 0; i < inputStg; i+=2) {
      var firstInput = stageInfo[i].totalPoints;
      var secondInput = stageInfo[i + 1].totalPoints;
      if (firstInput === secondInput) {
        var points = 0;
        for (var j = 0; j < 2; j++) {
          for (var k = 0; k < maxThrows; k++) {
            var randomThrow = window.randomNumber(1, 10);
            stageInfo[i + j][throwsCollection[k]] = randomThrow;
            points += stageInfo[i + j][throwsCollection[k]];
          }
          stageInfo[i + j].totalPoints = points;
          points = 0;
          if (maxThrows === THREE_THROWS) {
            resultInput[i + j].innerHTML = stageInfo[i + j].throw1 + '/' + stageInfo[i + j].throw2 + '/' + stageInfo[i + j].throw3 + '=' + stageInfo[i + j].totalPoints + '(П)';
          } else {
            resultInput[i + j].innerHTML = stageInfo[i + j].throw1 + '/' + stageInfo[i + j].throw2 + '/' + stageInfo[i + j].throw3 + stageInfo[i + j].throw4 + '/' + stageInfo[i + j].throw5 + '=' + stageInfo[i + j].totalPoints + '(П)';
          }
        }
      }
    }
  }

  var getThreeRandomThrows = function (inputStg, stageInfo, resultInput, maxThrows, stg1) {
    for (var i = 0; i < inputStg; i++) {
      var points = 0;
      if (stg1) {
        var participantsInfo = {gameName: inputStage1[i].value};
        participantsStage1.push(participantsInfo);
      }
      for (var j = 0; j < maxThrows; j++) {
        var randomThrow = window.randomNumber(1, 10);
        stageInfo[i][throwsCollection[j]] = randomThrow;
        points += stageInfo[i][throwsCollection[j]];
      }
      stageInfo[i].totalPoints = points;
      if (maxThrows === THREE_THROWS) {
        resultInput[i].innerHTML = stageInfo[i].throw1 + '/' + stageInfo[i].throw2 + '/' + stageInfo[i].throw3 + '=' + stageInfo[i].totalPoints;
      } else {
        resultInput[i].innerHTML = stageInfo[i].throw1 + '/' + stageInfo[i].throw2 + '/' + stageInfo[i].throw3 + '/' + stageInfo[i].throw4 + '/' + stageInfo[i].throw5 + '=' + stageInfo[i].totalPoints;
      }
    }
  }

  var getWinnersStage1 = function (inputStg, stageInfo) {
    var sortedArray = [];
    for (var i = 0; i < inputStg.length; i++) {
      if (inputStg[i].style.borderColor === 'green') {
        sortedArray.push(stageInfo[i]);
      }
    }
    sortedArray.sort(comparisonFunction);
    return sortedArray;
  }

  var haveWinnersStageSameTotalPoints = function () {
    var sortedArray = getWinnersStage1(inputStage1, participantsStage1);
    if (sortedArray[0].totalPoints === sortedArray[1].totalPoints) {
      for (var i = 0; i < sortedArray.length - 1; i++) {
        var points = sortedArray[i].totalPoints;
        var randomThrow = window.randomNumber(1, 10);
        sortedArray[i][extraThrowCollection[0]] = randomThrow;
        sortedArray[i].extraTotalPoints = points + sortedArray[i].throw4;
      }
      sortedArray.sort(comparisonExtraPoints);
    }
    return sortedArray;
  }

  var distributionOfParticipants = function (sortedArray) {
    participantsFinal = sortedArray.slice(0, 1);
    inputStage3[0].value = participantsFinal[0].gameName;
    if (participantsFinal[0].extraTotalPoints) {
      throwResultsFinal[0].innerHTML = 'Набрал ' + participantsFinal[0].extraTotalPoints + '(д.о)';
    } else {
      throwResultsFinal[0].innerHTML = 'Набрал ' + participantsFinal[0].totalPoints + '(о)';
    }
    throwResultsFinal[1].innerHTML = 'Ждем соперника';
    participantsStage2 = sortedArray.slice(1, 3);
    for (var j = 0; j < participantsStage2.length; j++) {
      inputStage2[j].value = participantsStage2[j].gameName;
      if (participantsStage2[j].extraTotalPoints) {
        throwResultsStage2[j].innerHTML = 'Набрал ' + participantsStage2[j].extraTotalPoints + '(д.о)';
      } else {
        throwResultsStage2[j].innerHTML = 'Набрал ' + participantsStage2[j].totalPoints + '(о)';
      }
    }
  }

  var button1ClickFunction = function () {
    getThreeRandomThrows(inputStage1.length, participantsStage1, throwResultsStage1, THREE_THROWS, tr);
    rerollThrows(inputStage1.length, participantsStage1, THREE_THROWS, throwResultsStage1);
    markWhoWon(participantsStage1, inputStage1, inputStage1.length);
    distributionOfParticipants(haveWinnersStageSameTotalPoints());
    buttonGroupStage1.disabled = true;
    buttonGroupStage2.disabled = false;
    buttonGroupStage1.removeEventListener('click', button1ClickFunction);
  }

  buttonGroupStage1.addEventListener('click', button1ClickFunction);

  window.buttonGroup1 = {
    throwsCollection: throwsCollection,
    tr: tr,
    threeThrows: THREE_THROWS,
    fiveThrows: FIVE_THROWS,
    getThreeRandomThrows: getThreeRandomThrows,
    rerollThrows: rerollThrows,
    markWhoWon: markWhoWon
  }
})();
