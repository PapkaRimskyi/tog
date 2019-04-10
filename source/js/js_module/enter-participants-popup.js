'use strict';

(function () {
  var MAXGAMES = 6;

  var changeBorder = function () {
    inputParticipantsList.style.borderColor = 'red';
  }

  var sortGameNames = function () {
    return Math.random() - 0.5;
  }

  var openedParticipantsWindow = function () {
    participantsPopup.classList.add('popup--display');
    inputParticipantsList.setCustomValidity('Нет участников. И как тут выбирать?');
    changeBorder();
  }

  openedParticipantsWindow();

  var takeArrayFromInput = function () {
    var namesArraySplit = inputParticipantsList.value.toUpperCase();
    var namesArray = namesArraySplit.split(',');
    for (var i = 0; i < namesArray.length; i++) {
      namesArray[i] = namesArray[i].trim();
    }
    return namesArray;
  }

  var hasRepeatedGames = function (games) {
    for (var i = 0; i < games.length; i++) {
      for (var j = i + 1; j < games.length; j++) {
        if (games[i] === games[j]) {
          return true;
        }
      }
    }
    return false;
  };

  var hasArrayHaveOnlySpace = function (games) {
    for (var i = 0; i < games.length; i++) {
      if (games[i] === "") {
        return true;
      }
    }
    return false;
  }

  var checkNamesArray = function () {
    var namesArray = takeArrayFromInput();
    if (inputParticipantsList.value === '') {
      inputParticipantsList.setCustomValidity('Нет участников. И как тут выбирать?');
      changeBorder();
      return;
    } else if (namesArray.length < MAXGAMES) {
      inputParticipantsList.setCustomValidity('Что-то мало кандидатов (НЕ МЕНЬШЕ 6). Текущее количество: ' + namesArray.length);
      changeBorder();
      return;
    } else if (namesArray.length > MAXGAMES) {
      inputParticipantsList.setCustomValidity('С количеством игр вы явно перебрали (НЕ БОЛЬШЕ 6). Текущее количество: ' + namesArray.length);
      changeBorder();
      return;
    } else if (hasArrayHaveOnlySpace(namesArray)) {
      inputParticipantsList.setCustomValidity('Где-то поставили просто пробел вместо названия игры :/');
      changeBorder();
      return;
    } else if (hasRepeatedGames(namesArray)) {
      inputParticipantsList.setCustomValidity('Есть повторяющиеся игры!');
      changeBorder();
      return;
    } else {
      inputParticipantsList.setCustomValidity('');
      inputParticipantsList.style = '';
    }
  }

  var closeParticipantsPopup = function () {
    inputParticipantsList.value = '';
    participantsPopup.classList.remove('popup--display');
    form.removeEventListener('click', writeName);
  }

  var writeName = function () {
    var namesArray = takeArrayFromInput().sort(sortGameNames);
    for (var i = 0; i <  inputStage1.length; i++) {
      inputStage1[i].value = namesArray[i];
    }
    closeParticipantsPopup();
    musicAudio.play();
    musicAudio.volume = 0.3;
    buttonGroupStage1.disabled = false;
  }

  form.addEventListener('submit', writeName);
  inputParticipantsList.addEventListener('input', checkNamesArray);

  participantsOpenPopup.addEventListener('click', function (evt) {
    evt.preventDefault();
    participantsPopup.classList.toggle('popup--display');
    form.addEventListener('submit', writeName);
    inputParticipantsList.addEventListener('input', checkNamesArray);
  });

  participantsPopupClose.addEventListener('click', function (evt) {
    evt.preventDefault();
    participantsPopup.classList.remove('popup--display');
    form.removeEventListener('submit', writeName);
    inputParticipantsList.removeEventListener('input', checkNamesArray);
  });
})();
