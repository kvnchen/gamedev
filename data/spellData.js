/*
 *  Spell data
 *  
 *  The keys are in Pascal case because turning just the first letter
 *  to lower case is bad performance.
 *
 *  We could avoid all string manipulation by using ids, but we'll see how things go
 */

var spell = {
  Heal: {
    name: 'Heal',
    description: 'Repairs the body, closing wounds and restoring stamina.',
    damage: 0,
    heal: 6,
    buffs: [],
    debuffs: [],
    removesBuffs: [],
    removesDebuffs: []
  },
  Push: {
    name: 'Push',
    description: 'Forcefully thrusts the target away from the caster. Can knock down weaker opponents.',
    damage: 0,
    heal: 0,
    buffs: [],
    debuffs: [],
    removesBuffs: [],
    removesDebuffs: []
  },
  Pull: {
    name: 'Pull',
    description: 'Draws the target towards the caster.',
    damage: 0,
    heal: 0,
    buffs: [],
    debuffs: [],
    removesBuffs: [],
    removesDebuffs: []
  },
  Ignite: {
    name: 'Ignite',
    description: 'Burns the target.',
    damage: 8,
    heal: 0,
    buffs: [],
    debuffs: [],
    removesBuffs: [],
    removesDebuffs: ['frozen']
  },
};

module.exports = spell;
