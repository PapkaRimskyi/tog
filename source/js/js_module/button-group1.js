'use strict';

(function () {
  var buttonGroup1 = document.querySelector('.tournament-stages__button--group-1');
  var buttonGroup2 = document.querySelector('.tournament-stages__button--group-2');
  var inputStage2 = document.querySelectorAll('.tournament-stages__group--2 .tournament-stages__input');
  var inputStage3 = document.querySelectorAll('.tournament-stages__group--3 .tournament-stages__input');

  var throwCollection = ['throw1', 'throw2', 'throw3'];
  window.participantsStage2 = [];
  window.participantsFinal = [];

  var comparisonFunction = function (a, b) {
    if (b.totalPoints < a.totalPoints) {
      return -1;
    }
    if (a.totalPoints > a.totalPoints) {
      return 1;
    }
    return 0;
  }

  var getThreeRandomThrows = function () {
    var infoAboutAllParticipants = [];
    for (var i = 0; i < window.enterParticipantsPopup.inputStage1.length; i++) {
      var aboutParticipant = {gameName: window.enterParticipantsPopup.inputStage1[i].value};
      for (var j = 0; j < 3; j++) {
        var randomThrow = window.randomNumber(1, 6);
        aboutParticipant[throwCollection[j]] = randomThrow;
      }
      aboutParticipant.totalPoints = aboutParticipant.throw1 + aboutParticipant.throw2 + aboutParticipant.throw3;
      infoAboutAllParticipants.push(aboutParticipant);
    }
    return infoAboutAllParticipants;
  }

  var comparisonThrows = function () {
    var whoHasWonStage1 = [];
    var infoAboutAllParticipants = getThreeRandomThrows();
    for (var i = 0; i < window.enterParticipantsPopup.inputStage1.length; i+=2) {
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
    buttonGroup2.disabled = false;
  }

  var distributionParticipants = function () {
    nextGroup();
    buttonGroup1.disabled = true;
    buttonGroup1.removeEventListener('click', distributionParticipants);
  }

  buttonGroup1.addEventListener('click', distributionParticipants);

  window.buttonGroup1 = {
    throwCollection: throwCollection
  }
})();
