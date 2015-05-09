var support = (function () {

  "use strict";

  function getRand(min, max) {
    return Math.random() * (max - min) + min;
  }

  function toRad(deg) {
    return deg * Math.PI / 180;
  }

  return {
    getRand: getRand,
    toRad: toRad
  }

})();