// This is the beginning of my game project
// First milestone is to make a playable command-line version of the demo
// Deadline is Tuesday March 1st 2016 lmao
// next deadline April 1st 2016. 

var Player = require('./player.js'),
    boss = require('./bossRein.js'),
    kelvin = new Player('kelvin'),
    reingod = new boss();

var output = kelvin.getStatus() + '\n'
           + reingod.getStatus() + '\n'

          // healing
          + kelvin.castSpell('Heal', kelvin) + '\n'

          // combat simulation
           + kelvin.castSpell('Push',reingod,'wound') + '\n'
           + reingod.frostBreath(kelvin) + '\n'
           //+ kelvin.castSpell('Ignite',reingod,'wound') + '\n'

           // test debuff removal via self cast
           + kelvin.castSpell('Ignite',kelvin);

           // Test pacifist branch
           //+ kelvin.castSpell('Pull',reingod,'wound') + '\n'
           //+ kelvin.castSpell('Heal',reingod,'wound') + '\n';

           // test instant kill branch
           //+ kelvin.castSpell('Ignite',reingod,'wound') + '\n'
           //+ kelvin.castSpell('Push',reingod,'wound') + '\n';

           // test slow bleed branch
           //+ kelvin.castSpell('Push',reingod,'wound') + '\n';


           //+ reingod.charge(kelvin) + '\n';
console.log(output);
/*
output += (reingod.getStatus());
*/