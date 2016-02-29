/*
 *  The player class
 */

var _ = require('underscore'),
    util = require('../utils/util'),
    weapon = require('./weapon'),
    armor = require('./armor');

function Player(name) {
  // Default properties for a new player
  this.name = name;
  this.maxHealth = 20;
  this.currentHealth = 20;
  this.spells = [];
  this.runes = [];
  this.weapon = undefined;
  this.armor = undefined;
  this.buffs = [];
  this.debuffs = [];
  this.gold = 0;
}

Player.prototype.loadProperties = function() {
  var loadedData = util.buildPropertyObjs('player'),
      self = this;

  function insertLoaded(key) {
    if (_.has(loadedData, key)) {
      self[key] = loadedData[key];
    }
  }

  _.each(_.keys(self), insertLoaded);
};

Player.prototype.getCurrentHealth = function() {
  return this.currentHealth;  
};

Player.prototype.takeDamage = function(dmg) {
  this.currentHealth -= dmg;
  if (this.currentHealth <= 0) {
    this.currentHealth = 0;
    console.log('You Died');
  }
};

Player.prototype.takeHeal = function(heal) {
  this.currentHealth += heal;
  if (this.currentHealth >= this.maxHealth) {
    this.currentHealth = this.maxHealth;
  }
};

Player.prototype.getKnownSpells = function() {
  if (this.spells.length === 0) {
    return 'none';
  } else {
    var spells = '';
    _.each(this.spells, function(spell) {
      spells += spell.name +', ';
    });
    return spells;
  }
};

Player.prototype.getKnownRunes = function() {
  if (this.runes.length === 0) {
    return 'none.';
  } else {
    var runes = '';
    _.each(this.runes, function(rune) {
      runes += rune.name;
    });
    return runes;
  }
};

Player.prototype.getWealth = function() {
  return this.gold;
};

// Since spells have contextual effects, the result is processed by either
// by the target enemy, or the spell, or some combination of both.
Player.prototype.castSpell = function(spell, target, area) {
  
};

Player.prototype.getStatus = function() {
  this.loadProperties();

  var status = 'Status of ' + this.name + ':\n';

  status += 'Current health: ' + this.currentHealth + '/' + this.maxHealth + '\n';
  status += 'Known Spells: ' + this.getKnownSpells() + ' \n';
  status += 'Known Runes: ' + this.getKnownRunes() + ' \n';
  status += 'Equipped Weapon: ' + (this.weapon ? (this.weapon.name + ': ' + this.weapon.description) : 'none') + '\n';
  status += 'Equipped Armor: ' + (this.armor ? (this.armor.name + ': ' + this.armor.description) : 'none') + '\n';
  status += 'Wealth: ' + this.getWealth() + ' gold coins\n';

  return status;
};

module.exports = Player;
