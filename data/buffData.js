/*
 *  Buff data
 *  
 *  The keys are in Pascal case because turning just the first letter
 *  to lower case is bad performance.
 *
 *  We could avoid all string manipulation by using ids, but we'll see how things go
 */

var buffs = {
  guard: {
    name: 'Guard',
    description: 'A defensive stance, will dodge the next attack.',
    damagePerTurn: 0,
    healPerTurn: 0
  }
};

module.exports = buffs;
