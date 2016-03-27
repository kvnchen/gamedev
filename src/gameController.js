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

  rl.on('line', function(line){
    if (line === 'quit') {
      rl.close();
    } else {
      output = getPlayerInput(line,player,enemy);
      output += '\n' + enemy.getAction(player);

      console.log(output);
      
      if (player.currentHealth === 0) {
        console.log('\nGame over');
        rl.close();
      } else if (enemy.currentHealth === 0) {
        console.log('\nVictory!');
        rl.close();
      } else {
        rl.prompt();
      }
    }
  }).on('close',function() {
    console.log('Thank you for playing this demo!');
  });
};

module.exports = startCombat;
