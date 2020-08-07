const grid_div = document.querySelector('.grid');
let gridSquares_div = Array.from(document.querySelectorAll('.grid div'));
const scoreDisplay__span = document.querySelector('#score');
const startPause_button = document.querySelector('#start-button');
const displaySquares_div = document.querySelectorAll('.mini-grid div');

const gridWidth = 10;
let nextRandom = 0;
let timerId = null;
let score = 0;
let currentPosition = 4;
let currentRotation = 0;
let gameStarted = false;
let gameFinished = false;
const displayWidth = 4;
const displayIndex = 0;

const colors = ['orange', 'red', 'purple', 'green', 'blue'];

const lTetromino = [
    [1, gridWidth + 1, gridWidth * 2 + 1, 2],
    [gridWidth, gridWidth + 1, gridWidth + 2, gridWidth * 2 + 2],
    [1, gridWidth + 1, gridWidth * 2 + 1, gridWidth * 2],
    [gridWidth, gridWidth * 2, gridWidth * 2 + 1, gridWidth * 2 + 2]
];

const sTetromino = [
    [0, gridWidth, gridWidth + 1, gridWidth * 2 + 1],
    [gridWidth + 1, gridWidth + 2, gridWidth * 2, gridWidth * 2 + 1],
    [0, gridWidth, gridWidth + 1, gridWidth * 2 + 1],
    [gridWidth + 1, gridWidth + 2, gridWidth * 2, gridWidth * 2 + 1]
];

const tTetromino = [
    [1, gridWidth, gridWidth + 1, gridWidth + 2],
    [1, gridWidth + 1, gridWidth + 2, gridWidth * 2 + 1],
    [gridWidth, gridWidth + 1, gridWidth + 2, gridWidth * 2 + 1],
    [1, gridWidth, gridWidth + 1, gridWidth * 2 + 1]
];

const oTetromino = [
    [0, 1, gridWidth, gridWidth + 1],
    [0, 1, gridWidth, gridWidth + 1],
    [0, 1, gridWidth, gridWidth + 1],
    [0, 1, gridWidth, gridWidth + 1]
];

const iTetromino = [
    [1, gridWidth + 1, gridWidth * 2 + 1, gridWidth * 3 + 1],
    [gridWidth, gridWidth + 1, gridWidth + 2, gridWidth + 3],
    [1, gridWidth + 1, gridWidth * 2 + 1, gridWidth * 3 + 1],
    [gridWidth, gridWidth + 1, gridWidth + 2, gridWidth + 3]
];

const tetrominoes = [lTetromino, sTetromino, tTetromino, oTetromino, iTetromino];

let random = Math.floor(Math.random() * tetrominoes.length);
let current = tetrominoes[random][currentRotation];

const upNextTetrominoes = [
    [1, displayWidth + 1, displayWidth * 2 + 1, 2],
    [0, displayWidth, displayWidth + 1, displayWidth * 2 + 1],
    [1, displayWidth, displayWidth + 1, displayWidth + 2],
    [0, 1, displayWidth, displayWidth + 1],
    [1, displayWidth + 1, displayWidth * 2 + 1, displayWidth * 3 + 1]
];

document.addEventListener('keydown', control);

startPause_button.addEventListener('click', () => {
    if (timerId) {
        clearInterval(timerId);
        timerId = null;
        startPause_button.innerHTML = 'Resume';
    } else {
        if (gameFinished) {
            gameFinished = false;
            location.reload();
        }
        startPause_button.innerHTML = 'Pause';
        draw();
        freeze();
        timerId = setInterval(moveDown, 1000);
        if (!gameStarted) {
            nextRandom = Math.floor(Math.random() * tetrominoes.length);
            gameStarted = true;
        }
        displayShape();
    }
});

function draw() {
    current.forEach(index => {
        gridSquares_div[currentPosition + index].classList.add('tetromino');
        gridSquares_div[currentPosition + index].style.backgroundColor = colors[random];
    });
}

function undraw() {
    current.forEach(index => {
        gridSquares_div[currentPosition + index].classList.remove('tetromino');
        gridSquares_div[currentPosition + index].style.backgroundColor = '';
    });
}

function moveDown() {
    if (timerId) {
        undraw();
        currentPosition += gridWidth;
        draw();
        freeze();
    }
}

function moveLeft() {
    if (timerId) {
        undraw();
        const isAtLeftEdge = current.some(index => (currentPosition + index) % gridWidth === 0);
        if (!isAtLeftEdge) {
            currentPosition -= 1;
        }
        if (current.some(index => gridSquares_div[currentPosition + index].classList.contains('taken'))) {
            currentPosition += 1;
        }
        draw();
        freeze();
    }
}

function moveRight() {
    if (timerId) {
        undraw();
        const isAtRightEdge = current.some(index => (currentPosition + index) % gridWidth === gridWidth - 1);
        if (!isAtRightEdge) {
            currentPosition += 1;
        }
        if (current.some(index => gridSquares_div[currentPosition + index].classList.contains('taken'))) {
            currentPosition -= 1;
        }
        draw();
        freeze();
    }
}

function rotate() {
    if (timerId) {
        undraw();
        currentRotation++;
        if (currentRotation === current.length) {
            currentRotation = 0;
        }
        current = tetrominoes[random][currentRotation];
        checkRotatedPosition();
        draw();
        freeze();
    }
}

function isAtRight() {
    return current.some(index => (currentPosition + index + 1) % gridWidth === 0);
}

function isAtLeft() {
    return current.some(index => (currentPosition + index) % gridWidth === 0);
}

function checkRotatedPosition(P) {
    P = P || currentPosition;
    if ((P + 1) % gridWidth < 4) {
        if (isAtRight()) {
            currentPosition += 1;
            checkRotatedPosition(P);
        }
    }
    else if (P % gridWidth > 5) {
        if (isAtLeft()) {
            currentPosition -= 1;
            checkRotatedPosition(P);
        }
    }
}

function displayShape() {
    displaySquares_div.forEach(square => {
        square.classList.remove('tetromino');
        square.style.backgroundColor = '';
    });
    upNextTetrominoes[nextRandom].forEach(index => {
        displaySquares_div[displayIndex + index].classList.add('tetromino');
        displaySquares_div[displayIndex + index].style.backgroundColor = colors[nextRandom];
    });
}

function addScore() {
    for (let i = 0; i < 199; i += gridWidth) {
        const row = [i, i + 1, i + 2, i + 3, i + 4, i + 5, i + 6, i + 7, i + 8, i + 9];

        if (row.every(index => gridSquares_div[index].classList.contains('taken'))) {
            score += 10;
            scoreDisplay__span.innerHTML = score;
            row.forEach(index => {
                gridSquares_div[index].classList.remove('taken');
                gridSquares_div[index].classList.remove('tetromino');
                gridSquares_div[index].style.backgroundColor = '';
            });
            const squaresRemoved = gridSquares_div.splice(i, gridWidth);
            gridSquares_div = squaresRemoved.concat(gridSquares_div);
            gridSquares_div.forEach(cell => grid_div.appendChild(cell));
        }
    }
}

function freeze() {
    if (current.some(index => gridSquares_div[currentPosition + index + gridWidth].classList.contains('taken'))) {
        current.forEach(index => gridSquares_div[currentPosition + index].classList.add('taken'));

        random = nextRandom;
        nextRandom = Math.floor(Math.random() * tetrominoes.length);
        current = tetrominoes[random][currentRotation];
        currentPosition = 4;
        if (!gameOver()) {
            setTimeout(draw, 1000);
            displayShape();
            addScore();
        } else {
            current = null;
        }
    }
}

function gameOver() {
    if (current.some(index => gridSquares_div[currentPosition + index].classList.contains('taken'))) {
        clearInterval(timerId);
        timerId = null;
        gameStarted = false;
        gameFinished = true;
        startPause_button.innerHTML = 'Restart';
        return true;
    }
    return false;
}

function control(e) {
    if (e.keyCode === 37) {
        moveLeft();
    } else if (e.keyCode === 38) {
        rotate();
    } else if (e.keyCode === 39) {
        moveRight();
    } else if (e.keyCode === 40) {
        moveDown();
    }
}

let startTime = null;
let endTime = null;
let initialX = null;
let initialY = null;
let flag = true;
let deltaX = null;
let deltaY = null;
let gridStyles = window.getComputedStyle(grid_div);
let squareWidth = parseInt(gridStyles.getPropertyValue('width')) / gridWidth;

grid_div.addEventListener('touchstart', startTouch);
grid_div.addEventListener('touchmove', moveTouch);
grid_div.addEventListener('touchend', endTouch);

function startTouch(e) {
    e.preventDefault();
    startTime = e.timeStamp;
    initialX = e.changedTouches[0].pageX;
    initialY = e.changedTouches[0].pageY;
    flag = true;
}

function moveTouch(e) {
    e.preventDefault();
    deltaX = e.changedTouches[0].pageX - initialX;
    deltaY = e.changedTouches[0].pageY - initialY;

    if (timerId) {
        if (deltaX > 0) {
            while (deltaX > squareWidth) {
                moveRight();
                deltaX -= squareWidth;
                initialX += squareWidth;
                flag = false;
            }
        } else if (deltaX < 0) {
            while (deltaX < squareWidth * (-1)) {
                moveLeft();
                deltaX += squareWidth;
                initialX -= squareWidth;
                flag = false;
            }
        }

        if (deltaY > 0) {
            while (deltaY > squareWidth) {
                moveDown();
                deltaY -= squareWidth;
                initialY += squareWidth;
                flag = false;
            }
        }
    }
}

function endTouch(e) {
    e.preventDefault();
    endTime = e.timeStamp;
    if (timerId && flag && (endTime - startTime < 125)) {
        rotate();
    }
}
