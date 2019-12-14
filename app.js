/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, diceDOM, isGamePlaying, prev, dice;
diceDOM = document.querySelector('.dice');

init();

//document.querySelector(`#current-${activePlayer}`).textContent = dice;

document.querySelector('.btn-roll').addEventListener('click', function () {
    if (isGamePlaying) {
        diceDOM.style.display = 'block';
        prev = dice;

        //1- get a random number
        dice = Math.floor(Math.random() * 6) + 1;

        //2- update the dice 
        diceDOM = document.querySelector('.dice');
        diceDOM.src = `dice-${dice}.png`;

        //3- update the score if rolled !== 1
        if (prev === dice && dice === 6) {
            scores[activePlayer] = 0;
            document.getElementById(`score-${activePlayer}`).textContent = 0;
            nextPlayer();
        }
        else if (dice !== 1) {
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
            isGamePlaying = false;
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
    prev = 0;
}

function init() {
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    dice = 0;
    diceDOM.style.display = 'none';
    isGamePlaying = true;
    prev = 0;

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

/*
YOUR 3 CHALLENGES
Change the game to follow these rules:

1. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn. (Hint: Always save the previous dice roll in a separate variable)
2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100. (Hint: you can read that value with the .value property in JavaScript. This is a good oportunity to use google to figure this out :)
3. Add another dice to the game, so that there are two dices now. The player looses his current score when one of them is a 1. (Hint: you will need CSS to position the second dice, so take a look at the CSS code for the first one.)
*/