
//global variable with default values
var score,roundScore,activePlayer,gamePlaying;

//calling the initialize function to set default values
initialize();

//events when roll dice is clicked
document.querySelector('.btn-roll').addEventListener('click',function () {
  if (gamePlaying) {
      //generating random number from 1-6
      var dice = Math.floor(Math.random() * 6) + 1;

      //displaying the dice number
      var diceNumber = document.querySelector('.dice');
      diceNumber.style.display = 'block';
      diceNumber.src = '/data/dice-' + dice + '.png';

      //updating the round score if the dice is NOT 1
      if (dice != 1) {
         //add score to current score
         roundScore += dice;
         document.getElementById('#current-score-' + activePlayer).textContent = roundScore;
      } else {
         // change to next player
         nextPLayer();
      }
   }
})

//to protect from Don't Repeat Yourself(DRY) , we creat a seperate nextPlayer function for easy switching
function nextPLayer() {
   activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
   roundScore = 0;
   document.getElementById('#current-score-0').textContent = '0';
   document.getElementById('#current-score-1').textContent = '0';

   //change the active player
   document.querySelector('.player0').classList.toggle('player-active');
   document.querySelector('.player1').classList.toggle('player-active');

   //hide dice when the player changes
   document.querySelector('.dice').style.display = 'none';
}

//event when hold button is clicked
document.querySelector('.btn-hold').addEventListener('click' , function () {
  if (gamePlaying) {
      //add current score to global score
      score[activePlayer] += roundScore;
      
      //update the gobal score UI
      document.getElementById('#score-' + activePlayer).textContent = score[activePlayer];

      //check the winner 
      if (score[activePlayer] >= 20) {
         document.querySelector('#name-' + activePlayer).textContent = 'WINNER!!';
         document.querySelector('.dice').style.display = 'none';
         document.querySelector('.player' + activePlayer).classList.add('winner');
         gamePlaying = false;
      } else {
         //change the active player
         nextPLayer();
      }
  }
})
//creating initializing function for default values
function initialize() {
   score = [0,0];
   roundScore = 0;
   activePlayer = 0;
   gamePlaying=true
   //setting deafult values when page loads
   document.querySelector('.dice').style.display = 'none';
   document.getElementById('#score-0').textContent = '0';
   document.getElementById('#current-score-0').textContent = '0';
   document.getElementById('#score-1').textContent = '0';
   document.getElementById('#current-score-1').textContent = '0';
   document.querySelector('#name-0').textContent = 'Player 1';
   document.querySelector('#name-1').textContent = 'Player 2';
   document.querySelector('.player0').classList.remove('player-active');
   document.querySelector('.player1').classList.remove('player-active');
   document.querySelector('.player0').classList.remove('winner');
   document.querySelector('.player1').classList.remove('winner');
   document.querySelector('.player0').classList.add('player-active');
}
document.querySelector('.btn-new').addEventListener('click', initialize)