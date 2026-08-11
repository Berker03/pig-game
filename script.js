'use strict';

//Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');

//another way just for selecting id, in this case u dont need to put the #
const score1El = document.getElementById('score--1');

const diceEl = document.querySelector('.dice');

const btnNew = document.querySelector('.btn--new');

const btnRoll = document.querySelector('.btn--roll');

const btnHold = document.querySelector('.btn--hold');

const current0El = document.getElementById('current--0');

const current1El = document.getElementById('current--1');
//At first all the score needs to be zero
score0El.textContent = 0;

score1El.textContent = 0;

let scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;

const switchPlayer = function () {
  //change the active plater
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  //remove if only it is there
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};
//now we are removing the dice
diceEl.classList.add('hidden');

//Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    //1.generate random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    //2.display the dice
    diceEl.classList.remove('hidden');
    //3.showing the dice,according to the random one
    diceEl.src = `dice-${dice}.png`;
    //3.check for rolled 1 if yes switch to next player
    if (dice !== 1) {
      //add dice to the current score
      currentScore += dice;
      //dynamic selection according to the plater
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    //add current score to the score of active player
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    //check if score >=100
    //if yes finish the game

    //if not change to next player
    if (scores[activePlayer] >= 20) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      diceEl.classList.add('hidden');
    } else {
      switchPlayer();
    }
  }
});

//when we click on new game we remove the winner class
//set all total score and current score to zero (both dom and the variables)
btnNew.addEventListener('click', function () {
  //set scores to zero
  scores = [0, 0];
  //set current score to zero
  currentScore = 0;
  //set all the current score in dom to 0
  current0El.textContent = currentScore;
  current1El.textContent = currentScore;
  //remoce the winner class from the current player
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--winner');
  //set the active player
  player0El.classList.add('player--active');
  //change the total scores on dom to zero
  score0El.textContent = scores[activePlayer];
  score1El.textContent = scores[activePlayer];
  //set the plating boolean to true so the game continues
  playing = true;
});
