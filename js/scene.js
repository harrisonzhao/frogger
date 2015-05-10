'use strict';
/*global THREE, Physijs, game, models*/

var sceneSetup = (function () {

  var treeTexture= THREE.ImageUtils.loadTexture('content/tree.jpg'); //http://opengameart.org/node/8149

  function createRoad(zPos, nRows) {
    for (var i = 0; i < nRows; ++i) {
      var road = models.createRoad(zPos);
      game.scene.add(road);
      zPos -= -10;
    }
  }

  function createRiver(zPos, nRows) {
    for (var i = 0; i < nRows; ++i) {
      var river = models.createRiver(zPos);
      game.scene.add(river);
      zPos -= 10;
    }
  }

  function createGrass(zPos, nRows) {
    for (var i = 0; i < nRows; ++i) {
      var grass = models.createGrass(zPos);
      game.scene.add(grass);
      zPos -= 10;
    }
  }

  function createTree(x, z) {
    var tree = models.createTree(x, z);
    game.scene.add(tree);
  }


  function addSceneObjects() {
    //       var grassTexture = THREE.ImageUtils.loadTexture('../content/grass.png'); //http://opengameart.org/sites/default/files/grass_0_0.png
    //     grassTexture.wrapS = grassTexture.wrapT = THREE.RepeatWrapping;
    //     grassTexture.repeat.set(25, 25);

    //     var material = Physijs.createMaterial(
    //         new THREE.MeshLambertMaterial({ map: grassTexture }),
    //         0.9,
    //         0.1
    //     );
    // var ground = new Physijs.BoxMesh(
    //   new THREE.BoxGeometry(2000, 1, 2000),
    //   material, //new THREE.MeshLambertMaterial({ color: 0xbef566 }),
    //   0
    // );

    // ground.name = "ground";
    // ground.castShadow = false;
    // ground.receiveShadow = true;
    // ground.position.y = 0;
    // game.scene.add(ground);
    
    createGrass(35, 3);

    //first road
    createRoad(5, 1);

    //trees
    // for (var i = 0; i < 20; i++) {
    //   createTree(support.getRand(-500, 500), support.getRand(-250, -320));
    // }
    
    createTree(10, -15);

    //second road
    createRoad(-15, 1);

    //lake
    createRiver(-5, 1);

    var car = models.createCar(1, 'right', 100, 10, -5);
    game.scene.add(car);

    setupSceneLighting();
  }

  function setupSceneLighting(){

    var ambientLight = new THREE.AmbientLight(0xcccccc);
    game.scene.add(ambientLight);

    var spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(-100, 250, -50);
    spotLight.castShadow = true;
    spotLight.shadowDarkness = 0.5;
    spotLight.shadowCameraVisible = true; // only for debugging
    game.scene.add(spotLight);
  }

  return {
    addSceneObjects: addSceneObjects
  }

})();

