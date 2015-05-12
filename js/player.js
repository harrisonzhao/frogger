'use strict';
/*global THREE, Physijs, game, models, support*/

//total player size = 10x10x10
//width, height, depth

var player = (function() {

  var playerBox;
  var direction = 0;

  //movement functions, return updated position
  //must set __dirtyposition for physijs movement
  function moveX(step) {
    var rotation = step < 0 ? 1 : 3;
    playerBox.rotation.y = support.toRad(rotation * 90);
    // playerBox.__dirtyRotation = true;
    playerBox.position.x += step;
    game.camera.position.x += step;
  }

  function moveZ(step) {
    var rotation = step < 0 ? 0 : 1;
    playerBox.rotation.y = support.toRad(rotation * 180);
    playerBox.position.z += step;
    game.camera.position.z += step;
  }

  function createPlayer() {
    playerBox = models.createPlayer();
    playerBox.position.x = 0;
    playerBox.position.z = 0;
    game.scene.add(playerBox);
  }

  return {
    playerBox: function() {
      return playerBox;
    },
    moveX: moveX,
    moveZ: moveZ,
    createPlayer: createPlayer
  };

})();