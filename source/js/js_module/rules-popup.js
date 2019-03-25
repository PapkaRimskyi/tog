'use strict';

(function () {
  var rulesPopupOpen = document.querySelector('.rules-js');
  var rulesPopup = document.querySelector('.rules-popup');
  var rulesPopupClose = document.querySelector('.rules-close');

  rulesPopupOpen.addEventListener('click', function (evt) {
    evt.preventDefault();
    rulesPopup.classList.add('popup--display');
  });

  rulesPopupClose.addEventListener('click', function (evt) {
    evt.preventDefault();
    rulesPopup.classList.remove('popup--display');
  });
})();
