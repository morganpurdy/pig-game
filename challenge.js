var scores, roundScores, activePlayer, gamePlaying, x;

init();

document.querySelector('.btn-roll').addEventListener('click', function() {
  if (gamePlaying) {
        // 1. Random number
        var dice1 = Math.floor(Math.random() * 6) + 1;
        var dice2 = Math.floor(Math.random() * 6) + 1;

        //2. Display the result
        document.getElementById('dice-1').style.display = 'block';
        document.getElementById('dice-2').style.display = 'block';
        document.getElementById('dice-1').src = 'dice-' + dice1 + '.png';
        document.getElementById('dice-2').src = 'dice-' + dice2 + '.png';

  //3. Update the round score IF the rolled number was NOT a 1
  if (dice1 !== 1 && dice2 !== 1) {
      //Add score
      roundScore += dice1 + dice2;
      document.querySelector('#current-' + activePlayer).textContent = roundScore;
  } else {
      //Next player
      nextPlayer();
  }
}
});

document.querySelector('.btn-update').addEventListener('click', function() {
  x = document.querySelector('.winning-score').value;
  document.querySelector('.scorewin').textContent = x;
});

var input = document.getElementById('update2');
input.addEventListener("keyup", function(event) {
  event.preventDefault();
  if (event.keyCode === 13) {
  document.getElementById('update').click();
  }
});

document.querySelector('.btn-hold').addEventListener('click', function() {
  if (gamePlaying) {
    // Add CURRENT score to GLOBAL score
    scores[activePlayer] += roundScore;

    // Update the UI
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

    // Check if player won the game

  if (scores[activePlayer] >= x) {
      document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
      document.getElementById('dice-1').style.display = 'none';
      document.getElementById('dice-2').style.display = 'none';
      document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
      document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
      gamePlaying = false;

  } else if (scores[activePlayer] >= 100) {
    document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';
    document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
    document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
    gamePlaying = false;
  } else {
      //Next player
      nextPlayer();
    }
  }
});

function nextPlayer() {
  // next player, same as writing if (activeplayer === 0) {activerPlayer = 1} else {activePlayer=0;}
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
  roundScore = 0;
  // changes current score to zero (not global score)
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';
  // swaps active classes
  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');
  // hides dice for next players first roll of their turn
  document.getElementById('dice-1').style.display = 'none';
  document.getElementById('dice-2').style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click', init);

function init() {
  scores = [0,0];
  activePlayer = 0;
  roundScore = 0;
  gamePlaying = true;

  // start with dice hidden
  document.getElementById('dice-1').style.display = 'none';
  document.getElementById('dice-2').style.display = 'none';

  // sets all scores back to zero when a new game is started
  document.getElementById('score-0').textContent = '0';
  document.getElementById('score-1').textContent = '0';
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';

  // update score needed to win back to 0 here
  document.querySelector('.scorewin').textContent = '100';
  document.querySelector('.winning-score').value = '';

  // Resets the styles of the winning player and takes away the winner class and adds active class to first player
  document.getElementById('name-0').textContent = 'Player 1';
  document.getElementById('name-1').textContent = 'Player 2';
  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');
  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.remove('active');
  document.querySelector('.player-0-panel').classList.add('active');

};
