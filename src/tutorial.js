function Tutorial(player, enemy) {
  this.introCounter = 0;

  this.introMessages = [
    '\nThis is a brief summary of your avatar:\n',
    '\nHmm, it seems trouble has arrived.\nThis will be your opponent:\n',
    '\nI wish you the best of luck.\n'
  ];

  this.introStatuses = [
    player,
    enemy
  ];
};

Tutorial.prototype.intro = function(skipTo) {
  // Exposition dump, feed user info in blocks when user presses enter
  if (skipTo) {
    this.introCounter = skipTo;
  }

  console.log(this.introMessages[this.introCounter]);
  
  if (this.introCounter < 2) {
    console.log(this.introStatuses[this.introCounter].getStatus());
  }  
    
  this.introCounter++;
};

module.exports = Tutorial;
