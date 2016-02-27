/*
 *  Store Player Data here
 */

function getPlayerData() {
  var playerData = {
    name: 'Kelvin',
    maxHealth: '20',
    currentHealth: '19',
    weapon: 'Forked Oak Staff',
    armor: 'Novice Robes',
    runes: [],
    spells: []
  };

  return playerData;
}

module.exports = getPlayerData;
