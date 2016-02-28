/*
 *  Weapon data
 *  
 *  The keys are in Pascal case because turning just the first letter
 *  to lower case is bad performance.
 *
 *  We could avoid all string manipulation by using ids, but we'll see how things go
 */

var weapons = {
  ForkedOakStaff: {
    name: 'Forked Oak Staff',
    buyValue: 0,
    sellValue: 100,
    description: 'A rustic staff made from a golden-brown oak shaft. The head forks into two branches.'
  }
};

module.exports = weapons;
