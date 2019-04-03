'use strict';

(function () {
  var throwCollection = ['throw1', 'throw2', 'throw3'];
  window.participantsStage2 = [];
  window.participantsFinal = [];
  var tr = true;

  var MAX_THROWS = 3;

  var comparisonFunction = function (a, b) {
    if (b.totalPoints < a.totalPoints) {
      return -1;
    }
    if (a.totalPoints > a.totalPoints) {
      return 1;
    }
    return 0;
  }

  var markWhoWon = function (inputStage, i, firstWin) {
    if (firstWin) {
      inputStage[i].style.borderColor = 'green';
      inputStage[i + 1].style.borderColor = 'red';
    } else {
      inputStage[i + 1].style.borderColor = 'green';
      inputStage[i].style.borderColor = 'red';
    }
  }

  var insertThrowsValue = function (c, fieldWithPoints, index, participantsThrow, throwIndex, stage1) {
    if (stage1 === true) {
      if (c !== MAX_THROWS - 1) {
        fieldWithPoints[index].innerHTML += participantsThrow[throwIndex[c]] + '/';
      } else {
        fieldWithPoints[index].innerHTML += participantsThrow[throwIndex[c]];
        participantsThrow.totalPoints = participantsThrow.throw1 + participantsThrow.throw2 + participantsThrow.throw3;
        fieldWithPoints[index].innerHTML += '=' + participantsThrow.totalPoints;
      }
    } else {
      if (c !== MAX_THROWS - 1) {
        fieldWithPoints[index].innerHTML += participantsThrow[index][throwIndex[c]] + '/';
      } else {
        fieldWithPoints[index].innerHTML += participantsThrow[index][throwIndex[c]];
        participantsThrow[index].totalPoints = participantsThrow[index].throw1 + participantsThrow[index].throw2 + participantsThrow[index].throw3;
        fieldWithPoints[index].innerHTML += '=' + participantsThrow[index].totalPoints;
      }
    }
  }

  var makeThrowsStage1 = function (participantsInfo, throwNumberCollection, i) {
    for (var j = 0; j < MAX_THROWS; j++) {
      var randomThrow = window.randomNumber(1, 6);
      participantsInfo[throwNumberCollection[j]] = randomThrow;
      insertThrowsValue(j, throwResultsStage1, i, participantsInfo, throwNumberCollection, tr);
    }
    return participantsInfo;
  }

  var getThreeRandomThrows = function () {
    var infoAboutAllParticipants = [];
    for (var i = 0; i < inputStage1.length; i++) {
      var aboutParticipant = {gameName: inputStage1[i].value};
      infoAboutAllParticipants.push(makeThrowsStage1(aboutParticipant, throwCollection, i));
    }
    return infoAboutAllParticipants;
  }

  var comparison = function (firstTotal, secondTotal, listWinners, participantsInfo, stage, i, tr) {
    if (firstTotal > secondTotal) {
      listWinners.push(participantsInfo[i]);
      markWhoWon(stage, i, tr);
    } else {
      listWinners.push(participantsInfo[i + 1]);
      markWhoWon(stage, i);
    }
  }

  var startComparisonThrows = function () {
    var whoHasWonStage1 = [];
    var infoAboutAllParticipants = getThreeRandomThrows();
    for (var i = 0; i < inputStage1.length; i+=2) {
      var firstTotalPoints = infoAboutAllParticipants[i].totalPoints;
      var secondTotalPoints = infoAboutAllParticipants[i + 1].totalPoints;
      comparison(firstTotalPoints, secondTotalPoints, whoHasWonStage1, infoAboutAllParticipants, inputStage1, i, tr);
    }
    return whoHasWonStage1.sort(comparisonFunction);
  }

  var nextGroup = function () {
    var whoHasWonStage1 = startComparisonThrows();
    for (var i = 0; i < inputStage2.length; i++) {
      inputStage2[i].value = whoHasWonStage1[i + 1].gameName;
    }
    inputStage3[0].value = whoHasWonStage1[0].gameName;
    window.participantsStage2 = whoHasWonStage1.slice(1, 3);
    window.participantsFinal = whoHasWonStage1.slice(0, 1);
    buttonGroupStage2.disabled = false;
  }

  var distributionParticipants = function () {
    nextGroup();
    buttonGroupStage1.disabled = true;
    buttonGroupStage1.removeEventListener('click', distributionParticipants);
  }

  buttonGroupStage1.addEventListener('click', distributionParticipants);

  window.buttonGroup1 = {
    throwCollection: throwCollection,
    insertThrowsValue: insertThrowsValue,
    markWhoWon: markWhoWon,
    comparison: comparison,
    tr: tr,
    maxThrows: MAX_THROWS
  }
})();
