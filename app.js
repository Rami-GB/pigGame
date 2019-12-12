/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var scores, roundScore, activePlayer, diceDOM, isGamePlaying;
diceDOM = document.querySelector('.dice');

init();

//document.querySelector(`#current-${activePlayer}`).textContent = dice;

document.querySelector('.btn-roll').addEventListener('click', function () {
    if (isGamePlaying) {
        var dice;
        //1- get a random number
        dice = Math.floor(Math.random() * 6) + 1;

        //2- update the dice 
        diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = `dice-${dice}.png`;

        //3- update the score if rolled !== 1
        if (dice !== 1) {
            //add score
            roundScore += dice;
            //update the UI
            document.querySelector(`#current-${activePlayer}`).textContent = roundScore;
        } else {
            nextPlayer();
        }
    }
});

document.querySelector('.btn-hold').addEventListener('click', function () {
    if (isGamePlaying) {
        //update UI
        scores[activePlayer] += roundScore;
        document.querySelector(`#score-${activePlayer}`).textContent = scores[activePlayer];
        //check if player won the game
        if (scores[activePlayer] >= 10) {
            document.querySelector(`#name-${activePlayer}`).textContent = 'Winner!';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector(`.player-${activePlayer}-panel`).classList.add('winner');
            document.querySelector(`.player-${activePlayer}-panel`).classList.remove('active');
        } else {
            //next player
            nextPlayer();
        }
    }
});

document.querySelector('.btn-new').addEventListener('click', init);


function nextPlayer() {
    //update UI
    document.querySelector(`#current-${activePlayer}`).textContent = '0';
    //update score
    roundScore = 0;
    //update activePlayer variable
    activePlayer = (activePlayer === 0) ? 1 : 0;

    //pass the turn
    ['player-0-panel', 'player-1-panel'].forEach(e => {
        document.querySelector(`.${e}`).classList.toggle('active');
    });

    //hide the dice
    diceDOM.style.display = 'none';
}

function init() {
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    diceDOM.style.display = 'none';
    isGamePlaying = true;

    ['current-0', 'current-1', 'score-0', 'score-1'].forEach(e => {
        document.getElementById(e).textContent = 0;
    });

    ['name-0', 'name-1'].forEach((e, index) => {
        document.getElementById(e).textContent = `Player ${index}`;
    });

    ['.player-0-panel', '.player-1-panel'].forEach(e => {
        document.querySelector(e).classList.remove('winner');
        document.querySelector(e).classList.remove('active');
    });

    document.querySelector('.player-0-panel').classList.add('active');
}