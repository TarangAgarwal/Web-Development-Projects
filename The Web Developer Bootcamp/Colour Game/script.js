const squares = document.querySelectorAll(".square");
const colorDisplay = document.querySelector("#color-display");
const messageDisplay = document.querySelector("#message");
const heading = document.querySelector("h1");
const resetButton = document.querySelector("#reset");
const modeButtons = document.querySelectorAll(".mode");

let numberOfSquares = 6;
let colors = [];
let pickedColor;

start();

function start() {
    setUpModeButtons();
    setUpSquares();
    setUpResetButton();
    reset();
}

function setUpModeButtons() {
    for (let i = 0; i < modeButtons.length; i++) {
        modeButtons[i].addEventListener('click', function() {
            modeButtons[0].classList.remove("selected");
            modeButtons[1].classList.remove("selected");
            this.classList.add('selected');
    
            if (this.textContent === "Easy" && numberOfSquares === 6) {
                numberOfSquares = 3;
                reset();
            } else if (this.textContent === "Hard" && numberOfSquares === 3) {
                numberOfSquares = 6;
                reset();
            }
        });
    }
}

function setUpSquares() {
    for (let i = 0; i < squares.length; i++) {
        squares[i].addEventListener('click', function() {
            const clickedColor = this.style.backgroundColor;
            if (clickedColor === pickedColor) {
                messageDisplay.textContent = "Correct";
                changeColors(pickedColor);
                heading.style.backgroundColor = pickedColor;
                resetButton.textContent = "Play Again?";
            } else {
                this.style.backgroundColor = "#232323";
                messageDisplay.textContent = "Try Again";
            }
        });
    }
}

function setUpResetButton() {
    resetButton.addEventListener('click', reset);
}

function reset() {
    colors = generateRandomcolors(numberOfSquares);
    pickedColor = pickColor();
    colorDisplay.textContent = pickedColor;
    messageDisplay.textContent = "";
    resetButton.textContent = "New Colours";
    heading.style.backgroundColor = "steelblue";

    for (let i = 0; i < squares.length; i++) {
        if (colors[i]) {
            squares[i].style.display = "block";
            squares[i].style.backgroundColor = colors[i];
        } else {
            squares[i].style.display = "none";
        }
    }
}

function changeColors(color) {
    for (let i = 0; i < squares.length; i++) {
        squares[i].style.backgroundColor = color;
    }
}

function pickColor() {
    const randomIndex = Math.floor(Math.random()*colors.length);
    return colors[randomIndex];
}

function generateRandomcolors(num) {
    let arr = [];
    for (let i = 0; i < num; i++) {
        arr.push(randomColor());
    }
    return arr;
}

function randomColor() {
    const red = Math.floor(Math.random()*256);
    const green = Math.floor(Math.random()*256);
    const blue = Math.floor(Math.random()*256);
    return `rgb(${red}, ${green}, ${blue})`;
}