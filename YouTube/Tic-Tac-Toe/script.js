var originalBoard;
const userSymbol = 'O';
const computerSymbol = 'X';
let userCount = 0;
let computerCount = 0;
const cells = document.querySelectorAll(".cell");
const winningCombinations = [
    [0 ,1 ,2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function minimax(newBoard, playerSymbol) {
    var availSpots = emptySquares(newBoard);

    if (checkWin(newBoard, userSymbol)) {
        return {
            score: -10
        };
    } else if (checkWin(newBoard, computerSymbol)) {
        return {
            score: 20
        };
    } else if (availSpots.length === 0) {
        return {
            score: 0
        };
    }

    var moves = [];
    for (var i = 0; i < availSpots.length; i++) {
        var move = {};
        move.index = newBoard[availSpots[i]];
        newBoard[availSpots[i]] = playerSymbol;

        if (playerSymbol == computerSymbol) {
            var result = minimax(newBoard, userSymbol);
            move.score = result.score;
        } else {
            var result = minimax(newBoard, computerSymbol);
            move.score = result.score;
        }

        newBoard[availSpots[i]] = move.index;

        moves.push(move);
    }

    var bestMove;
    if (playerSymbol === computerSymbol) {
        var bestScore = -10000;
        for (var i = 0; i < moves.length; i++) {
            if (moves[i].score > bestScore) {
                bestScore = moves[i].score;
                bestMove = i;
            }
        }
    } else {
        var bestScore = 10000;
        for (var i = 0; i < moves.length; i++) {
            if (moves[i].score < bestScore) {
                bestScore = moves[i].score;
                bestMove = i;
            }
        }
    }

    return moves[bestMove];
}

function declareWinner(who) {
    document.querySelector(".end-game").style.display = "block";
    document.querySelector(".end-game .text").innerText = who;
}

function emptySquares() {
    return originalBoard.filter(s => typeof s === "number");
}

function bestSpot() {
    return minimax(originalBoard, computerSymbol).index;
}

function checkTie() {
    if (emptySquares().length == 0) {
        for (var i = 0; i < cells.length; i++) {
            cells[i].style.backgroundColor = "blue";
            cells[i].removeEventListener("click", playTurn, false);
        }
        setTimeout(function () { declareWinner("Tie Game!") }, 500);
        return true;
    }
    return false;
}

function gameOver(gameWon) {
    for (let index of winningCombinations[gameWon.index]) {
        document.getElementById(index).style.backgroundColor = gameWon.playerSymbol == userSymbol ? "green" : "red";
    }
    for (var i = 0; i < cells.length; i++) {
        cells[i].removeEventListener("click", playTurn, false);
    }
    setTimeout(function () {declareWinner(gameWon.playerSymbol == userSymbol ? "You Win!" : "You Lose")}, 500);
}

function checkWin(board, playerSymbol) {
    let plays = board.reduce((a, e, i) => (e === playerSymbol) ? a.concat(i) : a, []);
    let gameWon = null;
    for (let [index, win] of winningCombinations.entries()) {
        if (win.every(elem => plays.indexOf(elem) > -1)) {
            gameWon = {
                index: index,
                playerSymbol: playerSymbol
            };
            break;
        }
    }
    return gameWon;
}

function turn(cellId, playerSymbol) {
    originalBoard[cellId] = playerSymbol;
    document.getElementById(cellId).innerText = playerSymbol;
    if (playerSymbol === userSymbol) {
        userCount++;
    } else if (playerSymbol === computerSymbol) {
        computerCount++;
    }
    let gameWon = checkWin(originalBoard, playerSymbol);
    if (gameWon) {
        gameOver(gameWon);
    }
}

function playTurn(cell) {
    if (typeof originalBoard[cell.target.id] == "number" && userCount == computerCount) {
        turn(cell.target.id, userSymbol);
        if (!checkWin(originalBoard, userSymbol) && !checkTie()) {
            setTimeout(function() {turn(bestSpot(), computerSymbol)}, 500);
        }
    }
}

function startGame() {
    document.querySelector(".end-game").style.display = "none";
    userCount = 0;
    computerCount = 0;
    originalBoard = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    for (var i = 0; i < cells.length; i++) {
        cells[i].innerText = "";
        cells[i].style.removeProperty("background-color");
        cells[i].addEventListener("click", playTurn, false);
    }
}

startGame();
