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
  this.loadProperties();

  var status = 'Status of ' + this.name + ':\n';

  status += 'Current health: ' + this.currentHealth + '/' + this.maxHealth + '\n';
  status += 'Known Spells: ' + util.getArrayProp(this.spells) + ' \n';
  status += 'Known Runes: ' + util.getArrayProp(this.runes) + ' \n';
  status += 'Equipped Weapon: ' + util.getNameAndDesc(this.weapon) + '\n';
  status += 'Equipped Armor: ' + util.getNameAndDesc(this.armor)+ '\n';
  status += 'Wealth: ' + this.getWealth() + ' gold coins\n';
  status += 'Debuffs: ' + util.getArrayProp(this.debuffs) + '\n';

  return status;
};

Player.prototype.takeDamage = function(dmg) {
  this.currentHealth -= dmg;
  console.log('You take ' + dmg + ' damage.');
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

Player.prototype.gainDebuff = function(debuff) {
  if (!_.contains(this.debuffs, debuff)) {
    this.debuffs.push(debuff);
  } else {
    // do something different if player already has debuff
  }
}

// Since spells have contextual effects, the result is processed by either
// by the target enemy, or the spell, or some combination of both.
Player.prototype.castSpell = function(spell, target, area) {
  
};

module.exports = Player;
