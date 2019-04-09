'use strict';

(function () {
  var throwCollection = ['throw1', 'throw2', 'throw3'];
  var extraThrowCollection = ['throw4', 'throw5'];
  window.participantsStage1 = [];
  window.participantsStage2 = [];
  window.participantsFinal = [];
  var tr = true;

  var MAX_THROWS = 3;
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

  var rerollThrows = function (inputStg, stageInfo) {
    for (var i = 0; i < inputStg; i+=2) {
      var firstInput = stageInfo[i].totalPoints;
      var secondInput = stageInfo[i + 1].totalPoints;
      if (firstInput === secondInput) {
        var points = 0;
        for (var j = 0; j < 2; j++) {
          for (var k = 0; k < MAX_THROWS; k++) {
            var randomThrow = window.randomNumber(1, 6);
            stageInfo[i + j][throwCollection[k]] = randomThrow;
            points += stageInfo[i + j][throwCollection[k]];
          }
          stageInfo[i + j].totalPoints = points;
          points = 0;
          throwResultsStage1[i + j].innerHTML = stageInfo[i + j].throw1 + '/' + stageInfo[i + j].throw2 + '/' + stageInfo[i + j].throw3 + '=' + stageInfo[i + j].totalPoints;
        }
      }
    }
  }

  var getThreeRandomThrows = function (inputStg, stageInfo, stg1) {
    if (stg1) {
      for (var i = 0; i < inputStg; i++) {
        var points = 0;
        var participantsInfo = {gameName: inputStage1[i].value};
        participantsStage1.push(participantsInfo);
        for (var j = 0; j < MAX_THROWS; j++) {
          var randomThrow = window.randomNumber(1, 6);
          stageInfo[i][throwCollection[j]] = randomThrow;
          points += stageInfo[i][throwCollection[j]];
        }
        stageInfo[i].totalPoints = points;
        throwResultsStage1[i].innerHTML = stageInfo[i].throw1 + '/' + stageInfo[i].throw2 + '/' + stageInfo[i].throw3 + '=' + stageInfo[i].totalPoints;
      }
      rerollThrows(inputStg, stageInfo);
      markWhoWon(stageInfo, inputStage1, inputStage1.length);
    }
  }

  var haveSortingArraySameThrows = function (srtArray) {
    if (srtArray[0].totalPoints === srtArray[1].totalPoints) {
      for (var i = 0; i < srtArray.length - 1; i++) {
        var points = srtArray[i].totalPoints;
        for (var j = 0; j < extraThrowCollection.length - 1; j++) {
          var randomThrow = window.randomNumber(1, 6);
          srtArray[i][extraThrowCollection[j]] = randomThrow;
          points += srtArray[i][extraThrowCollection[j]];
        }
        srtArray[i].totalPoints = points;
        throwResultsStage1[i].innerHTML = srtArray[i].throw1 + '/' + srtArray[i].throw2 + '/' + srtArray[i].throw3 + '=' + srtArray[i].totalPoints;
      }
      srtArray.sort(comparisonFunction);
    }
  }

  var getWinnerStage = function (stageInfoLength, stageInfo, inputStg) {
    var sortingArray = [];
    for (var i = 0; i < stageInfoLength; i++) {
      if (inputStg[i].style.borderColor === 'green') {
        sortingArray.push(stageInfo[i]);
      }
    }
    sortingArray.sort(comparisonFunction);
    haveSortingArraySameThrows(sortingArray);
    return sortingArray;
  }

  var distributionOfParticipants = function () {
    var sortingArray = getWinnerStage(participantsStage1.length, participantsStage1, inputStage1);
    participantsFinal = sortingArray.slice(0, 1);
    participantsStage2 = sortingArray.slice(1, 3);
    for (var i = 0; i < participantsStage2.length; i++) {
      inputStage2[i].value = participantsStage2[i].gameName;
    }
    for (var j = 0; j < participantsFinal.length; j++) {
      inputStage3[j].value = participantsFinal[j].gameName;
    }
  }

  buttonGroupStage1.addEventListener('click', function (evt) {
    evt.preventDefault();
    getThreeRandomThrows(inputStage1.length, participantsStage1, tr);
    distributionOfParticipants();
    buttonGroupStage1.disabled = true;
  });

  // var comparisonFunction = function (a, b) {
  //   if (b.totalPoints < a.totalPoints) {
  //     return -1;
  //   }
  //   if (a.totalPoints > b.totalPoints) {
  //     return 1;
  //   }
  //   return 0;
  // }
  //
  // var markWhoWon = function (inputStage, i, firstWin) {
  //   if (firstWin) {
  //     inputStage[i].style.borderColor = 'green';
  //     inputStage[i + 1].style.borderColor = 'red';
  //   } else {
  //     inputStage[i + 1].style.borderColor = 'green';
  //     inputStage[i].style.borderColor = 'red';
  //   }
  // }
  //
  // var insertThrowsValue = function (c, fieldWithPoints, index, participantsThrow, throwIndex, stage1) {
  //   if (stage1 === true) {
  //     if (c !== MAX_THROWS - 1) {
  //       fieldWithPoints[index].innerHTML += participantsThrow[throwIndex[c]] + '/';
  //     } else {
  //       fieldWithPoints[index].innerHTML += participantsThrow[throwIndex[c]];
  //       participantsThrow.totalPoints = participantsThrow.throw1 + participantsThrow.throw2 + participantsThrow.throw3;
  //       fieldWithPoints[index].innerHTML += '=' + participantsThrow.totalPoints;
  //     }
  //   } else {
  //     if (c !== MAX_THROWS - 1) {
  //       fieldWithPoints[index].innerHTML += participantsThrow[index][throwIndex[c]] + '/';
  //     } else {
  //       fieldWithPoints[index].innerHTML += participantsThrow[index][throwIndex[c]];
  //       participantsThrow[index].totalPoints = participantsThrow[index].throw1 + participantsThrow[index].throw2 + participantsThrow[index].throw3;
  //       fieldWithPoints[index].innerHTML += '=' + participantsThrow[index].totalPoints;
  //     }
  //   }
  // }
  //
  // var makeThrowsStage1 = function (participantsInfo, throwNumberCollection, i) {
  //   for (var j = 0; j < MAX_THROWS; j++) {
  //     var randomThrow = window.randomNumber(1, 6);
  //     participantsInfo[throwNumberCollection[j]] = randomThrow;
  //     insertThrowsValue(j, throwResultsStage1, i, participantsInfo, throwNumberCollection, tr);
  //   }
  //   return participantsInfo;
  // }
  //
  // var getThreeRandomThrows = function () {
  //   var infoAboutAllParticipants = [];
  //   for (var i = 0; i < inputStage1.length; i++) {
  //     var aboutParticipant = {gameName: inputStage1[i].value};
  //     infoAboutAllParticipants.push(makeThrowsStage1(aboutParticipant, throwCollection, i));
  //   }
  //   return infoAboutAllParticipants;
  // }
  //
  // var comparison = function (firstTotal, secondTotal, listWinners, participantsInfo, stage, i, tr) {
  //   if (firstTotal > secondTotal) {
  //     listWinners.push(participantsInfo[i]);
  //     markWhoWon(stage, i, tr);
  //   } else {
  //     listWinners.push(participantsInfo[i + 1]);
  //     markWhoWon(stage, i);
  //   }
  // }
  //
  // var startComparisonThrows = function () {
  //   var whoHasWonStage1 = [];
  //   var infoAboutAllParticipants = getThreeRandomThrows();
  //   for (var i = 0; i < inputStage1.length; i+=2) {
  //     var firstTotalPoints = infoAboutAllParticipants[i].totalPoints;
  //     var secondTotalPoints = infoAboutAllParticipants[i + 1].totalPoints;
  //     comparison(firstTotalPoints, secondTotalPoints, whoHasWonStage1, infoAboutAllParticipants, inputStage1, i, tr);
  //   }
  //   return whoHasWonStage1.sort(comparisonFunction);
  // }
  //
  // var nextGroup = function () {
  //   var whoHasWonStage1 = startComparisonThrows();
  //   for (var i = 0; i < inputStage2.length; i++) {
  //     inputStage2[i].value = whoHasWonStage1[i + 1].gameName;
  //   }
  //   inputStage3[0].value = whoHasWonStage1[0].gameName;
  //   window.participantsStage2 = whoHasWonStage1.slice(1, 3);
  //   window.participantsFinal = whoHasWonStage1.slice(0, 1);
  //   buttonGroupStage2.disabled = false;
  // }
  //
  // var distributionParticipants = function () {
  //   nextGroup();
  //   buttonGroupStage1.disabled = true;
  //   buttonGroupStage1.removeEventListener('click', distributionParticipants);
  // }
  //
  // buttonGroupStage1.addEventListener('click', distributionParticipants);
  //
  // window.buttonGroup1 = {
  //   throwCollection: throwCollection,
  //   insertThrowsValue: insertThrowsValue,
  //   markWhoWon: markWhoWon,
  //   comparison: comparison,
  //   tr: tr,
  //   maxThrows: MAX_THROWS
  // }
})();
