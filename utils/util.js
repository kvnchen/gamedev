/*
 *  Util functions
 */

var _ = require('underscore'),
    playerData = require('../data/playerData'),
    weaponData = require('../data/weaponData'),
    weapon = require('../src/weapon'),
    armor = require('../src/armor'),
    spell = require('../src/spell');

function Util() {
  /*
   *  Functions handling data creation below
   */
  function makeWeapon(name) {
    var lookup = stripWhitespace(name);
    if (_.has(weaponData, lookup)) {
      return new weapon(name, weaponData[lookup]);
    }
    return new weapon(name);
  }

  function makeArmor(name) {
    return new armor(name);
  }

  function makeSpell(name) {
    return new spell(name);
  }

  function handleSpells(spells) {
    var result = [];
    _.each(spells, function(spell){
      result.push(makeSpell(spell));
    });
    return result;
  }

  function stripWhitespace(str) {
    return str.replace(/\s+/g, '');
  }

  var dataMap = {
    player: playerData
  };

  var constructorMap = {
    weapon: makeWeapon,
    armor: makeArmor,
    spells: handleSpells
  };

  // For a character object, go through their properties and instantiate property objects
  this.buildPropertyObjs = function(type) {
    var data = dataMap[type](),
        result = {};

    _.each(data, function(value, key){
      var mappedFunc = constructorMap[key];
      if (value !== undefined) {
        if (mappedFunc) {
          result[key] = mappedFunc(value);
        } else {
          result[key] = value;
        }
      }
    });
    return result;
  };
}

module.exports = new Util();
