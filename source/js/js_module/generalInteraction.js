'use strict';

(function () {
  headerNav.classList.remove('header-nav--margin-left');
  headerNav.classList.add('header-nav--margin-right');

  var REFRESH_TIME = 90;

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
    time = setTimeout(refresh, REFRESH_TIME);
  }, REFRESH_TIME);

  date();

  audioPlayer.addEventListener('click', function (evt) {
    evt.preventDefault();
    music.classList.toggle('music--display');
  });

  var addRulesPopup = function () {
    rulesPopup.classList.add('popup--display');
    rulesPopupClose.addEventListener('click', removeRulesPopup);
  }

  var removeRulesPopup = function () {
    rulesPopup.classList.remove('popup--display');
    rulesPopupClose.removeEventListener('click', removeRulesPopup);
  }

  rulesPopupOpen.addEventListener('click', addRulesPopup);

  rulesPopupClose.addEventListener('click', removeRulesPopup);
})();
