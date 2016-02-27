// This is the beginning of my game project
// First milestone is to make a playable command-line version of the demo
// Deadline is Tuesday March 1st 2016 lmao

var Player = require('./player.js'),
    kelvin = new Player('kelvin'),
    status = kelvin.getStatus();

console.log(status);
console.log(kelvin.loadProperties());
