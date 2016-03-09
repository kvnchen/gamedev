/*
 *  Reindeer god boss
 */

var enemy = require('./enemy'),
    _ = require('underscore');

function Reingod() {
  enemy.call(this, 'Reingod');
  this.maxHealth = 128;
  this.currentHealth = 128;
  this.goldDrop = 10000;
  this.targetAreas = ['head', 'wound'];
  this.attacks = ['Charge', 'Frost Breath'];
  this.validSpellTargets = {
    head: ['Ignite'],
    wound: ['Ignite','Push','Pull','Heal']
  };
  this.woundState = 'frozen';
}

Reingod.prototype = Object.create(enemy.prototype);

Reingod.prototype.constructor = Reingod;

Reingod.prototype.resolveSpell = function (spell, area) {
  var outputStr = '';
  if (!_.contains(this.targetAreas, area)) {
    outputStr = 'The spell misses wildly. Reingod stares blankly.\n';
  } else {
    // handle spell based on area targeted
    if (area === 'wound') {
      outputStr += this.advanceWoundState(spell);
    }
  }
  return outputStr;
};

Reingod.prototype.advanceWoundState = function(spell) {
  var outputStr = '';
  if (_.contains(this.validSpellTargets.wound, spell.name)) {
    // Wound states: frozen, embedded, embedded hot, embedded deeply, raw, healed
    if (this.woundState === 'frozen') {
      if (spell.name === 'Push' || spell.name === 'Pull') {
        outputStr = 'The ice and frozen blood lock the axe in place. It refuses to budge.\n';
      } else if (spell.name === 'Heal') {
        outputStr = 'The axe is preventing the wound from closing.\n';
      } else if (spell.name === 'Ignite') {
        outputStr = 'Blazing heat melts the ice away! Blood begins to flow...\n';
        outputStr += this.gainDebuff('bleeding');
        this.woundState = 'embedded';
        outputStr += this.takeDamage(10);
      } else {
        outputStr = 'Whatever you tried to do, it had no effect.\n';
      }
    } else if (this.woundState === 'embedded') {
      if (spell.name === 'Pull') {
        outputStr = 'Metal is freed from flesh, with a terrible squelch!\n';
        this.woundState = 'raw';
        outputStr += this.takeDamage(20);
      } else if (spell.name === 'Push') {
        outputStr = 'The blade is thrust deeper! The Reingod howls in pain!\nBlood flow intensifies.\n';
        outputStr += this.removeDebuff('bleeding');
        outputStr += this.gainDebuff('bleedingHeavy');
        this.woundState = 'embedded deeply';
        outputStr += this.takeDamage(40);
      } else if (spell.name === 'Heal') {
        outputStr = 'The axe is still preventing the wound from closing.\n';
      } else if (spell.name === 'Ignite') {
        outputStr = 'The axe head glows with heat. The bleeding ceases as flesh is singed.\n';
        outputStr += this.removeDebuff('bleeding');
        outputStr += this.woundState = 'embedded hot';
        outputStr += this.takeDamage(30);
      } else {
        outputStr = 'Whatever you tried to do, it had no effect.\n';
      }
    } else if (this.woundState === 'embedded hot') {
      if (spell.name === 'Push') {
        outputStr = 'The burning blade strikes deep, and the Reingod collapses!\n';
        outputStr += this.takeDamage(200);
      }
    }
  } else {
    outputStr = 'That spell had no effect.\n';
  }
  return outputStr;
};

Reingod.prototype.frostBreath = function(player) {
  var outputStr = '';
  outputStr = 'The Reingod breathes frost!!\n';
  outputStr += 'The ground, and your legs, freeze over.\n';
  outputStr += player.takeDamage(5);
  outputStr += player.gainDebuff('frozen');
  //outputStr += 'You have been frozen.\n';

  return outputStr;
};

Reingod.prototype.charge = function(player) {
  var playerDebuffs = player.getDebuffs(),
      outputStr = '';
  outputStr = 'The Reingod charges!!\n';

  if (_.contains(playerDebuffs, 'frozen')) {
    outputStr += 'The frost saps the strength from your legs! Brace yourself...\n';
    outputStr += 'A devastating blow!\n';
    outputStr += player.removeDebuff('frozen');
    outputStr += player.takeDamage(20);
  } else {
    outputStr += 'You barely sidestep the beast\'s fury!\n';
  }

  return outputStr;
};

module.exports = Reingod;
