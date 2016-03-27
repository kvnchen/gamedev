/*
 *  Get player input from stdin
 */

var _ = require('underscore');
var readline = require('readline');

function getPlayerInput(line, player, enemy) {
  function getTarget(str) {
    if (str === player.name) {
      return player;
    } else if (str === enemy.name) {
      return enemy;
    } else {
      return 'unknown';
    }
  }

  // expect format 'spell target <optional area>'
  var inputs = line.split(' ');
  if (inputs.length < 2) {
    return player.name + ' panicked and failed to act!';
  }

  var target = getTarget(inputs[1]);
  if (target === 'unknown') {
    return player.name + ' casts a spell on nobody.';
  } 

  if (target === enemy && inputs.length >= 3) {
    return player.castSpell(inputs[0],target,inputs[2]);
  } else {
    return player.castSpell(inputs[0],target);
  }
}

module.exports = getPlayerInput;
