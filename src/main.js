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

          // combat simulation
           + kelvin.castSpell('Push',reingod,'wound') + '\n'
           + reingod.frostBreath(kelvin) + '\n'
           + kelvin.castSpell('Ignite',reingod,'wound') + '\n'
           + kelvin.castSpell('Pull',reingod,'wound') + '\n'
           + reingod.charge(kelvin) + '\n';
console.log(output);
/*
output += (reingod.getStatus());
*/