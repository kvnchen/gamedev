/*
 *  Handles logic such as turn order, combat state changes, win conditions, etc.
 *  
 *  want it to wait for player input before advancing turns/resolving combat states
 */

var _ = require('underscore'),
    util = require('../utils/util');

function advanceCombat(player, enemy) {
  var output = '';

  /*function endTurn() {
    whosTurn = (whosTurn + 1) % 2;
  }*/

  output = enemy.getAction(player);
  console.log(output);

  // Win/lose conditions
  if (player.currentHealth === 0) {
    console.log('Game over');
  } else {
    console.log('Victory!');
  }
};

module.exports = advanceCombat;
