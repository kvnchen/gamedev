/*
 *  Enemy Class
 *
 *  Unlike weapons or armor, most enemies will extend this generic class instead of 
 *  simply being defined in a data file. 
 */

var _ = require('underscore');

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

Enemy.prototype.getArrProps = function(prop) {
  if (this[prop].length === 0) {
    return 'none';
  } else {
    var str = '';
    _.each(this[prop], function(p) {
      str += p +', ';
    });
    return str;
  }
};

Enemy.prototype.getStatus = function() {
  var status = 'Status of ' + this.name + ':\n';

  status += 'Current health: ' + this.currentHealth + '/' + this.maxHealth + '\n';
  status += 'Targetable areas: ' + this.getArrProps('targetAreas') + '\n';
  status += 'Attacks: ' + this.getArrProps('attacks') + '\n';
  status += 'Gold reward: ' + this.goldDrop + '\n';

  return status;
};

module.exports = Enemy;
