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
  this.woundState = 'frozen'; // embedded, embedded hot, embedded deeply, raw, healed
}

Reingod.prototype = Object.create(enemy.prototype);

Reingod.prototype.constructor = Reingod;

Reingod.prototype.frostBreath = function(player) {
  console.log('The Reingod breathes frost!!\n');
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
    player.takeDamage(20);
  } else {
    console.log('You barely sidestep the beast\'s fury!\n');
  }
};

module.exports = Reingod;
