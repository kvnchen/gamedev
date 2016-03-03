// This is the beginning of my game project
// First milestone is to make a playable command-line version of the demo
// Deadline is Tuesday March 1st 2016 lmao

var Player = require('./player.js'),
    boss = require('./bossRein.js'),
    kelvin = new Player('kelvin'),
    reingod = new boss(),
    status = kelvin.getStatus();

console.log(status);
console.log(reingod.getStatus());

// combat simulation
kelvin.castSpell('Push',reingod,'wound');
reingod.frostBreath(kelvin);
reingod.charge(kelvin);