/*
 *  Util functions
 */

var _ = require('underscore'),
    playerData = require('../data/playerData'),
    weapon = require('../src/weapon'),
    armor = require('../src/armor'),
    spell = require('../src/spell');

function Util() {
  var typeMap = {
    player: playerData
  };

  // For each property, instantiate objs 
  this.buildPropertyObjs = function(type) {
    var data = typeMap[type]();
    _.each(data, function(value, key){
      console.log(key + ': ' + value + '\n');
    });
  };
}

module.exports = new Util();
