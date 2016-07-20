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
      gameState = 'getName',
      introCounter = 0;

  var introMessages = [
    'This is a brief summary of your avatar:\n',
    '\nHmm, it seems trouble has arrived.\nThis will be your opponent:\n',
    '\nI wish you the best of luck.\n'
  ];

  var introStatuses = [
    player,
    enemy
  ];

  // Intro - get player name
  console.log('\nWelcome to this demo!\n\nWhat is your name?\n');
  rl.setPrompt('Your name > ');
  rl.prompt();


  function getName(line) {
    if (line === '') {
      console.log('Your name, oh silent one?\n');
      rl.prompt();
    } else {
      console.log('\nGreetings, ' + line + '!\n');
      player.name = line;
      gameState = 'intro';

      rl.setPrompt('Press enter to continue.');
      intro();
    }
  }

  // Exposition dump, feed user info in blocks when user presses enter
  function intro() {
    if (introCounter === 2) {
      console.log(introMessages[introCounter]);
      gameState = 'combat';
      rl.setPrompt('Your command > ');
      rl.prompt();
    } else {
      console.log(introMessages[introCounter]);
      console.log(introStatuses[introCounter].getStatus());
      
      introCounter++;
      rl.prompt();
    }
  }
  
  // Checks if combat should end
  function checkGameOver() {
    if (player.currentHealth === 0) {
      console.log('Game over');
      gameState = 'lose';
      return true;
    } else if (enemy.currentHealth === 0 || enemy.isPacified) {
      console.log('Victory!');
      gameState = 'win';
      return true;
    } else {
      return false;
    }
  }

  function gameOver() {
    var msg;
    if (gameState === 'lose') {
      msg = '\nWould you like to retry?\nYes (y) / No (n)\n';
    } else {
      msg = '\nWould you like to play again?\nYes (y) / No (n)\n';
    }
    gameState = 'retry';

    console.log(msg);
    rl.prompt();
  }

  // Combat input handler
  function handleCombat(line) {
    output = player.getAction(line, enemy);
    console.log(output);
    
    if (checkGameOver()) {
      gameOver();
      return;
    }

    output = enemy.getAction(player);
    console.log(output);

    if (checkGameOver()) {
      gameOver();
      return;
    }
    
    rl.prompt();
  }

  function help() {
    var helpMsg = '\nFor a summary of your player status, type \'status\'\n' +
                  '\nTo see the enemy status, type \'status\' followed by the enemy name.\nExample: \'status reingod\'\n' +
                  '\nTo cast a spell, type the spell name, followed by the target, and optionally a target area.\n' + 
                  '\nExample: To cast the spell \'Ignite\' on Reingod, type \'ignite reingod\'\n' + 
                  '\nExample 2: \'pull reingod wound\'\n';
    console.log(helpMsg);
    rl.prompt();
  }

  function getStatus(inputs) {
    if (inputs.length === 1) {
      console.log('\n' + player.getStatus());
    } else {
      console.log('\n' + enemy.getStatus());
    }
  }

  function resetCombat() {
    player.reset();
    enemy.reset();

    console.log(player.getStatus());
    console.log(enemy.getStatus());
    
    gameState = 'combat';
    console.log('Good luck\n');

    rl.prompt();
  }

  // handle player input
  rl.on('line', function(line){
    if (line === 'quit' || line === 'exit' || line === 'close' || line === 'fuck' || line === 'this game is garbage') {
      rl.close();
    } else {
      var inputs = line.split(' ');
      if (line === '' && gameState !== 'intro') {
        console.log('\nType help for a list of commands.\n');
        rl.prompt();
      } else if (line === 'help') {
        help();
      } else if (inputs[0] === 'status') {
        getStatus(inputs);
        rl.prompt();
      } else if (line === 'skip' || line === 's') {
        if (gameState === 'intro') {
          introCounter = 2;
          intro();
        } else {
          console.log('Can\'t skip this part.\n');
          rl.prompt();
        }
      } else if (gameState === 'retry') {
        if (line === 'y' || line === 'yes') {
          resetCombat();
        } else {
          rl.close();
        }
      } else if (gameState === 'getName') {
        getName(line);
      } else if (gameState === 'intro') {
        intro();
      } else {
        handleCombat(line);
      }
    }
  }).on('close',function() {
    console.log('\nThank you for playing this demo!\n');
  });
};

module.exports = startGame;
