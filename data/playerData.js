/*
 *  Store saved player data here
 *
 *  Would this perform better if it were a .json or .txt file?
 */

function getPlayerData() {
  var playerData = {
    name: 'Kelvin', // overwritten in current demo
    maxHealth: 20,
    currentHealth: 20,
    weapon: 'Forked Oak Staff',
    armor: 'Novice Robes',
    runes: [],
    debuffs: [],
    spells: ['Push', 'Pull', 'Ignite', 'Heal'],
    gold: 30
  };

  return playerData;
}

module.exports = getPlayerData;
