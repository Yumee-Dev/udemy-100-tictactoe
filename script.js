const backdrop = document.getElementById('backdrop');
const playerNames = [document.getElementById('player1-name'), document.getElementById('player2-name')];
const playerEditNames = [document.getElementById('player1-edit-name'), document.getElementById('player2-edit-name')];
const playerNameForm = document.getElementById('player-name-form');
const fPlayerName = document.getElementById('f-player-name');
const checkLength = document.getElementById('check-length');
const checkChars = document.getElementById('check-chars');
const checkFirst = document.getElementById('check-first');
const checkLast = document.getElementById('check-last');
const btnCancel = document.getElementById('btn-cancel');
const btnConfirm = document.getElementById('btn-confirm');
const btnStartNewGame = document.getElementById('btn-start-new-game');
const gameOver = document.getElementById('game-over');
const gameOverFirstP = document.querySelector('#game-over > p:nth-child(1)');
const itsYourTurn = document.getElementById('its-your-turn');
const playerTurnName = document.getElementById('player-turn-name');
const gameField = document.getElementById('game-field');
const gameFieldTiles = [[], [], []];
let editedPlayer = 0;
let sPlayerNames = ['Dipper', 'Mable'];
let activePlayer = 1;
let isGameOver = false;

for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
        gameFieldTiles[i].push(document.querySelectorAll('#game-field > div')[i * 3 + j]);
    }
}

backdrop.addEventListener('click', (event) => btnCancel.click());

for (let i = 0; i < 2; i++) {
    playerEditNames[i].addEventListener('click', (event) => {
        editedPlayer = i;
        playerNameForm.style.display = 'flex';
        backdrop.style.display = 'block';
        fPlayerName.value = playerNames[i].textContent;
    });
}

fPlayerName.addEventListener('input', (event) => {
    if (/^[A-Z][a-zA-Z -]*[a-zA-Z]$/.test(fPlayerName.value.trim())) {
        fPlayerName.classList.remove('invalid-value');
    } else {
        fPlayerName.classList.add('invalid-value');
    }
    if (/[^a-zA-Z -]/.test(fPlayerName.value.trim())) {
        checkChars.classList.remove('name-requirement-completed');
    } else {
        checkChars.classList.add('name-requirement-completed');
    }
    if (/^[^A-Z]/.test(fPlayerName.value.trim())) {
        checkFirst.classList.remove('name-requirement-completed');
    } else {
        checkFirst.classList.add('name-requirement-completed');
    }
    if (/[^a-zA-Z]$/.test(fPlayerName.value.trim())) {
        checkLast.classList.remove('name-requirement-completed');
    } else {
        checkLast.classList.add('name-requirement-completed');
    }
    if (fPlayerName.value.trim().length < 2) {
        checkLength.classList.remove('name-requirement-completed');
        if (fPlayerName.value.trim().length < 1) {
            checkChars.classList.remove('name-requirement-completed');
            checkFirst.classList.remove('name-requirement-completed');
            checkLast.classList.remove('name-requirement-completed');
        }
    } else {
        checkLength.classList.add('name-requirement-completed');
    }
});

btnCancel.addEventListener('click', (event) => {
    fPlayerName.classList.remove('invalid-value');
    checkLength.classList.add('name-requirement-completed');
    checkChars.classList.add('name-requirement-completed');
    checkFirst.classList.add('name-requirement-completed');
    checkLast.classList.add('name-requirement-completed');
    playerNameForm.style.display = 'none';
    backdrop.style.display = 'none';
});

btnConfirm.addEventListener('click', (event) => {
    if (/^[A-Z][a-zA-Z -]*[a-zA-Z]$/.test(fPlayerName.value.trim())) {
        playerNames[editedPlayer].textContent = fPlayerName.value.trim();
        sPlayerNames[editedPlayer] = fPlayerName.value.trim();
        playerNameForm.style.display = 'none';
        backdrop.style.display = 'none';
    } else {
        fPlayerName.classList.add('invalid-value');
    }
});

btnStartNewGame.addEventListener('click', (event) => {
    isGameOver = false;
    gameOver.style.display = 'none';
    itsYourTurn.style.display = 'block';
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            gameFieldTiles[i][j].textContent = '';
            gameFieldTiles[i][j].classList.remove('checked-tile');
        }
    }
    activePlayer = Math.floor(Math.random() * 2 + 1);
    playerTurnName.textContent = sPlayerNames[activePlayer - 1];
});

for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
        gameFieldTiles[i][j].addEventListener('click', (event) => {
            if (gameFieldTiles[i][j].textContent == '' && !isGameOver) {
                activePlayer == 1 ? gameFieldTiles[i][j].textContent = 'X' : gameFieldTiles[i][j].textContent = 'O';
                gameFieldTiles[i][j].classList.add('checked-tile');
                // checking for game over
                for (let i = 0; i < 3; i++) {
                    if (gameFieldTiles[i][0].textContent == gameFieldTiles[i][1].textContent &&
                        gameFieldTiles[i][1].textContent == gameFieldTiles[i][2].textContent &&
                        gameFieldTiles[i][0].textContent != '') {
                        isGameOver = true;
                    }
                    if (gameFieldTiles[0][i].textContent == gameFieldTiles[1][i].textContent &&
                        gameFieldTiles[1][i].textContent == gameFieldTiles[2][i].textContent &&
                        gameFieldTiles[0][i].textContent != '') {
                        isGameOver = true;
                    }
                    if (gameFieldTiles[0][0].textContent == gameFieldTiles[1][1].textContent &&
                        gameFieldTiles[1][1].textContent == gameFieldTiles[2][2].textContent &&
                        gameFieldTiles[0][0].textContent != '') {
                        isGameOver = true;
                    }
                    if (gameFieldTiles[0][2].textContent == gameFieldTiles[1][1].textContent &&
                        gameFieldTiles[1][1].textContent == gameFieldTiles[2][0].textContent &&
                        gameFieldTiles[0][2].textContent != '') {
                        isGameOver = true;
                    }
                    const reducer = (previous, current) => previous && current.textContent;
                    const reducerArr = (previous, currentArr) => previous && currentArr.reduce(reducer, true);
                    if (gameFieldTiles.reduce(reducerArr, true)) {
                        isGameOver = true;
                        activePlayer = 0;
                    }
                }
                // displaying game over block or starting next turn
                if (isGameOver) {
                    gameOver.style.display = 'block';
                    itsYourTurn.style.display = 'none';
                    if (activePlayer == 0) {
                        gameOverFirstP.textContent = `A draw!`;
                    } else {
                        gameOverFirstP.textContent = `You won, ${sPlayerNames[activePlayer - 1]}!`;
                    }
                } else {
                    activePlayer = 3 - activePlayer;
                    playerTurnName.textContent = sPlayerNames[activePlayer - 1];
                }
            }
        });
    }
}