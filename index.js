let boxes = document.querySelectorAll(".box");
let resetButton = document.getElementById("reset-btn");
let msgContainer = document.getElementById("msg-container");
let msg = document.getElementById("msg");
let newGameBtn = document.getElementById("new-btn");
let turnLabel = document.getElementById("turn-label");
let scoreXEl = document.getElementById("score-x");
let scoreOEl = document.getElementById("score-o");
let startScreen = document.getElementById("start-screen");
let startBtn = document.getElementById("start-game-btn");
let p1Input = document.getElementById("p1-name-input");
let p2Input = document.getElementById("p2-name-input");
let p1Label = document.getElementById("p1-label");
let p2Label = document.getElementById("p2-label");

let turn0 = true;
let scoreX = 0;
let scoreO = 0;
let p1Name = "Player 1"; // Represents X
let p2Name = "Player 2"; // Represents O

const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

// Start Game Logic
startBtn.addEventListener("click", () => {
    if (p1Input.value.trim() !== "") p1Name = p1Input.value;
    if (p2Input.value.trim() !== "") p2Name = p2Input.value;

    p1Label.innerText = `${p1Name} Score:`;
    p2Label.innerText = `${p2Name} Score:`;

    startScreen.classList.add("hide");
    // Game starts with O (turn0 = true), which is Player 2
    turnLabel.innerText = `${p2Name}'s Turn`;
});

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turn0) {
            // O Turn (Player 2)
            box.innerText = "O";
            turn0 = false;
            turnLabel.innerText = `${p1Name}'s Turn`;
        } else {
            // X Turn (Player 1)
            box.innerText = "X";
            turn0 = true;
            turnLabel.innerText = `${p2Name}'s Turn`; // Next is O
        }
        box.classList.add("pop");
        box.addEventListener("animationend", () => box.classList.remove("pop"), { once: true });

        box.disabled = true;
        checkWinner();
    });
});

const checkWinner = () => {
    for (let p of winPatterns) {
        let a = boxes[p[0]].innerText;
        let b = boxes[p[1]].innerText;
        let c = boxes[p[2]].innerText;

        if (a !== "" && a === b && b === c) {
            showWinner(a);
            return;
        }
    }

    let full = [...boxes].every(box => box.innerText !== "");
    if (full) showDraw();
};

const showWinner = (winner) => {
    msg.innerText = `${winner === "X" ? p1Name : p2Name} Wins!`;
    msgContainer.classList.remove("hide");
    disableBoxes();
    if (winner === "X") {
        scoreX++;
        scoreXEl.innerText = scoreX;
    } else {
        scoreO++;
        scoreOEl.innerText = scoreO;
    }
};

const showDraw = () => {
    msg.innerText = "It's a Draw!";
    msgContainer.classList.remove("hide");
};

const disableBoxes = () => {
    boxes.forEach(box => box.disabled = true);
};

const enableBoxes = () => {
    boxes.forEach(box => {
        box.disabled = false;
        box.innerText = "";
    });
};

const resetGame = () => {
    turn0 = true;
    turnLabel.innerText = `${p2Name}'s Turn`;
    enableBoxes();
    msgContainer.classList.add("hide");
};

newGameBtn.addEventListener("click", resetGame);
resetButton.addEventListener("click", resetGame);