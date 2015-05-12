'use strict';
/*globals models, globals, game*/
var tree = (function() {

  var trees = {}; //map of zPos to array of trees in that row

  function createTree(xPos, zPos) {
    var tree = models.createTree(xPos, zPos);
    game.scene.add(tree);
    return tree;
  }

  function addRow(rowId, prob) {
    trees[rowId] = [];
    var zPos = rowId * globals.blockSize;
    for (var i = globals.minCol; i < globals.maxCol; ++i) {
      var xPos = i*globals.blockSize;
      if (i < globals.lowerCol || i > globals.upperCol) {
        createTree(xPos, zPos);
      } else if (Math.random() < prob) {
        var tree = createTree(xPos, zPos);
        tree.data = {
          colId: i,
          rowId: rowId
        };
        trees[rowId].push(tree);
      }
    }
  }

  function checkValidPosition(colId, rowId) {
    if (!(rowId in trees)) {
      return true;
    }
    if (colId < globals.lowerCol || colId > globals.upperCol) {
      return false;
    }
    for (var i = 0; i < trees[rowId].length; ++i) {
      var tree = trees[rowId][i];
      if (tree.data.colId === colId && tree.data.rowId === rowId) {
        return false;
      }
    }
    return true;
  }

  function deleteRow(rowId) {
    if (!(rowId in trees)) {
      return;
    }
    for (var i = 0; i < trees[rowId].length; ++i) {
      game.scene.remove(trees[rowId][i]);
    }
    delete trees[rowId];
  }

  return {
    addRow: addRow,
    checkValidPosition: checkValidPosition
  };

})();