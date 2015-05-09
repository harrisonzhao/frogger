'use strict';
/*global THREE, Physijs, game*/

var GREEN = 0x00dd00;
var personPieceMass = 0.1;
//total player size = 10x10x10
//width, height, depth

var player = (function() {

  var playerBox;
  var stepRate = 2;

  //movement functions, return updated position
  //must set __dirtyposition for physijs movement
  function moveX(step) {
    playerBox.position.x += step;
    playerBox.position.x.__dirtyPosition = true;
    game.camera.position.x += step;
    game.camera.__dirtyPosition = true;
  }

  function moveZ(step) {
    playerBox.position.z += step;
    playerBox.position.z.__dirtyPosition = true;
  }

  function createPlayer() {
    var playerBoxMaterial = new THREE.MeshPhongMaterial({
      visible: false,
      transparent: true
    });

    var personMaterial = new THREE.MeshPhongMaterial({
      color: GREEN
    });

    var playerBody = new Physijs.BoxMesh(
      new THREE.BoxGeometry(8, 4, 8),
      personMaterial,
      0.1 //mass
    );

    playerBody.position.y = -4;
    playerBody.castShadow = true;

    var eyey = 2;
    var eyez = -2;
    [-2, 2].forEach(function(x) {
      var eye = new Physijs.BoxMesh(
        new THREE.BoxGeometry(3, 4, 2),
        personMaterial,
        0.1
      );
      playerBody.add(eye);
      eye.position.z = eyez;
      eye.position.y = eyey;
      eye.position.x = x;
    });

    var legy = -3;
    [-3, 3].forEach(function(z) {
      [-2, 2].forEach(function(x) {
        var leg = new Physijs.BoxMesh(
          new THREE.BoxGeometry(2, 2, 2),
          personMaterial,
          0.1
        );
        playerBody.add(leg);
        leg.position.z = z;
        leg.position.y = legy;
        leg.position.x = x;
        leg.castShadow = true;
      });
    });

    playerBox = new Physijs.BoxMesh(
      new THREE.CubeGeometry(10, 10, 10),
      playerBoxMaterial
    );
    playerBox.position.set(0, 8, 5);
    playerBox.name = 'playerBox';
    playerBox.add(playerBody);
    
    playerBody.position.y = 2;

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