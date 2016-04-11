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

// debuff is the string name of the debuff
Enemy.prototype.gainDebuff = function(debuff) {
  var outputStr = '',
      debuffObj = util.getDebuff(debuff);
  if (!_.contains(this.debuffs, debuffObj)) {
    this.debuffs.push(debuffObj);
    outputStr = this.name + ' gains debuff ' + debuffObj.name + '\n';
  } else {
    // do something different if creature already has debuff
  }
  return outputStr;
};

Enemy.prototype.removeDebuff = function(debuff) {
  var debuffObj = util.getDebuff(debuff),
      index = _.indexOf(this.debuffs, debuffObj),
      outputStr = '';
  if (index !== -1) {
    this.debuffs.splice(index, 1);
    outputStr = this.name + ' loses debuff ' + debuffObj.name + '\n';
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
    if (debuff.name === 'Bleeding') {
      outputStr += self.name + ' bleeds. ' + self.takeDamage(debuff.damagePerTurn);
    } else if (debuff.name === 'Bleeding Heavily') {
      outputStr += self.name + ' bleeds heavily. ' + self.takeDamage(debuff.damagePerTurn);
    } else {

    }
  });

  return outputStr;
};

module.exports = Enemy;
