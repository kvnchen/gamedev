/*
 *  Armor data
 *  
 *  The keys are in Pascal case because turning just the first letter
 *  to lower case is bad performance.
 *
 *  We could avoid all string manipulation by using ids, but we'll see how things go
 */

var armor = {
  NoviceRobes: {
    name: 'Novice Robes',
    description: 'A simple, comfortable robe, allowing unrestricted movement. Not very effective against anything sharp or pointy.',
    buyValue: 10,
    sellValue: 5
  }
};

module.exports = armor;
