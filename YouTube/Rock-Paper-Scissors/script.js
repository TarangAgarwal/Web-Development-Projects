let userScore = 0;
let computerScore = 0;
const userScore_span = document.getElementById("user-score");
const computerScore_span = document.getElementById("computer-score");
const scoreBoard_div = document.querySelector(".score-board");
const result_p = document.querySelector(".result");
const userChoice_p = document.querySelector(".user-choice");
const computerChoice_p = document.querySelector(".computer-choice");
const whoBeatsWho_p = document.querySelector(".who-beats-who");
const rock_div = document.getElementById("r");
const paper_div = document.getElementById("p");
const scissor_div = document.getElementById("s");
const refresh_button = document.getElementById("refresh");

function getComputerChoice() {
    const options = ["r", "p", "s"];
    const choice = Math.floor(Math.random()*3);
    return options[choice];
}

function convertToWord(choice) {
    if (choice === "r")
        return "Rock";
    if (choice === "p")
        return "Paper";
    return "Scissors";
}

function winVerb(choice) {
    if (choice === "r")
        return "crushes";
    if (choice === "p")
        return "covers";
    return "cuts";
}

function loseVerb(choice) {
    if (choice === "r")
        return "is covered by";
    if (choice === "p")
        return "is cut by";
    return "is crushed by";
}

function userWin(userChoice, computerChoice) {
    const userChoice_div = document.getElementById(userChoice)
    userScore++;
    userScore_span.innerHTML = userScore;
    userChoice_p.innerHTML = `Your Choice:  ${convertToWord(userChoice)}`;
    computerChoice_p.innerHTML = `Computer's Choice:  ${convertToWord(computerChoice)}`;
    whoBeatsWho_p.innerHTML = `${convertToWord(userChoice)} ${winVerb(userChoice)} ${convertToWord(computerChoice)}. `;
    result_p.innerHTML = `You win! 🎉`;
    userChoice_div.classList.add("green-glow");
    setTimeout(() => userChoice_div.classList.remove("green-glow"), 400);
}

function userLose(userChoice, computerChoice) {
    const userChoice_div = document.getElementById(userChoice)
    computerScore++;
    computerScore_span.innerHTML = computerScore;
    userChoice_p.innerHTML = `Your Choice:  ${convertToWord(userChoice)}`;
    computerChoice_p.innerHTML = `Computer's Choice:  ${convertToWord(computerChoice)}`;
    whoBeatsWho_p.innerHTML = `${convertToWord(userChoice)} ${loseVerb(userChoice)} ${convertToWord(computerChoice)}. `;
    result_p.innerHTML = `You lose! 😭`;
    userChoice_div.classList.add("red-glow");
    setTimeout(() => userChoice_div.classList.remove("red-glow"), 400);
}

function gameTie(userChoice, computerChoice) {
    const userChoice_div = document.getElementById(userChoice);
    userChoice_p.innerHTML = `Your Choice:  ${convertToWord(userChoice)}`;
    computerChoice_p.innerHTML = `Computer's Choice:  ${convertToWord(computerChoice)}`;
    whoBeatsWho_p.innerHTML = `${convertToWord(userChoice)} equals ${convertToWord(computerChoice)}. `;
    result_p.innerHTML = `It's a tie...`;
    userChoice_div.classList.add("gray-glow");
    setTimeout(() => userChoice_div.classList.remove("gray-glow"), 400);
}

function game(userChoice) {
    const computerChoice = getComputerChoice();
    switch (userChoice + computerChoice) {
        case "rs":
        case "pr":
        case "sp":
            userWin(userChoice, computerChoice);
            break;
        case "rp":
        case "ps":
        case "sr":
            userLose(userChoice, computerChoice);
            break;
        case "rr":
        case "pp":
        case "ss":
            gameTie(userChoice, computerChoice);
            break;
    }
}

function reset()
{
    userScore = 0;
    computerScore = 0;
    userScore_span.innerHTML = userScore;
    computerScore_span.innerHTML = computerScore;
    userChoice_p.innerHTML = ``;
    computerChoice_p.innerHTML = ``;
    whoBeatsWho_p.innerHTML = ``;
    result_p.innerHTML = `Let's Play!`;
}

function main()
{
    rock_div.addEventListener("click", () => game("r"));
    paper_div.addEventListener("click", () => game("p"));
    scissor_div.addEventListener("click", () => game("s"));
    refresh_button.addEventListener("click", () => reset());
}

main();