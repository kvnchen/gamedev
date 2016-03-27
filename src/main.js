// This is the beginning of my game project
// First milestone is to make a playable command-line version of the demo
// next deadline April 1st 2016.

var Player = require('./player'),
    boss = require('./bossRein'),
    gameController = require('./gameController'),
    kelvin = new Player('kelvin'),
    reingod = new boss();

var output = '\n' + kelvin.getStatus() + '\n'
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
gameController(kelvin, reingod);


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
});*/
