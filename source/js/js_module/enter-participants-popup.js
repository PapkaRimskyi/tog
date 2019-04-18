'use strict';

(function () {
  var MAXGAMES = 6;

  var changeBorder = function () {
    inputParticipantsList.style.borderColor = 'red';
  }

  var sortGameNames = function () {
    return Math.random() - 0.5;
  }

  var checkForEmptyInput = function () {
    if (inputParticipantsList.value === '') {
      inputParticipantsList.setCustomValidity('Нет участников. И как тут выбирать?');
      changeBorder();
    }
  }

  var openedParticipantsWindow = function () {
    participantsPopup.classList.add('popup--display');
    sendParticipantsButton.disabled = false;
    sendParticipantsButton.addEventListener('click', checkForEmptyInput);
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
      inputParticipantsList.setCustomValidity('С количеством игр Вы явно перебрали (НЕ БОЛЬШЕ 6). Текущее количество: ' + namesArray.length);
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
    sendParticipantsButton.classList.remove('enter-participants-popup__send-participants-list--gif');
    form.removeEventListener('submit', writeNameAndGifFunctionDelay);
    inputParticipantsList.removeEventListener('input', checkNamesArray);
  }

  var activateGif = function () {
    sendParticipantsButton.disabled = true;
    sendParticipantsButton.classList.add('enter-participants-popup__send-participants-list--gif');
  }

  var writeName = function () {
    var namesArray = takeArrayFromInput().sort(sortGameNames);
    for (var i = 0; i < qualifyingStageInput.length; i++) {
      qualifyingStageInput[i].value = namesArray[i];
    }
    sendParticipantsButton.removeEventListener('click', checkForEmptyInput);
    closeParticipantsPopup();
    // musicAudio.play();
    musicAudio.volume = 0.3;
    buttonGroupQualifying.disabled = false;
  }

  var writeNameAndGifFunctionDelay = function () {
    setTimeout(activateGif, 100);
    setTimeout(writeName, 1000);
  }

  form.addEventListener('submit', writeNameAndGifFunctionDelay);
  inputParticipantsList.addEventListener('input', checkNamesArray);

  participantsOpenPopup.addEventListener('click', function (evt) {
    evt.preventDefault();
    participantsPopup.classList.toggle('popup--display');
    sendParticipantsButton.addEventListener('click', checkForEmptyInput);
    sendParticipantsButton.disabled = false;
    form.addEventListener('submit', writeNameAndGifFunctionDelay);
    inputParticipantsList.addEventListener('input', checkNamesArray);
  });

  participantsPopupClose.addEventListener('click', function (evt) {
    evt.preventDefault();
    participantsPopup.classList.remove('popup--display');
    sendParticipantsButton.removeEventListener('click', checkForEmptyInput);
    form.removeEventListener('submit', writeNameAndGifFunctionDelay);
    inputParticipantsList.removeEventListener('input', checkNamesArray);
  });
})();
