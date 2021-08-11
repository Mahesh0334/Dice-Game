'use strict';
// variable elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.getElementById('score--0');
const score1El = document.querySelector('#score--1');
const diceEl = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnNewGame = document.querySelector('.btn--new');
let current0El = document.querySelector('#current--0');
let current1El = document.querySelector('#current--1');

//Strating conditions
score0El.textContent = 0; // Player 0 score initally on start = 0
score1El.textContent = 0; // Player 1 score initally on start = 0
diceEl.classList.add('hidden'); //Initally hides the number 5 dice image

//Let variable elements
// const scores = [0, 0]; // Main score holder array
// let currentScore = 0; // here we are making initall curr value 0 later in the we make update thecurr score as per dice values
// let totalScore = 0;
// let activePlayer = 0; // activePlayer 0 means player 1
// let playing = true;

// We can also make the new game button event dry by adding following code.
let scores, currentScore, totalScore, activePlayer, playing;

//init function
const init = function () {
  scores = [0, 0]; // Main score holder array
  currentScore = 0; // here we are making initall curr value 0 later in the we make update thecurr score as per dice values
  totalScore = 0;
  activePlayer = 0; // activePlayer 0 means player 1
  playing = true;

  score0El.textContent = 0; // Player 0 score initally on start = 0
  score1El.textContent = 0; // Player 1 score initally on start = 0
  current0El.textContent = 0;
  current1El.textContent = 0;
  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  playing = true;
};

init();

//function for switching player
const switchPlayer = function () {
  //Switch player
  document.getElementById(`current--${activePlayer}`).textContent = 0; // When dice is 1 then display currentScore of currentActiveplayer to 0. (Later switch to next player).
  activePlayer = activePlayer === 0 ? 1 : 0; // setting active player value to 0 or 1 means deciding player 1 or 2. If an activePlayer is 0 then set activePlayer as 1 else set activePlayer as 0
  currentScore = 0; // setting currScore to 0. because after switching player, score should start from zero.
  player0El.classList.toggle('player--active'); // toggle() -> adds the class if it is not there and removes the class if it is available. For changing the background color of an activePlayer0
  player1El.classList.toggle('player--active'); // Changing the background color of an activePlayer0 means player 2
};

// On click Roll Dice button event function
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. Generating a random number
    const dice = Math.trunc(Math.random() * 6) + 1;
    // console.log(dice);
    //2. Display the random number
    diceEl.classList.remove('hidden'); // Unhides the diceimage
    diceEl.src = `dice-${dice}.png`; // Displaying dice image as per the random number
    //3. compare if the dice number is 1 then exit if not continue.
    if (dice !== 1) {
      //Add dice to curr score
      currentScore += dice; // Adding dice+currScore(0) and storing it in currScore!
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore; // Displaying the current score of an current active player.
    } else {
      switchPlayer();
    }
  }
});

// On click Hold button event function
btnHold.addEventListener('click', function () {
  // if(playing) is true then the dice roll and hold buttons works else it dosen't work
  if (playing) {
    // 1. Add currScore to Activelayer
    scores[activePlayer] += currentScore; // Scores of active player + currScore and then store it in scores[activePlayer] place.
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer]; // Printing the scores[activePlayer]
    // 2. Ceck if player's scoreis>= 100. Decides winner
    if (scores[activePlayer] >= 200) {
      playing = false; // activePlayerscore / final score is >=100 then playing is false means buttons stops working
      diceEl.classList.add('hidden'); // After winner is choosen thedice image is hidden
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner'); // Here we are adding or changing the b/g color of the winner section to grey
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active'); // Here we are changing the b/g color of the winner section to normal
    } else {
      // 3. Switch to the next player
      switchPlayer(); // calls the switchPlayerfunction which is at line 27.
    }
  }
});

// On click New Game button event function
btnNewGame.addEventListener('click', init);
// score0El.textContent = 0; // Player 0 score initally on start = 0
// score1El.textContent = 0; // Player 1 score initally on start = 0
// current0El.textContent = 0;
// current1El.textContent = 0;
// diceEl.classList.add('hidden');
// player0El.classList.remove('player--winner');
// player1El.classList.remove('player--winner');
// player0El.classList.add('player--active');
// player1El.classList.remove('player--active');
// playing = true;
// });
