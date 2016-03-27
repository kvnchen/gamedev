// This is the beginning of my game project
// First milestone is to make a playable command-line version of the demo
// next deadline April 1st 2016.

var Player = require('./player'),
    boss = require('./bossRein'),
    gameController = require('./gameController'),
    getPlayerInput = require('./getPlayerInput'),
    kelvin = new Player('kelvin'),
    reingod = new boss();

var output = kelvin.getStatus() + '\n'
           + reingod.getStatus() + '\n'

/*          // healing
          + kelvin.castSpell('Heal', kelvin) + '\n'

          // combat simulation
           + kelvin.castSpell('Push',reingod,'wound') + '\n'
           + reingod.frostBreath(kelvin) + '\n'
           //+ kelvin.castSpell('Ignite',reingod,'wound') + '\n'

           // test debuff removal via self cast
           + kelvin.castSpell('Ignite',kelvin)

           // Test pacifist branch
           //+ kelvin.castSpell('Pull',reingod,'wound') + '\n'
           //+ kelvin.castSpell('Heal',reingod,'wound') + '\n';

           // test instant kill branch
           //+ kelvin.castSpell('Ignite',reingod,'wound') + '\n'
           //+ kelvin.castSpell('Push',reingod,'wound') + '\n';

           // test slow bleed branch
           //+ kelvin.castSpell('Push',reingod,'wound') + '\n';


           + reingod.charge(kelvin) + '\n';*/
console.log(output);

// gameController test
//gameController(kelvin, reingod);


var readline = require('readline');
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

rl.setPrompt('Your command > ');
rl.prompt();

rl.on('line', function(line){
  if (line === 'quit') {
    rl.close();
  } else {
    //console.log('kelvin says ' + line);

    console.log(getPlayerInput(line,kelvin,reingod));

    rl.prompt();    
  }
}).on('close',function() {
  console.log('Thank you for playing this demo!');
});

/*var name = '';
var gameLine = 'What is your name?';
console.log(gameLine);


rl.on('line', function(line){
  // Get player name
  if (gameLine === 'What is your name?' || gameLine === 'Your full name, please') {
    if (line === '') {
      gameLine = 'Your full name, please';
      console.log(gameLine);
    } else {
      name = line;
      console.log('Hello, ' + name);
      gameLine = 'Issue your commands.';
      console.log(gameLine);
    }
  }

  else if (gameLine = 'Issue your command.') {
    if (line === 'quit') {
      console.log('Thank you for playing this demo!');
      rl.close();
    } else {
      console.log('Kelvin: ' + line);
    }
  }
});*/
