/*
 *  Enemy Class
 *
 *  Unlike weapons or armor, most enemies will extend this generic class instead of 
 *  simply being defined in a data file. 
 */

var _ = require('underscore'),
    util = require('../utils/util');

function Enemy(name) {
  this.name = name;
  this.maxHealth = 1;
  this.currentHealth = 1;
  this.targetAreas = [];
  this.attacks = [];
  this.buffs = [];
  this.debuffs = [];
  this.goldDrop = 0;
  this.itemDrops = [];
}

Enemy.prototype.takeDamage = function(dmg) {
  this.currentHealth -= dmg;
  console.log(this.name + ' take ' + dmg + ' damage.');
  if (this.currentHealth <= 0) {
    this.currentHealth = 0;
    console.log(this.name + ' is defeated!');
  }
};

Enemy.prototype.gainDebuff = function(debuff) {
  if (!_.contains(this.debuffs, debuff)) {
    this.debuffs.push(debuff);
  } else {
    // do something different if creature already has debuff
  }
}

Enemy.prototype.getStatus = function() {
  var status = 'Status of ' + this.name + ':\n';

  status += 'Current health: ' + this.currentHealth + '/' + this.maxHealth + '\n';
  status += 'Targetable areas: ' + util.getArrayProp(this.targetAreas) + '\n';
  status += 'Attacks: ' + util.getArrayProp(this.attacks) + '\n';
  status += 'Gold reward: ' + this.goldDrop + '\n';

  return status;
};

module.exports = Enemy;
