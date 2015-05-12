/*global Physijs, THREE, sceneSetup*/
'use strict';

var game = (function () {
  var scene = new THREE.Scene();
  var camera;
  var clock = new THREE.Clock();
  var width = window.innerWidth - 10;
  var height = window.innerHeight - 10;
  var playerBox;
  var renderer = new THREE.WebGLRenderer({ antialias: true });
  var playerActive = true;
  var lives = 3;
  var controls;
  var light;

  renderer.setSize(width, height);
  renderer.setClearColor(0xE0EEEE);
  
  // enable shadows, turn off for now
  renderer.shadowMapEnabled = true;
  renderer.shadowMapType = THREE.PCFShadowMap;


  document.getElementById("webgl-container").appendChild(renderer.domElement);

  camera = new THREE.PerspectiveCamera(
    30,
    width / height,
    1,
    1000
  );
  scene.add(camera);

  var spotLight = new THREE.SpotLight(0xffffff);
  spotLight.position.set(-50, 250, -50);
  spotLight.castShadow = true;
  spotLight.shadowDarkness = 0.5;
  spotLight.target.position.z = 0;
  // spotLight.shadowCameraNear = 500;
  // spotLight.shadowCameraFar = 4000;
  // spotLight.shadowCameraFov = 30;
  spotLight.shadowCameraVisible = true; // only for debugging
  light = spotLight;
  scene.add(light);

  // scene.fog = new THREE.Fog(0xE0EEEE, 250, 600);
  //scene.setGravity(new THREE.Vector3(0, -100, 0));

  function init() {

    resetScene();
    player.createPlayer();
    //pointerLock.init(camera, scene);
    sceneSetup.addSceneObjects();
    gameControls.init();
    //enemy.init();
    //player.createPlayer();
    //gameControls.init();
    
    render();
  }

  function resetScene() {
    //-45, 15, 0 degs
    camera.rotation.set(support.toRad(-60), support.toRad(15), support.toRad(15));
    camera.position.set(75, 150, 75);
    //camera.rotation.set(0, support.toRad(90), support.toRad(15));
    //camera.position.set(0, 20, 100);
  }

  // function removeLife() {
  //     lives -= 1;
  //     document.getElementById("numberOfLives").innerHTML = lives;

  //     if (lives === 0) {
  //         alert('game over');
  //     }
  // }

  function render() {
    //scene.simulate();
    // pointerLock.controls.update();

    var delta = clock.getDelta();
    vehicle.update(delta);
    log.update(delta);
    player.update(delta);
    if (vehicle.checkCollision() === true) {
      console.log('you died');
    }
    sceneSetup.generateMoreRows();
    // enemy.update(delta);

    // if (game.wintext) {
    //     game.wintext.rotation.y += 0.01;

    renderer.render(scene, camera);
    requestAnimationFrame(render);
  }

  return {
    scene: scene,
    camera: camera,
    playerBox: playerBox,
    init: init,
    controls: controls,
    playerActive: playerActive,
    resetScene: resetScene,
    lives: lives,
    light: light
    // removeLife: removeLife
  }

})();

window.onload = game.init();