/*
 *  The spell class
 *
 *  All spells are composed of three runes: The BASE, BODY, and FOCUS.
 */

 function Spell(name, options) {
  this.name = name;
  if (options) {
    this.description = options.description;
    this.damage = options.damage;
    this.heal = options.heal;
    this.buffs = options.buffs;
    this.debuffs = options.debuffs;
  } else {
    this.description = '';
    this.damage = 0;
    this.heal = 0;
    this.buffs = [];
    this.debuffs = [];
  }

  this.base = undefined;
  this.body = undefined;
  this.focus = undefined;
  this.type = undefined;
  this.school = undefined;
}

module.exports = Spell;
