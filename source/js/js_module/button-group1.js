'use strict';

(function () {
  var throwCollection = ['throw1', 'throw2', 'throw3'];
  window.participantsStage2 = [];
  window.participantsFinal = [];
  var tr = true;

  var comparisonFunction = function (a, b) {
    if (b.totalPoints < a.totalPoints) {
      return -1;
    }
    if (a.totalPoints > a.totalPoints) {
      return 1;
    }
    return 0;
  }

  var insertThrowsValue = function (c, fieldWithPoints, index, participantsThrow, throwIndex, stage1) {
    if (stage1 === true) {
      if (c !== 3 - 1) {
        fieldWithPoints[index].innerHTML += participantsThrow[throwIndex[c]] + '/';
      } else {
        fieldWithPoints[index].innerHTML += participantsThrow[throwIndex[c]];
        participantsThrow.totalPoints = participantsThrow.throw1 + participantsThrow.throw2 + participantsThrow.throw3;
        fieldWithPoints[index].innerHTML += '=' + participantsThrow.totalPoints;
      }
    } else {
      if (c !== 3 - 1) {
        fieldWithPoints[index].innerHTML += participantsThrow[index][throwIndex[c]] + '/';
      } else {
        fieldWithPoints[index].innerHTML += participantsThrow[index][throwIndex[c]];
        participantsThrow[index].totalPoints = participantsThrow[index].throw1 + participantsThrow[index].throw2 + participantsThrow[index].throw3;
        fieldWithPoints[index].innerHTML += '=' + participantsThrow[index].totalPoints;
      }
    }
  }

  var makeThrowsStage1 = function (participantsInfo, throwNumberCollection, i) {
    for (var j = 0; j < 3; j++) {
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

  var comparisonThrows = function () {
    var whoHasWonStage1 = [];
    var infoAboutAllParticipants = getThreeRandomThrows();
    for (var i = 0; i < inputStage1.length; i+=2) {
      var firstTotalPoints = infoAboutAllParticipants[i].totalPoints;
      var secondTotalPoints = infoAboutAllParticipants[i + 1].totalPoints;
      if (firstTotalPoints > secondTotalPoints) {
        whoHasWonStage1.push(infoAboutAllParticipants[i]);
      } else {
        whoHasWonStage1.push(infoAboutAllParticipants[i + 1]);
      }
    }
    return whoHasWonStage1.sort(comparisonFunction);
  }

  var nextGroup = function () {
    var whoHasWonStage1 = comparisonThrows();
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
    insertThrowsValue: insertThrowsValue
  }
})();
