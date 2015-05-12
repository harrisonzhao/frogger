'use strict';
/*globals globals, support, models, game*/

var vehicle = (function() {
  var vehicles = {}; //map row # to array of vehicles in that row

  function createVehicle(width, origin, startPos, speed, zPos) {
    var vehicle = models.createCar(width, origin, startPos, speed, zPos);
    game.scene.add(vehicle);
    return vehicle;
  }

  function addRow(rowId) {
    var speed = support.getRandInt(1, 4);
    var width = 4 - speed;
    var origin = support.getRandInt(0, 2) === 0 ? 'left' : 'right';
    var zPos = rowId * globals.blockSize;
    vehicles[rowId] = [];
    var maxX = globals.maxX - (width * globals.blockSize);
    for (var i = globals.minX;
         i < maxX;
         i += (support.getRand(4, 6) * width * globals.blockSize)) {
      var vehicle = createVehicle(width, origin, i, speed, zPos);
      vehicles[rowId].push(vehicle);
    }
  }

  function getRow(rowId) {
    return vehicles[rowId];
  }

  function deleteRow(rowId) {
    if (!(rowId in vehicles)) {
      console.log('error! rowId:', rowId, 'should be in vehicles.');
      return;
    }
    for (var i = 0; i < vehicles[rowId].length; ++i) {
      game.scene.remove(vehicles[rowId][i]);
    }
  }

  function updateRow(rowId, delta) {
    //iterate over all vehicles and update position
    for (var i = 0; i < vehicles[rowId].length; ++i) {
      var vehicle = vehicles[rowId][i];
      var movement = vehicle.data.origin === 'right' ? -1 : 1;
      //TODO: get better speed
      vehicle.position.x += (movement * 5 * delta * vehicle.data.speed);
      if ((vehicle.data.origin === 'right' &&
           vehicle.position.x < globals.minX) ||
          (vehicle.data.origin === 'left' &&
           vehicle.position.x > globals.maxX)) {
        var max = globals.maxX;
        var min = globals.minX;
        vehicle.position.x = vehicle.data.origin === 'right' ? max : min;
      }
    }
  }

  function update(delta) {
    //for each row, update row
    for (var key in vehicles) {
      if (vehicles.hasOwnProperty(key)) {
        updateRow(key, delta);
      }
    }
  }

  return {
    addRow: addRow,
    getRow: getRow,
    deleteRow: deleteRow,
    update: update
  };

})();