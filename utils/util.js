/*
 *  Util functions
 */

var _ = require('underscore'),
    playerData = require('../data/playerData'),
    weaponData = require('../data/weaponData'),
    armorData = require('../data/armorData'),
    spellData = require('../data/spellData'),
    weapon = require('../src/weapon'),
    armor = require('../src/armor'),
    spell = require('../src/spell');

function Util() {
  var self = this;

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
    var lookup = stripWhitespace(name);
    if (_.has(armorData, lookup)) {
      return new weapon(name, armorData[lookup]);
    }
    return new armor(name);
  }

  function makeSpell(name) {
    var lookup = stripWhitespace(name);
    if (_.has(spellData, lookup)) {
      return new spell(name, spellData[lookup]);
    }
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

  this.getArrayProp = function(arr) {
    if (arr && arr.length !== 0) {
      var str = '';
      _.each(arr, function(item) {
        if (item.name) {
          str += item.name +', ';
        } else {
          str += item + ', ';
        }
      });
      return str;
    } else { 
      return 'none';
    }
  };

  this.getNameAndDesc = function(obj) {
    if (obj && obj.name) {
      return obj.name + ': ' + obj.description;
    } else {
      return 'none';
    }
  };

  this.getAllNamesAndDesc = function(arr) {
    var output = '';

    _.each(arr, function(item) {
      output += '\n' + self.getNameAndDesc(item);
    });
    return output;
  }
}

module.exports = new Util();
