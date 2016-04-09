/*
 *  Reindeer god boss
 */

var enemy = require('./enemy'),
    _ = require('underscore');

function Reingod() {
  enemy.call(this, 'Reingod');
  this.maxHealth = 128;
  this.currentHealth = 128;
  this.goldDrop = 10000;
  this.targetAreas = ['face', 'wound'];
  this.attacks = ['Charge', 'Frost Breath'];
  this.validSpellTargets = {
    face: ['Ignite'],
    wound: ['Ignite','Push','Pull','Heal']
  };
  this.woundState = 'frozen';
  this.frostCounter = 0;
}

Reingod.prototype = Object.create(enemy.prototype);

Reingod.prototype.constructor = Reingod;

Reingod.prototype.resolveSpell = function (spell, area) {
  var outputStr = '';
  if (!_.contains(this.targetAreas, area)) {
    outputStr = 'The spell misses wildly. Reingod stares blankly.\n';
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
    outputStr = this.takeDamage(spell.damage);
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
        this.woundState = 'embedded';
        outputStr = 'Blazing heat melts the ice away! Blood begins to flow...\n'
                  + this.gainDebuff('bleeding')
                  + this.takeDamage(spell.damage);
      } else {
        outputStr = 'Whatever you tried to do, it had no effect.\n';
      }
    } 

    // embedded
    else if (this.woundState === 'embedded') {
      if (spell.name === 'Pull') {
        this.woundState = 'raw';
        outputStr = 'Metal is freed from flesh, with a terrible squelch!\n'
                  + this.takeDamage(20);
      } else if (spell.name === 'Push') {
        this.woundState = 'embedded deeply';
        outputStr = 'The blade is thrust deeper! The Reingod howls in pain!\nBlood flow intensifies.\n'
                  + this.removeDebuff('bleeding')
                  + this.gainDebuff('bleedingHeavy')
                  + this.takeDamage(40);
      } else if (spell.name === 'Heal') {
        outputStr = 'The axe is still preventing the wound from closing.\n';
      } else if (spell.name === 'Ignite') {
        this.woundState = 'embedded hot';
        outputStr = 'The axe head glows with heat. The bleeding ceases as flesh is singed.\n' 
                  + this.removeDebuff('bleeding') 
                  + this.takeDamage(spell.damage + 20);
      } else {
        outputStr = 'Whatever you tried to do, it had no effect.\n';
      }
    }

    // raw
    else if (this.woundState === 'raw') {
      if (spell.name === 'Heal') {
        outputStr = this.takeHeal(spell.heal);
        this.isPacified = true;
        outputStr += 'The wound closes.\nThe Reingod no longer wishes to kill you!\n';
      } else if (spell.name === 'Ignite') {
        outputStr = 'You burn the raw wound.\n'
                  + this.takeDamage(spell.damage + 5);
      } else {
        outputStr = 'Whatever you tried to do, it had no effect.\n';
      } 
    }
    
    // embedded hot
    else if (this.woundState === 'embedded hot') {
      if (spell.name === 'Push') {
        outputStr = 'The burning blade strikes deep, and the Reingod collapses!\n'
                  + this.takeDamage(200);
      } else if (spell.name === 'Pull') {
        this.woundState = 'raw';
        outputStr = 'Metal is freed from flesh, with a terrible squelch!\n'
                  + this.takeDamage(20);
      } else if (spell.name === 'Heal') {
        outputStr = 'Strangely enough, a burning-hot axehead is not condusive to healing.';
      } else if (spell.name === 'Ignite') {
        outputStr = 'The axe cannot get any hotter from these flames.';
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
        outputStr = 'It\'s a little to late for that now...\n';
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
  var outputStr = 'The Reingod breathes frost!!\nThe ground, and your legs, freeze over.\n'
                + player.gainDebuff('frozen')
                + player.takeDamage(5);

  return outputStr;
};

Reingod.prototype.charge = function(player) {
  var playerDebuffs = player.getDebuffs(),
      outputStr = 'The Reingod charges!!\n';

  if (_.contains(playerDebuffs, 'frozen')) {
    outputStr += 'The frost encases your legs, preventing movement! Brace yourself...\n'
              + 'A devastating blow!\n'
              + player.removeDebuff('frozen')
              + player.takeDamage(20);
  } else {
    outputStr += 'You barely sidestep the beast\'s fury!\n';
  }

  return outputStr;
};

/*  Implement me!
 */
Reingod.prototype.getAction = function(player) {
  if (this.frostCounter === 3) {
    this.frostCounter = 0;
    return this.charge(player);
  } else if (this.frostCounter === 2) {
    this.frostCounter++;
    return this.frostBreath(player) + '\nReingod lowers its head, pointing its antlers towards you.\n';
  } else {
    this.frostCounter++;
    return this.frostBreath(player);
  }
};

module.exports = Reingod;
