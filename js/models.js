'use strict';
/*globals THREE, game, support*/

var models = (function() {

  function createPlayer() {
    var playerBoxMaterial = new THREE.MeshPhongMaterial({
      visible: false,
      transparent: true
    });

    var personMaterial = new THREE.MeshPhongMaterial({
      color: 0x00dd00
    });

    var playerBody = new THREE.Mesh(
      new THREE.BoxGeometry(8, 4, 8),
      personMaterial
    );

    playerBody.position.y = -4;
    playerBody.castShadow = true;

    var eyey = 2;
    var eyez = -2;
    [-2, 2].forEach(function(x) {
      var eye = new THREE.Mesh(
        new THREE.BoxGeometry(3, 4, 2),
        personMaterial
      );

      playerBody.add(eye);
      eye.position.z = eyez;
      eye.position.y = eyey;
      eye.position.x = x;
    });

    var legy = -3;
    [-3, 3].forEach(function(z) {
      [-2, 2].forEach(function(x) {
        var leg = new THREE.Mesh(
          new THREE.BoxGeometry(2, 2, 2),
          personMaterial
        );
        playerBody.add(leg);
        leg.position.z = z;
        leg.position.y = legy;
        leg.position.x = x;
        leg.castShadow = true;
      });
    });

    var playerBox = new THREE.Mesh(
      new THREE.BoxGeometry(10, 10, 10),
      playerBoxMaterial
    );
    playerBox.name = 'playerBox';
    playerBox.add(playerBody);
    playerBody.position.y = 5;

    playerBox.data = {
      width: 8,
      depth: 8
    }

    return playerBox;
  }

  function createRoad(zPos) {
    var roadDepth = 10;
    var roadWidth = 400; //20 spaces
    var roadHeight = 1;
    //var roadBorderDepth = 1;

    var road = new THREE.Mesh(
      new THREE.BoxGeometry(roadWidth, roadHeight, roadDepth),
      //new THREE.MeshLambertMaterial({ map: THREE.ImageUtils.loadTexture('content/road.jpg') }), //http://opengameart.org/sites/default/files/oga-textures/tunnel_road.jpg
      new THREE.MeshLambertMaterial({
        color: 0x7b8396 //grey
      }),
      0
    );

    road.name = 'road';
    road.receiveShadow = true;
    road.position.z = zPos;

    // var counter = 0;
    // var step = roadWidth/(2*20);
    // for (var i = -roadWidth/2; i < roadWidth/2; i+= step) {
    //   var color = counter % 2 === 0 ? 0x7b8396 : 0x525866;
    //   var roadBorder = new THREE.Mesh(
    //     new THREE.BoxGeometry(step, roadHeight, roadBorderDepth),
    //     new THREE.MeshLambertMaterial({
    //       color: color
    //     }),
    //     0 //static physijs
    //   );
    //   road.add(roadBorder);
    //   roadBorder.receiveShadow = true;
    //   roadBorder.position.x = i+step/2;
    //   roadBorder.position.z = (-roadDepth + roadBorderDepth)/2;
    //   ++counter;
    // }

    return road;
  }

  function createRiver(zPos) {

    //2 size buffer on both sides
    var river = new THREE.Mesh(
      new THREE.BoxGeometry(400, 1, 10),
      //new THREE.MeshLambertMaterial({ map: THREE.ImageUtils.loadTexture('content/water.jpg') }), //http://opengameart.org/node/10510
      new THREE.MeshPhongMaterial({
        color: 0x80f5ff,
        shininess: 2
      })
    );
    river.receiveShadow = true;
    river.name = 'river';
    river.position.z = zPos;
    return river;
  }

  function createGrass(zPos) {
    // var grassTexture = THREE.ImageUtils.loadTexture('../content/grass.png'); //http://opengameart.org/sites/default/files/grass_0_0.png
    // grassTexture.wrapS = grassTexture.wrapT = THREE.ClampToEdgeWrapping;
    // grassTexture.repeat.set(1, 1);
    // grassTexture.minFilter = THREE.LinearFilter;

    // var material = new THREE.MeshLambertMaterial({ map: grassTexture });
    var grass = new THREE.Mesh(
      new THREE.BoxGeometry(400, 1, 10),
      /*material*/ new THREE.MeshLambertMaterial({ color: 0xbef566 })
    );

    grass.name = 'grass';
    grass.castShadow = false;
    grass.receiveShadow = true;
    grass.position.z = zPos;
    return grass;
  }

  //height 1-3
  function createTree(xPos, zPos) {
    var numTreeStacks = support.getRandInt(1, 4);
    var treeSectionHeight = 7;
    var trunkHeight = 10;

    var trunk = new THREE.Mesh(
      new THREE.BoxGeometry(5, trunkHeight, 5),
      new THREE.MeshLambertMaterial({ color: 0x563631 })
    );
    trunk.castShadow = true;

    for (var i = 0; i < numTreeStacks; ++i) {
      var treeSection = new THREE.Mesh(
        new THREE.BoxGeometry(8, treeSectionHeight, 8),
        new THREE.MeshLambertMaterial({ color: 0x748E06 })
      );
      trunk.add(treeSection);
      treeSection.castShadow = true;
      treeSection.position.y = trunkHeight/2 + treeSectionHeight * i;
    }

    trunk.position.z = zPos;
    trunk.position.x = xPos;
    trunk.position.y = trunkHeight/2;
    trunk.name = 'tree';

    return trunk;
  }

  function createCar(width, origin, startPos, speed, zPos) {
    var colors = [ 0xfffe65, 0xff7035, 0x17EDFF, 0xBAF06C ];
    var color = colors[support.getRandInt(0, colors.length)];
    var totalWidth = width*5 + 8;
    var car = new THREE.Mesh(
      new THREE.BoxGeometry(totalWidth, 6, 8),
      new THREE.MeshLambertMaterial({ color: color })
    );
    car.castShadow = true;

    var hood = new THREE.Mesh(
      new THREE.BoxGeometry(totalWidth*0.6, 4, 6),
      new THREE.MeshLambertMaterial({ color: color })
    );
    car.add(hood);
    hood.position.y = 5;
    hood.position.x = totalWidth*0.3/2;

    [-1, 1].forEach(function(pos) {
      var wheel = new THREE.Mesh(
        new THREE.CylinderGeometry(2, 2, 9),
        new THREE.MeshLambertMaterial({color: 0x000000 })
      );
      wheel.rotation.x = support.toRad(90);
      car.add(wheel);
      wheel.position.y = -3;
      wheel.position.x = pos * totalWidth/4;
    });

    car.data = {
      origin: origin,
      startPos: startPos,
      speed: speed,
      zPos: zPos,
      width: totalWidth,
      depth: 8
    }
    car.name = 'car';
    car.position.y = 5.5;
    car.position.x = startPos;
    car.position.z = zPos;
    if (car.data.origin === 'left') {
      car.rotation.y = support.toRad(180);
    }
    return car;
  }

  //width from 1-3
  function createLog(width, origin, startPos, speed, zPos) {
    var totalWidth = width * 10 - 2;
    var log = new THREE.Mesh(
      new THREE.BoxGeometry(totalWidth, 2, 6),
      new THREE.MeshLambertMaterial({ color: 0x7f3f3d })
    );

    startPos = origin === 'right' ? startPos: -startPos;
    log.position.set(startPos, 1, zPos);

    log.data = {
      origin: origin,
      startPos: startPos,
      speed: speed,
      zPos: zPos,
      width: totalWidth,
      depth: 8
    };
    log.name = 'log';

    return log;
  }

  return {
    createPlayer: createPlayer,
    createRoad: createRoad,
    createRiver: createRiver,
    createGrass: createGrass,
    createTree: createTree,
    createCar: createCar,
    createLog: createLog
  };

})();