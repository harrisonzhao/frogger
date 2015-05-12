'use strict';
/*global THREE, models, game, globals*/

var sceneSetup = (function () {

  //var treeTexture= THREE.ImageUtils.loadTexture('content/tree.jpg'); //http://opengameart.org/node/8149

  function createRoad(zPos) {
    var road = models.createRoad(zPos);
    game.scene.add(road);
  }

  function createRiver(zPos) {
    var river = models.createRiver(zPos);
    game.scene.add(river);
  }

  function createTree(x, z) {
    var tree = models.createTree(x, z);
    game.scene.add(tree);
  }

  function createGrass(zPos) {
    var grass = models.createGrass(zPos);
    game.scene.add(grass);
    tree.addRow(zPos/10, 0.1);
  }

  function addSceneObjects() {

    vehicle.addRow(-4);
    createRoad(-40);

    createGrass(-10);
    createGrass(0);
    createGrass(10);
    createGrass(20);
    createGrass(30);
    createGrass(40);
    createGrass(50);
    createGrass(60);
    createGrass(-50);

    vehicle.addRow(-2);
    createRoad(-20);

    log.addRow(-3);
    createRiver(-30);

    setupSceneLighting();
  }

  function setupSceneLighting(){

    var ambientLight = new THREE.AmbientLight(0xcccccc);
    game.scene.add(ambientLight);

    var spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(-50, 250, -50);
    spotLight.castShadow = true;
    spotLight.shadowDarkness = 0.5;
    spotLight.shadowCameraVisible = true; // only for debugging
    game.scene.add(spotLight);

    // var directionalLight = new THREE.DirectionalLight( 0x404040, 0.5 );
    // directionalLight.position.set( 50, 50, -50 );
    // directionalLight.target.position.set( 0, 0, 0 );
    // directionalLight.shadowCameraVisible = true;
    // directionalLight.castShadow = true;
    // directionalLight.shadowCameraVisible = true;
    // game.scene.add(directionalLight);

  }

  return {
    addSceneObjects: addSceneObjects,
    createRoad: createRoad,
    createRiver: createRiver
  }

})();

