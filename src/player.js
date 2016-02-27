/*
 *  The player class
 */

var _ = require('underscore'),
    util = require('../utils/util'),
    weapon = require('./weapon'),
    armor = require('./armor');

function Player(name) {
  // first define what basic properties a player has
  this.name = name;
  this.maxHealth = 20;
  this.currentHealth = 20;
  this.spellBook = [];
  this.knownRunes = [];
  this.weapon = new weapon('Forked Oak Staff');
  this.armor = new armor('Novice Robes');
  this.buffs = [];
  this.debuffs = [];
}

Player.prototype.loadProperties = function() {
  return util.buildPropertyObjs('player');
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
  if (this.spellBook.length === 0) {
    return 'none.';
  } else {
    var spells = '';
    _.each(this.spellBook, function(spell) {
      spells += spell.name;
    });
    return spells;
  }
};

Player.prototype.getKnownRunes = function() {
  if (this.knownRunes.length === 0) {
    return 'none. Temporarily rip off D2 rune names';
  } else {
    var runes = '';
    _.each(this.knownRunes, function(rune) {
      runes += rune.name;
    });
    return runes;
  }
};

Player.prototype.getStatus = function() {
  var status = 'Status of ' + this.name + ':\n';

  status += 'Current health: ' + this.currentHealth + '/' + this.maxHealth + '\n';
  status += 'Known Spells: ' + this.getKnownSpells() + ' \n';
  status += 'Known Runes: ' + this.getKnownRunes() + ' \n';
  status += 'Equipped Weapon: ' + (this.weapon ? this.weapon.name : 'none') + '\n';
  status += 'Equipped Armor: ' + (this.armor ? this.armor.name : 'none') + '\n';

  return status;
};

module.exports = Player;
