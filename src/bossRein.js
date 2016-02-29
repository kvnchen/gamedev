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

Reingod.prototype.charge = function(player) {
  var playerDebuffs = player.getDebuffs();
  console.log('The Reingod charges!!\n');

  if (_.contains(playerDebuffs, 'frozen')) {
    player.takeDamage(20);
    console.log('A devastating blow!\n');
  } else {
    console.log('A narrow escape...\n');
  }
};

module.exports = Reingod;
