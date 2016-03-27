/*
 *  Handles logic such as turn order, combat state changes, win conditions, etc.
 *  
 *  want it to wait for player input before advancing turns/resolving combat states
 */

var _ = require('underscore'),
    util = require('../utils/util'),
    getPlayerInput = require('./getPlayerInput'),
    readline = require('readline'); 

function startCombat(player, enemy) {
  var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
  });

  var output = '';

  rl.setPrompt('Your command > ');
  rl.prompt();

  function checkGameOver() {
    if (player.currentHealth === 0) {
      console.log('Game over');
      return true;
    } else if (enemy.currentHealth === 0) {
      console.log('Victory!');
      return true;
    } else {
      return false;
    }
  }

  rl.on('line', function(line){
    if (line === 'quit') {
      rl.close();
    } else {
      output = getPlayerInput(line,player,enemy);
      console.log(output);
      
      if (checkGameOver()) {
        rl.close();
        return;
      }

      output = enemy.getAction(player);
      console.log(output);

      if (checkGameOver()) {
        rl.close();
        return;
      }
      
      rl.prompt();
    }
  }).on('close',function() {
    console.log('\nThank you for playing this demo!\n');
  });
};

module.exports = startCombat;
