'use strict';

// Selecting Elements
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const diceEl = document.querySelector('.dice');
// Buttons
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let currentScore, activePlayer, playing, scores;

function switchPlayer() {
  document.getElementById(`current--${activePlayer}`).textContent = 0;

  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;

  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
}

function initilization() {
  score0El.textContent = 0;
  score1El.textContent = 0;

  current0El.textContent = 0;
  current1El.textContent = 0;

  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');

  btnRoll.removeAttribute('disabled', '');
  btnHold.removeAttribute('disabled', '');

  diceEl.classList.add('hidden');

  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  console.log('done');
}

initilization();

btnRoll.addEventListener('click', () => {
  // 1.    Generating a random dice roll
  const dice = Math.trunc(Math.random() * 6) + 1;

  // 2.   Display Dice
  diceEl.classList.remove('hidden');
  diceEl.src = `dice-${dice}.png`;

  // 3.   Check for rolled1: if true, switch to next player
  if (dice != 1) {
    // Add dice to the current score
    currentScore += dice;

    document.getElementById(`current--${activePlayer}`).textContent =
      currentScore;
  } else {
    // Switch to next player
    switchPlayer();
  }
});

btnHold.addEventListener('click', () => {
  //1.    Add current score to sctive player's score
  scores[activePlayer] += currentScore;
  // score[1] = score[1] + currentScore;

  document.getElementById(`score--${activePlayer}`).textContent =
    scores[activePlayer];

  //2. Check if player's score is >=100
  // Finish game

  if (scores[activePlayer] >= 100) {
    // Finish Game
    playing = false;
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add('player--winner');
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.remove('player--active');

    btnRoll.setAttribute('disabled', '');
    btnHold.setAttribute('disabled', '');
    diceEl.classList.add('hidden');
  } else {
    //3.    Switch to the next player
    switchPlayer();
  }
});

btnNew.addEventListener('click', initilization);