/*
 *  The spell class
 *
 *  All spells are composed of three runes: The BASE, BODY, and FOCUS.
 */

 function Spell() {
  this.base = '';
  this.body = '';
  this.focus = '';
  this.type = '';
  this.school = '';
}

module.exports = Spell;
