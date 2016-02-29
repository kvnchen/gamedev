/*
 *  Store saved player data here
 *
 *  Would this perform better if it were a .json or .txt file?
 */

function getPlayerData() {
  var playerData = {
    name: 'Kelvin',
    maxHealth: '25',
    currentHealth: '19',
    weapon: 'Forked Oak Staff',
    armor: 'Novice Robes',
    runes: [],
    debuffs: ['frozen'],
    spells: ['Push', 'Pull', 'Ignite', 'Heal'],
    gold: 30
  };

  return playerData;
}

module.exports = getPlayerData;
