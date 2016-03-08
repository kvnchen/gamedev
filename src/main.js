// This is the beginning of my game project
// First milestone is to make a playable command-line version of the demo
// Deadline is Tuesday March 1st 2016 lmao

var Player = require('./player.js'),
    boss = require('./bossRein.js'),
    kelvin = new Player('kelvin'),
    reingod = new boss();

var output = '';

output += kelvin.getStatus() + '\n';
output += reingod.getStatus() + '\n';

// combat simulation
output += kelvin.castSpell('Push',reingod,'wound') + '\n';
output += kelvin.castSpell('Ignite',reingod,'wound') + '\n';
output += kelvin.castSpell('Pull',reingod,'wound');
console.log(output);
/*reingod.frostBreath(kelvin);
output += (reingod.getStatus());
reingod.charge(kelvin);*/