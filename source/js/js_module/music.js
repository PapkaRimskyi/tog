'use strict';

(function () {
  var audioPlayer = document.querySelector('.audio-player');
  var music = document.querySelector('.music');

  audioPlayer.addEventListener('click', function (evt) {
    evt.preventDefault();
    music.classList.toggle('music--display');
  });
})();
