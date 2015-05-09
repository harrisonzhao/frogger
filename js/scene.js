'use strict';
/*global THREE, game*/

var sceneSetup = (function () {

  var treeTexture= THREE.ImageUtils.loadTexture('content/tree.jpg'); //http://opengameart.org/node/8149

  function createRoad(zPos) {
    var roadDepth = 10;
    var roadWidth = 400; //20 spaces
    var roadHeight = 1;
    var roadBorderDepth = 1;

    var road = new THREE.Mesh(
      //width 200, height 1, depth 12
      new THREE.BoxGeometry(roadWidth, roadHeight, roadDepth),
      //new THREE.MeshLambertMaterial({ map: THREE.ImageUtils.loadTexture('content/road.jpg') }), //http://opengameart.org/sites/default/files/oga-textures/tunnel_road.jpg
      new THREE.MeshLambertMaterial({
        color: 0x525866 //grey
      })
    );

    road.name = 'road';
    road.receiveShadow = true;
    road.position.y = 1;
    road.position.z = zPos;
    game.scene.add(road);

    var roadBorder = new THREE.Mesh(
      new THREE.BoxGeometry(roadWidth, roadHeight, roadBorderDepth),
      new THREE.MeshLambertMaterial({
        color: 0x7b8396
      })
    );
    roadBorder.name = 'roadBorder';
    roadBorder.receiveShadow = true;
    roadBorder.position.y = 1;
    roadBorder.position.z = zPos-roadDepth/2+roadBorderDepth/2;
    game.scene.add(roadBorder);

  }

  function createRiver(zPos) {

    //2 size buffer on both sides
    var river = new THREE.Mesh(
      new THREE.BoxGeometry(400, 1, 10),
      //new THREE.MeshLambertMaterial({ map: THREE.ImageUtils.loadTexture('content/water.jpg') }), //http://opengameart.org/node/10510
      new THREE.MeshLambertMaterial({
        color: 0x80f5ff
      }),
      0
    );

    river.name = "lake";
    river.position.y = 1;
    river.position.z = zPos;
    game.scene.add(river);
  }

  function createTree(x, z) {

    //lets have some variety with our trees
    var treeBaseWidth = support.getRand(15, 22);

    var tree = new THREE.Mesh(
      new THREE.CylinderGeometry(1, treeBaseWidth, 60, 9, 9, false),
      new THREE.MeshLambertMaterial({ ambient: 0x003311 * support.getRand(0, 5), map: treeTexture }),
      0
      );

    var stump = new THREE.Mesh(
      new THREE.CylinderGeometry(5, 5, 20, 9, 9, false),
      new THREE.MeshLambertMaterial({ ambient: 0x552211  }),
      0
      );

    tree.add(stump);

    stump.position.y = -40;

    tree.name = "tree";
    tree.position.set(x, 40, z);

    game.scene.add(tree);
  }


  function addSceneObjects() {
    var ground = new Physijs.BoxMesh(
      new THREE.BoxGeometry(2000, 1, 2000),
      new THREE.MeshLambertMaterial({ color: 0xbef566 }),
      0
    );

    ground.name = "ground";
    ground.castShadow = false;
    ground.receiveShadow = true;
    ground.position.y = 0;
    game.scene.add(ground);

    //first road
    createRoad(5);

    //trees
    // for (var i = 0; i < 20; i++) {
    //   createTree(support.getRand(-500, 500), support.getRand(-250, -320));
    // }

    //second road
    createRoad(-15);

    //lake
    createRiver(-5);

    setupSceneLighting();
  }

  function setupSceneLighting(){

    var ambientLight = new THREE.AmbientLight(0xcccccc);
    game.scene.add(ambientLight);

    var spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(0, 250, -50);
    spotLight.castShadow = true;
    spotLight.shadowDarkness = 0.5;
    spotLight.shadowCameraVisible = true; // only for debugging
    game.scene.add(spotLight);

  }

  return {
    addSceneObjects: addSceneObjects
  }

})();

