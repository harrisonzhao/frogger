'use strict';

var support = (function () {

  function getRand(min, max) {
    return Math.random() * (max - min) + min;
  }

  function getRandInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  function toRad(deg) {
    return deg * Math.PI / 180;
  }

  function getRow(zPos) {
    return Math.floor(zPos/10);
  }

  function getColumn(xPos) {
    return Math.floor(xPos/10);
  }

  return {
    getRand: getRand,
    getRandInt: getRandInt,
    toRad: toRad,
    getRow: getRow,
    getColumn: getColumn
  };

})();