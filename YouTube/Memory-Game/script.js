const cards = document.querySelectorAll('.memory-card');
let bestScore_p = document.getElementById('best-score');
let turnsCount_p =document.getElementById('turns-played');

let hasFlippedCard = false;
let lockBoard = false;
let pairsCount = 0;
let turnsCount = 0;
let bestScore = null;
let firstCard, secondCard;

function unflipAll() {
    cards.forEach(card => {
        card.classList.remove('flip');
    });
}

function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos;
    });
};

function playAgain() {
    resetBoard();
    turnsCount_p.innerHTML = "Turns Played: 0";
    turnsCount = 0;
    pairsCount = 0;
    unflipAll();
    shuffle();
    startGame();
}

function gameOver() {
    resetBoard();
    if (bestScore == null || turnsCount < bestScore) {
        bestScore = turnsCount;
        bestScore_p.innerHTML = `Best Score: ${bestScore}`;
    }
    turnsCount = 0;
    pairsCount = 0;
}

function resetBoard() {
    hasFlippedCard = false;
    lockBoard = false;
    firstCard = null;
    secondCard = null;    
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
}

function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        lockBoard = false;
    }, 1000);
}

function checkForMatch() {
    if (firstCard.dataset.framework === secondCard.dataset.framework) {
        disableCards();
        pairsCount++;
        if (pairsCount == 6) {
            gameOver();
        }
    } else {
        unflipCards();
    }
}

function flipCard() {
    if (!lockBoard && this != firstCard) {
        this.classList.add('flip');

        if (!hasFlippedCard) {
            hasFlippedCard = true;
            firstCard = this;
        } else {
            hasFlippedCard = false;
            secondCard = this;
            turnsCount++;
            turnsCount_p.innerHTML = "Turns Played: " + turnsCount;
            checkForMatch();
        }
    }
}

function startGame() {
    cards.forEach(card => card.addEventListener('click', flipCard));
}

shuffle();
startGame();
