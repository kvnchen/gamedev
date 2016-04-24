/*
 *  Handles logic such as turn order, combat state changes, win conditions, etc.
 */

var _ = require('underscore'),
    util = require('../utils/util'),
    readline = require('readline'); 

function startGame(player, enemy) {
  var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
  });

  var output = '',
      gameState = 'intro';


  // Intro - get player name
  console.log('\nWelcome to this demo!\n\nWhat is your name?\n');

  rl.setPrompt('Your name > ');
  rl.prompt();


  // sets the player name and displays short intro
  function intro(line) {
    if (line === '') {
      console.log('Your name, oh silent one?\n');
      rl.prompt();
    } else {
      console.log('\nGreetings, ' + line + '!\n');
      gameState = 'combat';

      console.log('This is a brief summary of your avatar:\n');
      player.name = line;
      console.log(player.getStatus());

      console.log('Hmm, it seems trouble has arrived.');
      console.log('This will be your opponent:\n');
      console.log(enemy.getStatus());
      console.log('\nI wish you the best of luck.\n');
      
      rl.setPrompt('Your command > ');
      rl.prompt();
    }
  }
  

  // Checks if combat should end
  function checkGameOver() {
    if (player.currentHealth === 0) {
      console.log('Game over');
      return true;
    } else if (enemy.currentHealth === 0 || enemy.isPacified) {
      console.log('Victory!');
      return true;
    } else {
      return false;
    }
  }

  // Combat input handler
  function handleCombat(line) {
    output = player.getAction(line, enemy);
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

  function help() {
    console.log('\n<To do>\n');
    rl.prompt();
  }

  // get player input
  rl.on('line', function(line){
    if (line === 'quit' || line === 'exit' || line === 'close') {
      rl.close();
    } else {
      if (line === 'help') {
        help();
      } else if (line === '') {
        console.log('\nType help for a list of commands.\n');
        rl.prompt();
      } else if (gameState === 'intro') {
        intro(line);
      } else {
        handleCombat(line);
      }
    }
  }).on('close',function() {
    console.log('\nThank you for playing this demo!\n');
  });
};

module.exports = startGame;
