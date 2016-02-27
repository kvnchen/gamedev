/*
 *  The spell class
 *
 *  All spells are composed of three runes: The BASE, BODY, and FOCUS.
 */

 function Spell(name) {
  this.name = name;
  this.base = undefined;
  this.body = undefined;
  this.focus = undefined;
  this.type = undefined;
  this.school = undefined;
}

module.exports = Spell;
