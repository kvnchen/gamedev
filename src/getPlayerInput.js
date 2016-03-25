/*
 *  Get player input from stdin
 */

var _ = require('underscore');

// temp no-internet workaround. burn them all muahahahaahaaaa
function getPlayerInput(player, enemy) {
  if (player.currentHealth <= 10) {
    return player.castSpell('Heal',player);
  }
  if (_.contains(player.getDebuffs(), 'frozen')) {
    if (player.currentHealth - 10 <= 5) {
      return player.castSpell('Heal',player);
    } else {
      return player.castSpell('Ignite',player);
    }
  }
  return player.castSpell('Ignite',enemy,'wound');
}

module.exports = getPlayerInput;
