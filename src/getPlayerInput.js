/*
 *  Get player input from stdin
 */

var _ = require('underscore');
var readline = require('readline');

function getPlayerInput(player, enemy) {
  // temp no-internet workaround. burn them all muahahahaahaaaa
  /*if (player.currentHealth <= 10) {
    return player.castSpell('Heal',player);
  }
  if (_.contains(player.getDebuffs(), 'frozen')) {
    if (player.currentHealth - 10 <= 5) {
      return player.castSpell('Heal',player);
    } else {
      return player.castSpell('Ignite',player);
    }
  }
  return player.castSpell('Ignite',enemy,'wound');*/

  var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
  });

  function getTarget(str) {
    if (str === player.name) {
      return player;
    } else if (str === enemy.name) {
      return enemy;
    } else {
      return 'unknown';
    }
  }

  rl.on('line', function(line){
    if (line === 'quit') {
      console.log('Thank you for playing this demo!');
    } else {
      // expect format 'spell target <optional area>'
      var inputs = line.split(' ');
      if (inputs.length < 2) {
        return player.name + 'panicked and failed to act!';
      }

      var target = getTarget(inputs[1]);
      if (target === 'unknown') {
        return player.name + 'casts a spell on nobody.';
      } 

      if (target === enemy && inputs.length >= 3) {
        return player.castSpell(inputs[0],target,inputs[2]);
      } else {
        return player.castSpell(inputs[0],target);
      }
    }
    rl.close();
  });
}

module.exports = getPlayerInput;
