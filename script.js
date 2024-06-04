let boxes = document.querySelectorAll(".box");

let turn =  "X";
let gameOver = false;

boxes.forEach(e => {
    e.innerHTML= ""
    e.addEventListener("click", () => {
        if(!gameOver && e.innerHTML === ""){
            e.innerHTML = turn;
            cheakWin();
            cheakDraw();
            changeTurn();
        }
    })
})

function changeTurn(){
    if(turn === "X"){
        turn = "O";
        document.querySelector(".turn-bg").style.left="60px";
    }
    else{
        turn = "X";
        document.querySelector(".turn-bg").style.left="0";
    }
}

function cheakWin(){
    let winCombos = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [2,4,6],
        [0,4,8],
        [6,4,2]
    ]

    for(let i = 0; i<winCombos.length; i++){ //Checks if the three boxes in the current combination have the same content (“X” or “O”) and are not empty.
        let v0 = boxes[winCombos[i][0]].innerHTML;
        let v1 = boxes[winCombos[i][1]].innerHTML;
        let v2 = boxes[winCombos[i][2]].innerHTML;

        if(v0 != "" && v0 === v1 && v0 === v2){
            gameOver = true;
            document.querySelector("#results").innerHTML = turn + " Wins!";
            document.querySelector("#restart").style.display = "inline";
            document.querySelector("#end-game").style.display = "inline";

            for(j = 0; j<3; j++){
                boxes[winCombos[i][j]].style.backgroundColor = "#ff6b71";
                boxes[winCombos[i][j]].style.boxShadow = "5px 5px 5px rgb(52, 48, 48)";
                boxes[winCombos[i][j]].style.color = "white"
            }
        }
    }
}

function cheakDraw(){
    if(!gameOver){
        let draw = true;
        boxes.forEach(e => {
            if(e.innerHTML === "") draw = false;
        })
        if(draw){
            gameOver = true;
            document.querySelector("#results").style.animation = "none";
            document.querySelector("#results").innerHTML = "Draw";
            document.querySelector("#restart").style.display = "inline";
            document.querySelector("#end-game").style.display = "inline";
        }
    }

}

document.querySelector("#restart").addEventListener("click", () => {
    gameOver = false;
    turn = "X";
    document.querySelector(".turn-bg").style.left = "0";
    document.querySelector("#results").style.animation = "";
    document.querySelector("#results").innerHTML = "";
    document.querySelector("#restart").style.display = "none";
    document.querySelector("#end-game").style.display = "none";

    boxes.forEach(e => {
        e.innerHTML = "";
        e.style.removeProperty("background-color");
        e.style.removeProperty("color");
        e.style.removeProperty("box-shadow");
    })
})

