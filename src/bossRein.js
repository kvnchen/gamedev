/*
 *  Reindeer god boss
 */

var enemy = require('./enemy'),
    _ = require('underscore');

function Reingod() {
  enemy.call(this, 'Reingod');
  this.maxHealth = 160;
  this.currentHealth = 160;
  this.goldDrop = 10000;
  this.targetAreas = ['face', 'wound'];
  this.attacks = ['Charge', 'Frost Breath'];
  this.validSpellTargets = {
    face: ['Ignite'],
    wound: ['Ignite','Push','Pull','Heal']
  };
  this.woundState = 'frozen';
  this.frostCounter = 0;
  this.axeTemp = 0;
  this.iceTemp = 0;
}

Reingod.prototype = Object.create(enemy.prototype);

Reingod.prototype.constructor = Reingod;

Reingod.prototype.resolveSpell = function (spell, area) {
  var outputStr = '';

  // default to face
  if (area === undefined) {
    area = 'face';
  }

  if (!_.contains(this.targetAreas, area)) {
    outputStr = 'The spell misses wildly.\n';
  } else {
    // handle spell based on area targeted
    if (area === 'wound') {
      outputStr += this.advanceWoundState(spell);
    } else {
      outputStr += this.hitFace(spell);
    }
  }
  return outputStr;
};

Reingod.prototype.hitFace = function(spell) {
  var outputStr = '';
  if (_.contains(this.validSpellTargets.face, spell.name)) {
    if (spell.name === 'Ignite') {
      if (this.frostCounter === 3) {
        this.frostCounter = -1;
        outputStr = 'The fire blinds Reingod, halting its charge!\n';
      }
      outputStr += this.takeDamage(spell.damage);
    } else {
      outputStr = 'How did you get to this branch of logic?\n';
    }
  } else {
    outputStr = 'That spell had no effect.\n';
  }

  return outputStr;
};

/*
 *  The writing is really cringy - rework at some point..
 */
Reingod.prototype.advanceWoundState = function(spell) {
  var outputStr = '';
  if (_.contains(this.validSpellTargets.wound, spell.name)) {

    // initial state
    if (this.woundState === 'frozen') {
      if (spell.name === 'Push' || spell.name === 'Pull') {
        outputStr = 'The ice and frozen blood lock the axe in place. It refuses to budge.\n';
      } else if (spell.name === 'Heal') {
        outputStr = 'The axe is preventing the wound from closing.\n';
      } else if (spell.name === 'Ignite') {
        if (this.iceTemp === 1) {
          this.woundState = 'embedded';
          outputStr = 'The heat melts the ice completely! Blood begins to flow.\n'
                    + this.gainDebuff('bleeding')
                    + this.takeDamage(spell.damage);
        } else {
          this.iceTemp++;
          outputStr = 'The encasing ice begins to melt.\n'
                    + this.takeDamage(spell.damage);
        }
      } else {
        outputStr = 'Whatever you tried to do, it had no effect.\n';
      }
    } 

    // embedded
    else if (this.woundState === 'embedded') {
      if (spell.name === 'Pull') {
        this.woundState = 'raw';
        outputStr = 'The axe is ripped from the flesh, exposing the ghastly wound!\n'
                  + this.takeDamage(16);
      } else if (spell.name === 'Push') {
        this.woundState = 'embedded deeply';
        outputStr = 'The blade is thrust deeper, and the creature howls in pain!\nBlood flow intensifies.\n'
                  + this.removeDebuff('bleeding')
                  + this.gainDebuff('bleedingHeavy')
                  + this.takeDamage(32);
      } else if (spell.name === 'Heal') {
        outputStr = 'The axe is still preventing the wound from closing.\n';
      } else if (spell.name === 'Ignite') {
        if (this.axeTemp === 1) {
          this.woundState = 'embedded hot';
          outputStr = 'The axe head burns with furious heat. The bleeding ceases as flesh is singed!\n' 
                    + this.removeDebuff('bleeding') 
                    + this.takeDamage(spell.damage + 8);
        } else {
          this.axeTemp++;
          outputStr = 'The axehead begins to glow.\n'
                    + this.takeDamage(spell.damage);
        }
      } else {
        outputStr = 'Whatever you tried to do, it had no effect.\n';
      }
    }

    // raw
    else if (this.woundState === 'raw') {
      if (spell.name === 'Heal') {
        outputStr = this.takeHeal(spell.heal);
        this.isPacified = true;
        outputStr += 'The wound closes.\nReingod no longer wishes to kill you!\n';
      } else if (spell.name === 'Ignite') {
        outputStr = 'You burn the raw wound.\n'
                  + this.takeDamage(spell.damage + 4);
      } else {
        outputStr = 'Whatever you tried to do, it had no effect.\n';
      } 
    }
    
    // embedded hot
    else if (this.woundState === 'embedded hot') {
      if (spell.name === 'Push') {
        outputStr = 'The burning weapon strikes deep, and the beast collapses!\n'
                  + this.takeDamage(200);
      } else if (spell.name === 'Pull') {
        this.woundState = 'raw';
        outputStr = 'The axe is ripped from the flesh, exposing the ghastly wound!\n'
                  + this.takeDamage(16);
      } else if (spell.name === 'Heal') {
        outputStr = 'If you wanted to help him, maybe you shouldn\'t have set the axe on fire.\n';
      } else if (spell.name === 'Ignite') {
        outputStr = 'The axe cannot get any hotter from these flames.\n';
      } else {
        outputStr = 'Whatever you tried to do, it had no effect.\n';
      }
    }

    // embedded deeply
    else if (this.woundState === 'embedded deeply') {
      if (spell.name === 'Push') {
        outputStr = 'The axe can go no deeper.\n';
      } else if (spell.name === 'Pull') {
        outputStr = 'It won\'t budge.\n';
      } else if (spell.name === 'Heal') {
        outputStr = 'It\'s a little too late for that now.\n';
      } else if (spell.name === 'Ignite') {
        outputStr = this.takeDamage(spell.damage);
      } else {
        outputStr = 'Whatever you tried to do, it had no effect.\n';
      }
    }
  } else {
    outputStr = 'That spell had no effect.\n';
  }
  return outputStr;
};

Reingod.prototype.frostBreath = function(player) {
  var outputStr = 'Reingod breathes frost!!\nThe ground, and your legs, freeze over.\n'
                + player.gainDebuff('frozen')
                + player.takeDamage(4);

  return outputStr;
};

Reingod.prototype.charge = function(player) {
  var playerDebuffs = player.getDebuffs(),
      outputStr = 'Reingod charges!!\n';

  if (_.contains(playerDebuffs, 'frozen')) {
    outputStr += 'The frost encases your legs, preventing movement!\n'
              + player.removeDebuff('frozen')
              + player.takeDamage(16);
  } else {
    outputStr += 'You barely sidestep the beast\'s fury!\n';
  }

  return outputStr;
};

/*  Implement me!
 */
Reingod.prototype.getAction = function(player) {
  // first take bleed damage, if applicable
  var outputStr = this.handleDebuffs();

  if (this.frostCounter === 3) {
    this.frostCounter = 0;
    outputStr += this.charge(player);
  } else if (this.frostCounter === 2) {
    this.frostCounter++;
    outputStr += this.frostBreath(player) + '\nReingod lowers its head, pointing its antlers towards you.\n';
  } else if (this.frostCounter === -1) {
    this.frostCounter++;
  } else {
    this.frostCounter++;
    outputStr += this.frostBreath(player);
  }

  return outputStr;
};

module.exports = Reingod;
