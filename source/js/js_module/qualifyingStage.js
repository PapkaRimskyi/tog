'use strict';

(function () {
  var throwsCollection = ['throw1', 'throw2', 'throw3', 'throw4', 'throw5'];
  var extraThrowCollection = ['extraThrow'];
  window.participantsQualifyingStage = [];
  window.participantsQuarterFinals = [];
  window.participantsSemiFinal = [];
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

  var setParticipantsProperties = function (groupInput) {
    for (var i = 0; i < groupInput.length; i++) {
      participantsQualifyingStage[i] = {gameName: groupInput[i].value};
      for (var j = 0; j < throwsCollection.length; j++) {
        participantsQualifyingStage[i][throwsCollection[j]] = 0;
      }
      participantsQualifyingStage[i]['totalPoints'] = 0;
      participantsQualifyingStage[i][extraThrowCollection] = 0;
      participantsQualifyingStage[i]['extraTotalPoint'] = 0;
    }
  }

  var getRandomThrows = function (groupInput, countThrows) {
    setParticipantsProperties(groupInput);
    for (var i = 0; i < groupInput.length; i++) {
      var points = 0;
      for (var j = 0; j < countThrows; j++) {
        var randomThrow = window.randomNumber(1, 10);
        points += randomThrow;
        participantsQualifyingStage[i][throwsCollection[j]] = randomThrow;
      }
      participantsQualifyingStage[i]['totalPoints'] = points;
    }
  }

  var rerollThrows = function (groupInput, countThrows, groupData) {
    for (var i = 0; i < groupInput.length; i+=2) {
      var firstInput = groupData[i].totalPoints;
      var secondInput = groupData[i + 1].totalPoints;
      if (firstInput === secondInput) {
        var points = 0;
        for (var j = 0; j < 2; j++) {
          for (var k = 0; k < countThrows; k++) {
            var randomThrow = window.randomNumber(1, 10);
            groupData[i + j][throwsCollection[k]] = randomThrow;
            points += groupData[i + j][throwsCollection[k]];
          }
          groupData[i + j].totalPoints = points;
          points = 0;
        }
      }
    }
  }

  var showThrowsResult = function (groupInput, countThrows, groupData, result) {
    for (var i = 0; i < groupInput.length; i++) {
      if (countThrows === THREE_THROWS) {
        result[i].innerHTML = groupData[i][throwsCollection[0]] + '/' + groupData[i][throwsCollection[1]] + '/' + groupData[i][throwsCollection[2]] + '=' + groupData[i].totalPoints;
      } else {
        result[i].innerHTML = groupData[i][throwsCollection[0]] + '/' + groupData[i][throwsCollection[1]] + '/' + groupData[i][throwsCollection[2]] + groupData[i][throwsCollection[3]] + groupData[i][throwsCollection[4]] + '=' + groupData[i].totalPoints;
      }
    }
    for (var j = 0; j < groupInput.length; j+=2) {
      var firstInput = groupData[j].totalPoints;
      var secondInput = groupData[j + 1].totalPoints;
      if (firstInput > secondInput) {
        groupInput[j].style.borderColor = 'green';
        groupInput[j + 1].style.borderColor = 'red';
      } else {
        groupInput[j + 1].style.borderColor = 'green';
        groupInput[j].style.borderColor = 'red';
      }
    }
  }

  var buttonQualifyingHandler = function () {
    getRandomThrows(qualifyingStageInput, THREE_THROWS);
    rerollThrows(qualifyingStageInput, THREE_THROWS, participantsQualifyingStage);
    showThrowsResult(qualifyingStageInput, THREE_THROWS, participantsQualifyingStage, throwResultsQualifyingStage);
  }

  buttonGroupQualifying.addEventListener('click', buttonQualifyingHandler);

  // var markWhoWon = function (stageInfo, inputStg, inputStgLeight) {
  //   for (var i = 0; i < inputStgLeight; i+=2) {
  //     var firstInput = stageInfo[i].totalPoints;
  //     var secondInput = stageInfo[i + 1].totalPoints;
  //     if (firstInput > secondInput) {
  //       inputStg[i].style.borderColor = 'green';
  //       inputStg[i + 1].style.borderColor = 'red';
  //     } else {
  //       inputStg[i + 1].style.borderColor = 'green';
  //       inputStg[i].style.borderColor = 'red';
  //     }
  //   }
  // }
  //
  // var rerollThrows = function (inputStg, stageInfo, maxThrows, resultInput) {
  //   for (var i = 0; i < inputStg; i+=2) {
  //     var firstInput = stageInfo[i].totalPoints;
  //     var secondInput = stageInfo[i + 1].totalPoints;
  //     if (firstInput === secondInput) {
  //       var points = 0;
  //       for (var j = 0; j < 2; j++) {
  //         for (var k = 0; k < maxThrows; k++) {
  //           var randomThrow = window.randomNumber(1, 10);
  //           stageInfo[i + j][throwsCollection[k]] = randomThrow;
  //           points += stageInfo[i + j][throwsCollection[k]];
  //         }
  //         stageInfo[i + j].totalPoints = points;
  //         points = 0;
  //         if (maxThrows === THREE_THROWS) {
  //           resultInput[i + j].innerHTML = stageInfo[i + j].throw1 + '/' + stageInfo[i + j].throw2 + '/' + stageInfo[i + j].throw3 + '=' + stageInfo[i + j].totalPoints + '(П)';
  //         } else {
  //           resultInput[i + j].innerHTML = stageInfo[i + j].throw1 + '/' + stageInfo[i + j].throw2 + '/' + stageInfo[i + j].throw3 + '/' + stageInfo[i + j].throw4 + '/' + stageInfo[i + j].throw5 + '=' + stageInfo[i + j].totalPoints + '(П)';
  //         }
  //       }
  //     }
  //   }
  // }
  //
  // var getThreeRandomThrows = function (inputStg, stageInfo, resultInput, maxThrows, stg1) {
  //   for (var i = 0; i < inputStg; i++) {
  //     var points = 0;
  //     if (stg1) {
  //       var participantsInfo = {gameName: qualifyingStageInput[i].value};
  //       participantsQualifyingStage.push(participantsInfo);
  //     }
  //     for (var j = 0; j < maxThrows; j++) {
  //       var randomThrow = window.randomNumber(1, 10);
  //       stageInfo[i][throwsCollection[j]] = randomThrow;
  //       points += stageInfo[i][throwsCollection[j]];
  //     }
  //     stageInfo[i].totalPoints = points;
  //     if (maxThrows === THREE_THROWS) {
  //       resultInput[i].innerHTML = stageInfo[i].throw1 + '/' + stageInfo[i].throw2 + '/' + stageInfo[i].throw3 + '=' + stageInfo[i].totalPoints;
  //     } else {
  //       resultInput[i].innerHTML = stageInfo[i].throw1 + '/' + stageInfo[i].throw2 + '/' + stageInfo[i].throw3 + '/' + stageInfo[i].throw4 + '/' + stageInfo[i].throw5 + '=' + stageInfo[i].totalPoints;
  //     }
  //   }
  // }
  //
  // var getWinnersStage1  = function (inputStg, stageInfo) {
  //   var sortedArray = [];
  //   for (var i = 0; i < inputStg.length; i++) {
  //     if (inputStg[i].style.borderColor === 'green') {
  //       sortedArray.push(stageInfo[i]);
  //     }
  //   }
  //   sortedArray.sort(comparisonFunction);
  //   return sortedArray;
  // }
  //
  // var haveWinnersStageSameTotalPoints = function () {
  //   var sortedArray = getWinnersStage1(qualifyingStageInput, participantsQualifyingStage);
  //   if (sortedArray[0].totalPoints === sortedArray[1].totalPoints) {
  //     for (var i = 0; i < sortedArray.length - 1; i++) {
  //       var points = sortedArray[i].totalPoints;
  //       var randomThrow = window.randomNumber(1, 10);
  //       sortedArray[i][extraThrowCollection[0]] = randomThrow;
  //       sortedArray[i].extraTotalPoints = points + sortedArray[i].throw4;
  //     }
  //     sortedArray.sort(comparisonExtraPoints);
  //   }
  //   return sortedArray;
  // }
  //
  // var distributionOfParticipants = function (sortedArray) {
  //   participantsSemiFinal = sortedArray.slice(0, 1);
  //   semiFinalStageInput[0].value = participantsSemiFinal[0].gameName;
  //   if (participantsSemiFinal[0].extraTotalPoints) {
  //     throwResultsSemiFinalStage[0].innerHTML = 'Набрал ' + participantsSemiFinal[0].extraTotalPoints + '(д.о)';
  //   } else {
  //     throwResultsSemiFinalStage[0].innerHTML = 'Набрал ' + participantsSemiFinal[0].totalPoints + '(о)';
  //   }
  //   participantsQuarterFinals = sortedArray.slice(1, 3);
  //   for (var j = 0; j < participantsQuarterFinals.length; j++) {
  //     quarterFinalsStageInput[j].value = participantsQuarterFinals[j].gameName;
  //     if (participantsQuarterFinals[j].extraTotalPoints) {
  //       throwResultsQuarterFinalsStage[j].innerHTML = 'Набрал ' + participantsQuarterFinals[j].extraTotalPoints + '(д.о)';
  //     } else {
  //       throwResultsQuarterFinalsStage[j].innerHTML = 'Набрал ' + participantsQuarterFinals[j].totalPoints + '(о)';
  //     }
  //   }
  // }
  //
  // var buttonQualifyingHandler = function () {
  //   getThreeRandomThrows(qualifyingStageInput.length, participantsQualifyingStage, throwResultsQualifyingStage, THREE_THROWS, tr);
  //   rerollThrows(qualifyingStageInput.length, participantsQualifyingStage, THREE_THROWS, throwResultsQualifyingStage);
  //   markWhoWon(participantsQualifyingStage, qualifyingStageInput, qualifyingStageInput.length);
  //   distributionOfParticipants(haveWinnersStageSameTotalPoints());
  //   buttonGroupQualifying.disabled = true;
  //   buttonGroupQuarterFinal.disabled = false;
  //   buttonGroupQualifying.removeEventListener('click', buttonQualifyingHandler);
  // }
  //
  // buttonGroupQualifying.addEventListener('click', buttonQualifyingHandler);
  //
  // window.qualifyingStage = {
  //   throwsCollection: throwsCollection,
  //   tr: tr,
  //   threeThrows: THREE_THROWS,
  //   fiveThrows: FIVE_THROWS,
  //   getThreeRandomThrows: getThreeRandomThrows,
  //   rerollThrows: rerollThrows,
  //   markWhoWon: markWhoWon
  // }
})();
