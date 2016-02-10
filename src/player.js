/*
 *  The player class
 */

var _ = require('underscore'); 

function Player(name) {
  // first define what basic properties a player has
  this.name = name;
  this.maxHealth = 20;
  this.currentHealth = 20;
  this.spellBook = [];
  this.knownRunes = [];
  this.weapon = undefined;
  this.debuffs = [];
}

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
    return 'none. We all gotta start somewhere';
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
    return 'none. Check back tomorrow';
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

  return status;
};

module.exports = Player;
