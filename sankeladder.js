/* This game is a classic snake and ladder game that can be played
among two players, The game is won when a person reaches the '100'
mark and a message is displayed in the message area at the bottom
left of screen*/

// the move object is responsible for displaying all the messages,
// and movements on the board.
var move = {
  displayMessage : function(msg) {
    var messArea=document.getElementById("messageArea");
    messArea.innerHTML=msg;
  },
  
  playerMove: function(newPosition,id) {
    let cell = document.getElementById(newPosition.toString());
    console.log(cell);
    cell.setAttribute("class", id);
  },
  
  removeOld: function(oldPosition,id) {
    let cell = document.getElementById(oldPosition.toString());
    console.log(cell);
    cell.classList.remove(id);
  },

  displayDice: function(msg) {
    let diceNumber=document.getElementById("diceFace");
    diceNumber.innerHTML=msg;
  },
  
  showDice: function(diceRoll) {
    let diceImg = document.getElementById("diceImage");
    switch(diceRoll) {
      case 1:
        diceImg.setAttribute("src","dice_1.png");
      break;
      case 2:
      diceImg.setAttribute("src","dice_2.png");
      break;
      case 3:
        diceImg.setAttribute("src","dice_3.png");
      break;
      case 4:
      diceImg.setAttribute("src","dice_4.png");
      break;
      case 5:
      diceImg.setAttribute("src","dice_5.png");
      break;
      case 6:
      diceImg.setAttribute("src","dice_6.png");
      break;
      default:
        alert("how did that happen!!")
    }
  }
};

// the model is where all the game logic happens, like 
// deciding the next move and the current status of the game
var model= {
  oldsum1: 0,
  oldsum2: 0,
  sum1: 0,
  sum2: 0,
  snakebitestart:[27,40,43,54,66,76,89,99],
  snakebiteend:[05,03,18,31,45,58,53,41],
  ladderstart:[04,13,33,42,50,62,74], //start is lower for ladder
  ladderend:[25,46,49,63,69,81,92],
  
  // function to check ladder climb
  checkLadder: function(sum) {
    let i = this.snakebitestart.indexOf(sum)
    if(i>=0) {
      move.displayMessage("Ouch!! a SNAKE BITE!");
      return this.snakebiteend[i];
    } else {
      return 0;
    }
  },
  
  //function to check the snake bite
  checkSnake: function(sum) {
    let i = this.ladderstart.indexOf(sum)
    if(i>=0) {
      move.displayMessage("Woohoo!! Ladders are Fun!!");
      return this.ladderend[i];
    } else {
      return 0;
    }
  },

  //based on the dice roll, the next location is decided, 
  // along with the game logic 
  nextlocation: function(intGuess,id) {
    switch(id==="player1"?"player1":"player2") {
      case "player1":
        if(this.oldsum1!=0) {
          move.removeOld(this.oldsum1,id);
        }
        this.sum1+=intGuess;
        let level1 = this.checkSnake(this.sum1)+this.checkLadder(this.sum1);
        this.sum1 = (level1 > 0) ? level1: this.sum1;
        let beyond1=this.checkStatus(this.sum1,id);
        this.oldsum1=beyond1;
        this.sum1=beyond1;
        break;
      case "player2":
        if(this.oldsum2!=0) {
          move.removeOld(this.oldsum2,id);
        } 
        this.sum2+=intGuess;
        let level2 = this.checkSnake(this.sum2)+this.checkLadder(this.sum2);
        this.sum2 = (level2 > 0) ? level2: this.sum2;
        let beyond2=this.checkStatus(this.sum2,id);
        this.oldsum2=beyond2;
        this.sum2=beyond2;
        break;
      default:
        console.log("not possible theoretically!");
    } 
  },
  //check the status if its OVER or the BOUNCE happened
  checkStatus: function(sum,id) {
    if(sum<100) {
      move.playerMove(sum,id);
      move.displayMessage("You moved to a new location");
      return sum;
    } else if(sum===100) {
      move.playerMove(sum,id);
      move.displayMessage("you are the winner!");
      return sum;
    } else {
      move.displayMessage("ohh! you were close! but you bounced..Try Again!");
      sum=200-sum; // bounce logic(playerMove is moved to later part here)
      move.playerMove(sum,id);
      return sum;
    }
  }
};

//The game basically starts here when,
//the players press their respective buttons and generate dice face,
//it then moves on to model(which has the main Game logic)
function generateRandom(id) {
  let diceRoll=Math.floor(Math.random()*6)+1; //dice can be 1 to 6
  console.log(id + diceRoll);
  move.showDice(diceRoll);
  model.nextlocation(diceRoll,id); //pass the input to model
  move.displayDice("Dice roll is : " + diceRoll);
}
