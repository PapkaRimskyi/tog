'use strict';

(function () {
  var colorCollection = ['green', 'red'];
  var throwsCollection = ['throw1', 'throw2', 'throw3', 'throw4', 'throw5'];
  var extraThrowCollection = ['extraThrow'];
  window.filterNextStage = [];
  window.participantsQualifyingStage = [];
  window.participantsQuarterFinal = [];
  window.participantsSemiFinal = [];
  window.participantsFinal = [];

  window.participantsLoserLastChance = [];
  window.participantsLoserQuarterFinal = [];
  window.participantsLoserSemiFinal = [];
  window.participantsLoserFinal = [];

  var tr = true;

  var THREE_THROWS = 3;
  var FIVE_THROWS = 5;
  var COUNT_OF_WINNERS_FIRST_STAGE = 3;

  var comparisonFunction = function (a, b) {
    if (b.totalPoint < a.totalPoint) {
      return -1;
    }
    if (a.totalPoint > b.totalPoint) {
      return 1;
    }
    return 0;
  }

  var comparisonExtraPoints = function (a, b) {
    if (b.extraTotalPoint < a.extraTotalPoint) {
      return -1;
    }
    if (a.extraTotalPoint > b.extraTotalPoint) {
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
      participantsQualifyingStage[i]['totalPoint'] = 0;
      participantsQualifyingStage[i][extraThrowCollection] = 0;
      participantsQualifyingStage[i]['extraTotalPoint'] = 0;
    }
  }

  var getRandomThrows = function (groupInput, groupData, countThrows) {
    for (var i = 0; i < groupInput.length; i++) {
      var sum = 0;
      for (var j = 0; j < countThrows; j++) {
        var randomThrow = window.randomNumber(1, 10);
        sum += randomThrow;
        groupData[i][throwsCollection[j]] = randomThrow;
      }
      groupData[i].totalPoint = sum;
    }
  }

  var setBorderColor = function (groupInput, groupData) {
    for (var i = 0; i < groupInput.length; i+=2) {
      var first = groupData[i].totalPoint;
      var second = groupData[i + 1].totalPoint;
      if (first > second) {
        groupInput[i].style.borderColor = 'green';
        groupInput[i + 1].style.borderColor = 'red';
      } else {
        groupInput[i].style.borderColor = 'red';
        groupInput[i + 1].style.borderColor = 'green';
      }
    }
  }

  var rerollThrows = function (groupInput, countThrows, groupData) {
    for (var i = 0; i < groupInput.length; i+=2) {
      var firstInput = groupData[i].totalPoint;
      var secondInput = groupData[i + 1].totalPoint;
      while (firstInput === secondInput) {
        var sum = 0;
        for (var j = 0; j < 2; j++) {
          for (var k = 0; k < countThrows; k++) {
            var randomThrow = window.randomNumber(1, 10);
            groupData[i + j][throwsCollection[k]] = randomThrow;
            sum += groupData[i + j][throwsCollection[k]];
          }
          groupData[i + j].totalPoint = sum;
          sum = 0;
        }
        break;
      }
    }
  }

  var showResults = function (groupInput, groupData, result, countThrows) {
    for (var i = 0; i < groupInput.length; i++) {
      if (countThrows === THREE_THROWS) {
        result[i].innerHTML = groupData[i].throw1 + '/' + groupData[i].throw2 + '/' + groupData[i].throw3 + '=' + groupData[i].totalPoint + '(о)';
      } else {
        result[i].innerHTML = groupData[i].throw1 + '/' + groupData[i].throw2 + '/' + groupData[i].throw3 + '/' + groupData[i].throw4 + '/' + groupData[i].throw5 + '=' + groupData[i].totalPoint + '(о)';
      }
    }
    setBorderColor(groupInput, groupData);
  }

  var doExtraThrow = function (nextGroupData) {
    var subtraction;
    if (nextGroupData[0].totalPoint === nextGroupData[1].totalPoint && nextGroupData[1].totalPoint !== nextGroupData[2].totalPoint) {
      subtraction = 1;
    } else {
      subtraction = 0;
    }
    while (nextGroupData[0].totalPoint === nextGroupData[1].totalPoint || nextGroupData[0].totalPoint === nextGroupData[1].totalPoint && nextGroupData[1].totalPoint === nextGroupData[2].totalPoint) {
      for (var i = 0; i < nextGroupData.length - subtraction; i++) {
        var sum = nextGroupData[i].totalPoint;
        var randomThrow = window.randomNumber(1, 10);
        nextGroupData[i].extraThrow = randomThrow;
        nextGroupData[i].extraTotalPoint = sum + nextGroupData[i].extraThrow;
      }
      nextGroupData.sort(comparisonExtraPoints);
      break;
    }
  }

  var separationWinnerStage = function () {
    participantsSemiFinal = filterNextStage.slice(0, 1);
    participantsQuarterFinal = filterNextStage.slice(1, 3);
  }

  var separationLoserStage = function () {
    participantsLoserQuarterFinal = filterNextStage.slice(0, 1);
    participantsLoserLastChance = filterNextStage.slice(1, 3);
  }

  var nextStageTotalPoint = function (firstData, secondData, firstInput, secondInput, firstResult, secondResult) {
    firstInput[0].value = firstData[0].gameName;
    if (firstData[0].extraTotalPoint !== 0) {
      firstResult[0].textContent = 'Набрал ' + firstData[0].extraTotalPoint + '(д.о)';
    } else {
      firstResult[0].textContent = 'Набрал ' + firstData[0].totalPoint + '(о)';
    }
    for (var i = 0; i < secondInput.length; i++) {
      if (secondInput[i].value === '') {
        secondInput[i].value = secondData[i].gameName;
        if (secondData[i].extraTotalPoint !== 0) {
          secondResult[i].textContent = 'Набрал ' + secondData[i].extraTotalPoint + '(д.о)';
        } else {
          secondResult[i].textContent = 'Набрал ' + secondData[i].totalPoint + '(о)';
        }
      }
    }
  }

  var qualifyingDistribution = function (groupInput, groupData, color, separationFunction) {
    filterNextStage = [];
    for (var i = 0; i < groupInput.length; i++) {
      if (groupInput[i].style.borderColor === color) {
        filterNextStage.push(groupData[i]);
      }
    }
    filterNextStage.sort(comparisonFunction);
    doExtraThrow(filterNextStage);
    separationFunction();
  }

  var qualifyingButtonHandler = function () {
    setParticipantsProperties(qualifyingInput);
    getRandomThrows(qualifyingInput, participantsQualifyingStage, THREE_THROWS);
    rerollThrows(qualifyingInput, THREE_THROWS, participantsQualifyingStage);
    showResults(qualifyingInput, participantsQualifyingStage, groupQualifyingResults, THREE_THROWS);
    qualifyingDistribution(qualifyingInput, participantsQualifyingStage, colorCollection[0], separationWinnerStage);
    nextStageTotalPoint(participantsSemiFinal, participantsQuarterFinal, winnerSemiFinalInput, winnerQuarterFinalInput, winnerSemiFinalResults, winnerQuarterFinalResults);
    qualifyingDistribution(qualifyingInput, participantsQualifyingStage, colorCollection[1], separationLoserStage);
    nextStageTotalPoint(participantsLoserQuarterFinal, participantsLoserLastChance, loserQuarterFinalInput, loserLastChanceInput, loserQuarterFinalResult, loserLastChanceResult);
    qualifyingButton.disabled = true;
    winnerQuarterFinalButton.disabled = false;
    loserLastChanceButton.disabled = false;
    qualifyingButton.removeEventListener('click', qualifyingButtonHandler);
  }

  qualifyingButton.addEventListener('click', qualifyingButtonHandler);

  window.qualifyingStage = {
    getRandomThrows: getRandomThrows,
    rerollThrows: rerollThrows,
    showResults: showResults,
    qualifyingDistribution: qualifyingDistribution,
    threeThrows: THREE_THROWS,
    fiveThrows: FIVE_THROWS,
    colorCollection: colorCollection
  }
})();
