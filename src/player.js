/*
 *  The player class
 */

var _ = require('underscore'),
    util = require('../utils/util'),
    weapon = require('./weapon'),
    armor = require('./armor');

function Player(name) {
  // Default properties for a new player
  this.maxHealth = 20;
  this.currentHealth = 20;
  this.spells = [];
  this.runes = [];
  this.weapon = undefined;
  this.armor = undefined;
  this.buffs = [];
  this.debuffs = [];
  this.gold = 0;

  // Load player data, if it exists
  function loadProperties(self) {
    var loadedData = util.buildPropertyObjs('player');

    function insertLoaded(key) {
      if (_.has(loadedData, key)) {
        self[key] = loadedData[key];
      }
    }

    _.each(_.keys(self), insertLoaded);
  }

  loadProperties(this);
  this.name = name;
}


Player.prototype.getCurrentHealth = function() {
  return this.currentHealth;  
};

Player.prototype.getKnownSpells = function() {
  return this.spells;
};

Player.prototype.getKnownRunes = function() {
  return this.runes;
};

Player.prototype.getWealth = function() {
  return this.gold;
};

Player.prototype.getDebuffs = function() {
  return this.debuffs;
};

Player.prototype.getWeapon = function() {
  return this.weapon;
};

Player.prototype.getStatus = function() {
  var status = 'Status of ' + this.name + ':\n'
             + 'Current health: ' + this.currentHealth + '/' + this.maxHealth + '\n'
             + 'Known Spells: ' + util.getAllNamesAndDesc(this.spells) + ' \n'

      // NOTE: Currently not relevant to play demo
             // + 'Known Runes: ' + util.getArrayProp(this.runes) + ' \n'
             // + 'Equipped Weapon: ' + util.getNameAndDesc(this.weapon) + '\n'
             // + 'Equipped Armor: ' + util.getNameAndDesc(this.armor)+ '\n'
             // + 'Wealth: ' + this.getWealth() + ' gold coins\n'
             
             + 'Debuffs: ' + util.getArrayProp(this.debuffs) + '\n';

  return status;
};

Player.prototype.takeDamage = function(dmg) {
  this.currentHealth -= dmg;
  var outputStr = 'You take ' + dmg + ' damage. (' + this.currentHealth + '/' + this.maxHealth + ')\n';
  if (this.currentHealth <= 0) {
    this.currentHealth = 0;
    outputStr += 'You Died\n';
  }

  return outputStr;
};

Player.prototype.takeHeal = function(heal) {
  this.currentHealth += heal;
  if (this.currentHealth >= this.maxHealth) {
    this.currentHealth = this.maxHealth;
  }
  return 'You gain ' + heal + ' life. (' + this.currentHealth + '/' + this.maxHealth + ')\n';
};

Player.prototype.gainBuff = function(buff) {
  // implement me!
};

Player.prototype.gainDebuff = function(debuff) {
  var outputStr = '';
  if (!_.contains(this.debuffs, debuff)) {
    this.debuffs.push(debuff);
    outputStr = this.name + ' gains debuff ' + debuff + '\n';
  } else {
    // do something different if you already have debuff
  }
  return outputStr;
};

Player.prototype.removeDebuff = function(debuff) {
  var index = _.indexOf(this.debuffs, debuff),
      outputStr = '';
  if (index !== -1) {
    this.debuffs.splice(index, 1);
    outputStr = this.name + ' loses debuff ' + debuff + '\n';
  }
  return outputStr;
};

Player.prototype.removeAllBuffs = function() {
  this.buffs = [];
  this.debuffs = [];
};

// Since spells have contextual effects, the result is processed by either
// by the target enemy, or the spell, or some combination of both.
Player.prototype.castSpell = function(spellName, target, area) {
  var spell = _.findWhere(this.spells, {name: spellName}),
      outputStr = '';
  if (!spell) {
    outputStr = 'You attempt to invoke an unknown magic. Nothing happens.\n';
  } else {
    if (area) {
      outputStr = 'You cast ' + spell.name + ' on ' + target.name + '\'s ' + area + '.\n'
                + target.resolveSpell(spell, area);
    } else {
      outputStr = 'You cast ' + spell.name + ' on ' + target.name + '.\n'
                + target.resolveSpell(spell);
    }
  }
  return outputStr;
};

// I don't think ill have targetable areas on the player for now
Player.prototype.resolveSpell = function(spell) {
  var outputStr = '',
      self = this;

  if (spell.heal > 0) {
    outputStr += self.takeHeal(spell.heal);
  }

  if (spell.damage > 0) {
    outputStr += self.takeDamage(spell.damage);
  }

  outputStr += util.handleBuffsAndDebuffs(self, spell);
  
  return outputStr;
};

// We pass the enemy obj because we need to map the target name to the enemy obj
// enemy might be an array later, if we allow combat vs multiple enemies
Player.prototype.getAction = function(line, enemy) {
  var self = this;

  function lowerCase(str) {
    return str.toLowerCase();
  }

  function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1, str.length);
  }

  function getTarget(str) {
    if (str === self.name.toLowerCase() || str === 'me' || str === 'self') {
      return self;
    } else if (str === enemy.name.toLowerCase()) {
      return enemy;
    } else {
      return 'unknown';
    }
  }

  // Format the input line, handling case issues.
  function handleInputs(input) {
    var output = [];

    _.each(input.split(' '), function(item, index){
      if (index === 0) { // spell
        output.push(capitalize(item));
      } else if (index === 1) { // target
        output.push(lowerCase(item));
      } else { // area
        output.push(lowerCase(item));
      }
    });
    return output;
  }

  // expect format as 'spell target <optional area>'
  var inputs = handleInputs(line);
  if (inputs.length < 2) {
    return self.name + ' panicked and failed to act!';
  }

  var target = getTarget(inputs[1]);
  if (target === 'unknown') {
    return self.name + ' casts a spell on nobody.';
  } 

  if (target === enemy && inputs.length >= 3) {
    return self.castSpell(inputs[0],target,inputs[2]);
  } else {
    return self.castSpell(inputs[0],target);
  }
};

Player.prototype.reset = function () {
  this.currentHealth = this.maxHealth;
  this.removeAllBuffs();
}

module.exports = Player;
