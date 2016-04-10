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
  this.isPacified = false;
}

Enemy.prototype.takeDamage = function(dmg) {
  var outputStr = '';
  this.currentHealth -= dmg;
  outputStr = this.name + ' takes ' + dmg + ' damage. (' + this.currentHealth + '/' + this.maxHealth + ')\n';
  if (this.currentHealth <= 0) {
    this.currentHealth = 0;
    outputStr += this.name + ' is defeated!\n';
  }
  return outputStr;
};

Enemy.prototype.takeHeal = function(heal) {
  this.currentHealth += heal;
  if (this.currentHealth >= this.maxHealth) {
    this.currentHealth = this.maxHealth;
  }
  return this.name + ' gains ' + heal + ' life. (' + this.currentHealth + '/' + this.maxHealth + ')\n';
};

Enemy.prototype.gainDebuff = function(debuff) {
  var outputStr = '';
  if (!_.contains(this.debuffs, debuff)) {
    this.debuffs.push(debuff);
    outputStr = this.name + ' gains debuff ' + debuff + '\n';
  } else {
    // do something different if creature already has debuff
  }
  return outputStr;
};

Enemy.prototype.removeDebuff = function(debuff) {
  var index = _.indexOf(this.debuffs, debuff),
      outputStr = '';
  if (index !== -1) {
    this.debuffs.splice(index, 1);
    outputStr = this.name + ' loses debuff ' + debuff + '\n';
  }
  return outputStr;
};

Enemy.prototype.resolveSpell = function(spell, area) {
  var outputStr = '';
  if (!_.contains(this.targetAreas, area)) {
    outputStr = 'The spell misses wildly.\n';
  } else {
    // handle spell based on area targeted
  }
  return outputStr;
};

Enemy.prototype.getStatus = function() {
  var status = 'Status of ' + this.name + ':\n';

  status += 'Current health: ' + this.currentHealth + '/' + this.maxHealth + '\n';
  status += 'Targetable areas: ' + util.getArrayProp(this.targetAreas) + '\n';
  status += 'Attacks: ' + util.getArrayProp(this.attacks) + '\n';
  status += 'Gold reward: ' + this.goldDrop + '\n';
  status += 'Debuffs: ' + util.getArrayProp(this.debuffs) + '\n';

  return status;
};

Enemy.prototype.handleDebuffs = function() {
  var self = this;
  var outputStr = '';
  _.each(self.debuffs, function(debuff) {
    if (debuff === 'bleeding') {
      outputStr += self.name + ' bleeds. ' + self.takeDamage(3);
    } else if (debuff === 'bleedingHeavy') {
      outputStr += self.name + ' bleeds heavily. ' + self.takeDamage(6);
    } else {

    }
  });

  return outputStr;
};

module.exports = Enemy;
