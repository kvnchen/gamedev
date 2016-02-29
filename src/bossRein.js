/*
 *  Reindeer god boss
 *
 *  I still don't have a good name for it shit
 */

var enemy = require('./enemy');

function Reingod() {
  enemy.call(this, 'Reingod');
  this.maxHealth = 64;
  this.currentHealth = 64;
  this.goldDrop = 1000;
}

Reingod.prototype = Object.create(enemy.prototype);

Reingod.prototype.constructor = Reingod;

module.exports = Reingod;
