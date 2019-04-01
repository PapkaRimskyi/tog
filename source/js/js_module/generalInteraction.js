'use strict';

(function () {
  headerNav.classList.remove('header-nav--margin-left');
  headerNav.classList.add('header-nav--margin-right');

  var getNewDate = function () {
    var now = new Date();
    return now;
  }

  var date = function () {
    var now = getNewDate();
    var day = now.getDate();
    var month = now.getMonth() + 1;
    var years = now.getFullYear();
    var allDate = ((day < 10) ? '0' : '') + day;
    allDate += ((month < 10) ? '.0' : '.') + month;
    allDate += '.' + years;
    dateSpan.innerHTML = allDate;
  }

  var time = setTimeout(function refresh () {
    var now = getNewDate();
    var hours = now.getHours();
    var minutes = now.getMinutes();
    var seconds = now.getSeconds();
    var allTime = ((hours < 10) ? '0' : '') + hours;
    allTime += ((minutes < 10) ? ':0' : ':') + minutes;
    allTime += ((seconds < 10) ? ':0' : ':') + seconds;
    timeSpan.innerHTML = allTime;
    time = setTimeout(refresh, 90);
  }, 90);

  date();

  audioPlayer.addEventListener('click', function (evt) {
    evt.preventDefault();
    music.classList.toggle('music--display');
  });

  rulesPopupOpen.addEventListener('click', function (evt) {
    evt.preventDefault();
    rulesPopup.classList.add('popup--display');
  });

  var removePopup = function () {
    rulesPopup.classList.remove('popup--display');
    rulesPopupClose.removeEventListener('click', removePopup);
  }

  rulesPopupClose.addEventListener('click', removePopup);
})();
