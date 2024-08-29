let boxes = document.querySelectorAll(".box");
let resetButton = document.querySelector("#reset-button");
let newGameButton = document.querySelector("#new-button");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true; //starting with player O

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5], 
    [6, 7, 8]
];

const resetGame = () => {
    turnO = true;
    enableBoxes();
    msgContainer.style.visibility = "hidden"; 
};

//enable all boxes if we reset or start a new game
const enableBoxes = () => {
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
        box.style.backgroundColor = "beige";
    }
};

//to disable all boxes after a player has won
const disableBoxes = () => {
    for(let box of boxes){
        box.disabled = true;
    }
};

const showWinner = (winner) => {
    msg.innerText = `Player ${winner} is the winner`;
    msgContainer.style.visibility = "visible";
    disableBoxes();
};

//looping through each winning pattern and finding out if a player has won
const checkWinner = () => {
    for(let pattern of winPatterns){
        let val1 = boxes[pattern[0]].innerText;
        let val2 = boxes[pattern[1]].innerText;
        let val3 = boxes[pattern[2]].innerText;

        if(val1 != "" && val2 != "" && val3 != ""){
            if(val1 === val2 && val2 === val3){
                showWinner(val1);
            }
        }
    }
};

boxes.forEach((box) => {
    box.addEventListener("click", (e) => {
        if(turnO === true){ //player O's turn
            box.innerText = "O";
            turnO = false;
        } else { //playex X's turn
            box.innerText = "X";
            turnO = true;
        }
        box.style.backgroundColor = "#FBFBFF";
        box.disabled = true;

        checkWinner();  
    });
});

newGameButton.addEventListener("click", resetGame);
resetButton.addEventListener("click", resetGame);