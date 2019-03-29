'use strict';

(function () {
  window.randomNumber = function (min, max) {
    var random = min - 0.5 + Math.random() * (max - min + 1);
    random = Math.round(random);
    return random;
  }
})();
