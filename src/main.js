// This is the beginning of my game project
// Current goal: wrap up command line boss-fight, quality of life features
// Stretch goal: prototype winter-forest adventure area
// Deadline: End of April

var Player = require('./player'),
    boss = require('./bossRein'),
    gameController = require('./gameController'),
    kelvin = new Player('kelvin'),
    reingod = new boss();

/*var output = '\n' + kelvin.getStatus() + '\n'
           + reingod.getStatus() + '\n'

          // healing
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


           + reingod.charge(kelvin) + '\n';
console.log(output);*/



// entry point
gameController(kelvin, reingod);
