// This is the beginning of my game project
// First goal is to make a playable command-line version of the demo

var Player = require('./player.js');

var kelvin = new Player('kelvin');

var status = kelvin.getStatus();

console.log(status);
