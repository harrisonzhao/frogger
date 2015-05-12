'use strict';
/*global THREE, Physijs, game, models, support, tree, globals*/

var player = (function() {

  var playerBox;
  var direction = 0;
  var progress = 0;
  var animating = false;
  var originalState = {
    cameraX: 0,
    cameraZ: 0,
    playerX: 0,
    playerZ: 0
  }

  function getY(progress) {
    //cx(1-x) x = 1, y = 0; x = 0, y = 0;
    return 8*progress*(1 - progress);
  }

  function stepX(step) {
    var rotation = step < 0 ? 1 : 3;
    playerBox.rotation.y = support.toRad(rotation * 90);
    playerBox.position.x += step;
    playerBox.position.y = getY(progress);
    game.camera.position.x += step;
  }

  function stepZ(step) {
    var rotation = step < 0 ? 0 : 1;
    playerBox.rotation.y = support.toRad(rotation * 180);
    playerBox.position.y = getY(progress);
    playerBox.position.z += step;
    game.camera.position.z += step;

    game.light.position.z = playerBox.position.z - 50;
    //game.light.position.y = game.light.position.z * -5;
    //game.light.position.x = game.light.position.z;
    game.light.target = playerBox;
    game.light.updateMatrix();
    game.light.updateMatrixWorld();
  }

  function saveOriginalState() {
    originalState.cameraX = game.camera.position.x;
    originalState.cameraZ = game.camera.position.z;
    originalState.playerX = playerBox.position.x;
    originalState.playerY = playerBox.position.y;
    originalState.playerZ = playerBox.position.z;
  }

  function moveX(step) {
    if (animating) {
      return;
    }
    animating = true;
    progress = 0;
    direction = step < 0 ? 2 : 1;
    saveOriginalState();
  }

  function moveZ(step) {
    if (animating) {
      return;
    }
    animating = true;
    progress = 0;
    direction = step < 0 ? 4 : 3;
    saveOriginalState();
  }

  function createPlayer() {
    playerBox = models.createPlayer();
    playerBox.position.x = 0;
    playerBox.position.z = 0;
    game.scene.add(playerBox);
  }

  function update(delta) {
    if (animating === false) {
      return;
    }
    var dprogress = 4*delta;
    var step = dprogress * 10;
    progress += dprogress;
    switch (direction) {
    case 1:
      stepX(step);
      break;
    case 2:
      stepX(-step);
      break;
    case 3:
      stepZ(step);
      break;
    case 4:
      stepZ(-step);
      break;
    }
    if (progress >= 1) {
      animating = false;
      progress = 0;
      playerBox.position.x = Math.round(playerBox.position.x/10)*10;
      playerBox.position.z = Math.round(playerBox.position.z/10)*10;
      playerBox.position.y = originalState.playerY;
      game.camera.position.x = playerBox.position.x - 
                               originalState.playerX + 
                               originalState.cameraX;
      game.camera.position.z = playerBox.position.z - 
                               originalState.playerZ + 
                               originalState.cameraZ;
    }
  }

  return {
    playerBox: function() {
      return playerBox;
    },
    moveX: moveX,
    moveZ: moveZ,
    createPlayer: createPlayer,
    update: update
  };

})();