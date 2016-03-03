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
  if (!_.contains(this.targetAreas, area)) {
    console.log('The spell misses wildly. Reingod stares blankly.');
  } else {
    // handle spell based on area targeted
    if (area === 'wound') {
      this.advanceWoundState(spell);
    }
  }
};

Reingod.prototype.advanceWoundState = function(spell) {
  if (_.contains(this.validSpellTargets.wound, spell.name)) {
    // Wound states: frozen, embedded, embedded hot, embedded deeply, raw, healed
    switch(this.woundState) {
      case 'frozen':
        if (spell.name === 'Push' || spell.name === 'Pull') {
          console.log('The ice and frozen blood lock the axe in place. It refuses to budge.');
        } else if (spell.name === 'Heal') {
          console.log('The axe is preventing the wound from closing.');
        } else if (spell.name === 'Ignite') {
          console.log('Blazing heat melts the ice away! Blood begins to flow...');
          this.gainDebuff('bleeding');
          this.woundState = 'embedded';
          this.takeDamage(10);
        } else {
          console.log('Whatever you tried to do, it had no effect.');
        }
      case 'embedded':
        if (spell.name === 'Pull') {
          console.log('Metal is freed from flesh, with a terrible squelch! Blood flow intensifies.')
          this.woundState = 'raw';
          this.removeDebuff('bleeding');
          this.gainDebuff('bleedingHeavy');
          this.takeDamage(20);
        }
    }
  }
};

Reingod.prototype.frostBreath = function(player) {
  console.log('\nThe Reingod breathes frost!!\n');
  console.log('The ground, and your legs, freeze over.');
  player.takeDamage(5);
  player.gainDebuff('frozen');
  console.log('You have been frozen.\n');
};

Reingod.prototype.charge = function(player) {
  var playerDebuffs = player.getDebuffs();
  console.log('The Reingod charges!!\n');

  if (_.contains(playerDebuffs, 'frozen')) {
    console.log('The frost saps the strength from your legs! Brace yourself...');
    console.log('A devastating blow!');
    player.removeDebuff('frozen');
    player.takeDamage(20);
  } else {
    console.log('You barely sidestep the beast\'s fury!\n');
  }
};

module.exports = Reingod;
