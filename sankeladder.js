var move = {
displayMessage : function(msg) {
    var messArea=document.getElementById("messageArea");
    messArea.innerHTML=msg;
  },
  playerMove: function(newPosition) {
    let cell = document.getElementById(newPosition.toString());
    cell.setAttribute("class", "player1");
  },
  removeOld: function(oldPosition) {
    let cell = document.getElementById(oldPosition.toString());
    cell.classList.remove("player1");
  },
  displayDice: function(msg) {
    var diceNumber=document.getElementById("diceFace");
    diceNumber.innerHTML=msg;
  }
};

var model= {
  oldPosition:0,
  snakebitestart:[27,40,43,54,66,76,89,99],
  snakebiteend:[05,03,18,31,45,58,53,41],
  ladderstart:[04,13,33,42,50,62,74], //start is lower for ladder
  ladderend:[25,46,49,63,69,81,92],

  nextlocation: function(intGuess) {
    var tempPosition=intGuess+this.oldPosition;
    if(tempPosition==100) {
      move.displayMessage("You Win!!!");
      return false;
    };
    if(tempPosition>100) {tempPosition=200-intGuess-this.oldPosition;};//bouncing the player if socre above 100
    console.log(tempPosition);
    if(this.snakebitestart.indexOf(tempPosition)>=0) {
      var newPosition=this.snakebiteend[this.snakebitestart.indexOf(tempPosition)];
      if(this.oldPosition!=0) {move.removeOld(this.oldPosition);};
      this.oldPosition=newPosition;
      move.displayMessage("Ouch!! a snake bite");
      move.playerMove(newPosition);
    }
    else if (this.ladderstart.indexOf(tempPosition)>=0) {
      var newPosition=this.ladderend[this.ladderstart.indexOf(tempPosition)];
      if(this.oldPosition!=0) {move.removeOld(this.oldPosition);};
      this.oldPosition=newPosition;
      move.displayMessage("Yay! ladders are always fun");
      move.playerMove(newPosition);
    }
    else {
      if(this.oldPosition!=0) {move.removeOld(this.oldPosition);};
      this.oldPosition=tempPosition;
      move.displayMessage("you moved to a new position");
      move.playerMove(tempPosition);
    }
  }
};

var controller = {
  processGuess: function(dice) {
    var intGuess=parseInt(dice);
    model.nextlocation(intGuess);
  }
};
function init() {
  var button1=document.getElementById("play1");
  button1.onclick=generateRandom;
}
function generateRandom() {
  var diceRoll=Math.floor(Math.random()*6)+1; //dice can be 1 to 6
  controller.processGuess(diceRoll); //pass the input to controller
  move.displayDice("Dice roll is : " + diceRoll);
}

window.onload=init;
