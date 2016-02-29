/*
 *  Enemy Class
 *
 *  Unlike weapons or armor, most enemies will extend this generic class instead of 
 *  simply being defined in a data file. 
 */

function Enemy(name) {
  this.name = name;
  this.maxHealth = 1;
  this.currentHealth = 1;
  this.buffs = [];
  this.debuffs = [];
  this.goldDrop = 0;
  this.itemDrops = [];
}

Enemy.prototype.getStatus = function() {
  var status = 'Status of ' + this.name + ':\n';

  status += 'Current health: ' + this.currentHealth + '/' + this.maxHealth + '\n';

  return status;
};

module.exports = Enemy;
