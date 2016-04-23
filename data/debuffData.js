/*
 *  Debuff data
 *  
 *  The keys are in Pascal case because turning just the first letter
 *  to lower case is bad performance.
 *
 *  We could avoid all string manipulation by using ids, but we'll see how things go
 */

var debuffs = {
  frozen: {
    name: 'Frozen',
    description: 'Legs frozen solid, preventing movement.',
    damagePerTurn: 0,
    healPerTurn: 0
  },
  bleeding: {
    name: 'Bleeding',
    description: 'You are bleeding! Take a small amount of damage each turn.',
    damagePerTurn: 2,
    healPerTurn: 0
  },
  bleedingHeavy: {
    name: 'Bleeding Heavily',
    description: 'You are bleeding badly! Take a moderate amount of damage each turn.',
    damagePerTurn: 3,
    healPerTurn: 0
  },
};

module.exports = debuffs;
