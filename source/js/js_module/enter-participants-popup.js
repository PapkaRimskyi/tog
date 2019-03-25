'use strict';

(function () {
  var participantsPopup = document.querySelector('.enter-participants-popup');
  var participantsOpenPopup = document.querySelector('.participants-js');
  var participantsPopupClose = document.querySelector('.participants-close');

  participantsPopup.classList.add('popup--display');

  participantsOpenPopup.addEventListener('click', function (evt) {
    evt.preventDefault();
    participantsPopup.classList.add('popup--display');
  });

  participantsPopupClose.addEventListener('click', function (evt) {
    evt.preventDefault();
    participantsPopup.classList.remove('popup--display');
  });
})();
