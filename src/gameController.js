/*
 *  Handles logic such as turn order, combat state changes, win conditions, etc.
 *  
 *
 */

var _ = require('underscore'),
    util = require('../utils/util');

function combatController(player, enemy) {
  // 0: player, 1: enemy
  // for now player always goes first
  var whosTurn = 0,
      output = '';

  function endTurn() {
    whosTurn = (whosTurn + 1) % 2;
  }

  while (player.currentHealth !== 0 && enemy.currentHealth !== 0) {
    if (whosTurn === 0) {
      output = player.getAction(enemy);
    } else {
      output = enemy.getAction(player);
    }
    console.log(output);
    output = '';
    endTurn();
  }

  // Win/lose conditions
  if (player.currentHealth === 0) {
    console.log('Game over');
  } else {
    console.log('Victory!');
  }
};

module.exports = combatController;
