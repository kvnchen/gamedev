/*
 *  Store saved player data here
 *
 *  Would this perform better if it were a .json or .txt file?
 */

function getPlayerData() {
  var playerData = {
    name: 'Kelvin',
    maxHealth: '20',
    currentHealth: '19',
    weapon: 'Forked Oak Staff',
    armor: 'Novice Robes',
    runes: [],
    spells: ['Push', 'Pull', 'Ignite', 'Heal']
  };

  return playerData;
}

module.exports = getPlayerData;
