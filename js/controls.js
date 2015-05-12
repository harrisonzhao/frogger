'use strict';
/*globals player, globals, tree*/

var gameControls = (function(){

  function checkValidPosition(x, z) {
    if (tree.checkValidPosition(x, z) &&
        x <= globals.upperCol &&
        x >= globals.lowerCol) {
      return true;
    }
    return false;
  }

  function checkKey(e) {
    var left = 37;
    var up = 38;
    var right = 39;
    var down = 40;

    e = e || window.event;

    var playerBox = player.playerBox();
    var colId = playerBox.position.x / globals.blockSize;
    var rowId = playerBox.position.z / globals.blockSize;
    if (e.keyCode === up && checkValidPosition(colId, rowId-1)) {
      player.moveZ(-1);
    } else if (e.keyCode === down && checkValidPosition(colId, rowId+1)) {
      player.moveZ(1);
    } else if (e.keyCode === left && checkValidPosition(colId-1, rowId)) {
      player.moveX(-1);
    } else if (e.keyCode === right && checkValidPosition(colId+1, rowId)) {
      player.moveX(1);
    }
  }

  function init() {
    window.onkeydown = checkKey;
  }

  return {
    init: init,
    checkValidPosition: checkValidPosition
  }

})();