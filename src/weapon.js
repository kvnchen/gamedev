/*
 *  The weapon class
 */

function Weapon(name, options) {
  this.name = name;
  if (options) {
    this.buyValue = options.buyValue;
    this.sellValue = options.sellValue;
    this.description = options.description;  
  } else {
    this.buyValue = 0;
    this.sellValue = 0;
    this.description = '';  
  }
}

module.exports = Weapon;
