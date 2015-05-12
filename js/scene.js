'use strict';
/*global THREE, models, game, globals, vehicle, log, tree, support*/

var sceneSetup = (function () {

  var rows = {}; //map of rowId to row
  var currentNumRows = 0;
  var currentRowId = 0; //current generated row id
  var highestRowId;

  function createRoad(rowId) {
    var road = models.createRoad(rowId*globals.blockSize);
    vehicle.addRow(rowId);
    game.scene.add(road);
    rows[rowId] = road;
    --currentRowId;
    ++currentNumRows;
  }

  function createRiver(rowId) {
    var river = models.createRiver(rowId*globals.blockSize);
    log.addRow(rowId);
    game.scene.add(river);
    rows[rowId] = river;
    --currentRowId;
    ++currentNumRows;
  }

  function createGrass(rowId, probTree) {
    var grass = models.createGrass(rowId*globals.blockSize);
    game.scene.add(grass);
    tree.addRow(rowId, probTree);
    rows[rowId] = grass;
    --currentRowId;
    ++currentNumRows;
  }

  function deleteRow(rowId) {
    log.deleteRow(rowId);
    vehicle.deleteRow(rowId);
    tree.deleteRow(rowId);
    if (rowId in rows) {
      game.scene.remove(rows[rowId]);
    }
    delete rows[rowId];
  }

  function createRandomRows() {
    var type = support.getRandInt(0, 3);
    var nRows;
    if (type === 0) {
      nRows = 1;
    } else {
      nRows = support.getRandInt(1, 6);
    }
    var i;
    for (i = 0; i < nRows; ++i) {
      console.log(type);
      switch (type) {
      case 0:
        createGrass(currentRowId, 0.1);
        break;
      case 1:
        createRoad(currentRowId);
        break;
      case 2:
        createRoad(currentRowId);
        break;
      }
    }
    if (type !== 0) {
      nRows = support.getRandInt(1, 3);
      for (i = 0; i < nRows; ++i) {
        createGrass(currentRowId);
      }
    }
  }

  function addSceneObjects() {
    highestRowId = 7;
    var i;
    for (i = 0; i < 4; ++i) {
      createGrass(i, 0);
    }
    for (i = 4; i < 8; ++i) {
      createGrass(i, 1);
    }
    createGrass(-1, 0.3);

    var nRows = support.getRandInt(2, 4);
    for (i = -2; i > -2-nRows; --i) {
      createRoad(i);
    }

    currentRowId = -2-nRows;
    createGrass(-2-nRows, 0.1);
    createRandomRows();
    createRandomRows();

    setupSceneLighting();
  }

  function setupSceneLighting(){

    var ambientLight = new THREE.AmbientLight(0xcccccc);
    game.scene.add(ambientLight);

    var spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(-50, 250, -50);
    // spotLight.castShadow = true;
    // spotLight.shadowDarkness = 0.5;
    // spotLight.shadowCameraVisible = true; // only for debugging
    game.scene.add(spotLight);

    // var directionalLight = new THREE.DirectionalLight( 0x404040, 0.5 );
    // directionalLight.position.set( -25, 150, -50);
    // directionalLight.target.position.set( 25, 0, 0 );
    // directionalLight.shadowCameraVisible = true;
    // directionalLight.shadowCameraLeft = -100; // or whatever value works for the scale of your scene
    // directionalLight.shadowCameraRight = 100;
    // directionalLight.shadowCameraTop = 100;
    // directionalLight.shadowCameraBottom = -100;
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

