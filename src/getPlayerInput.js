/*
 *  Get player input from stdin
 */

// temp no-internet workaround. burn them all muahahahaahaaaa
function getPlayerInput(player, enemy) {
  return player.castSpell('Ignite',enemy,'wound');
}

module.exports = getPlayerInput;