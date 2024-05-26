// const gameBoard = ["", "", "", "", "", "", "", "", ""];
let start = document.getElementById("Start"); 
let dialog1 = document.getElementById("dialog1");
let p1 = document.getElementById("Player1");
let p2 = document.getElementById("Player2");
let cells = document.getElementsByClassName("button");
let dialog2 = document.getElementById("End");
let numCells = cells.length;
const player_X = "X";
const player_O = "O";
let turn = player_X;

const gameBoard = Array(numCells);
gameBoard.fill(null);

start.addEventListener('click',()=> {
  dialog1.close();
  createPlayer(p1.value, p2.value);
});
//does'nt work the values are not taken out
function createPlayer(p1, p2){
  let player1 = p1;
  let player2 = p2;
  console.log(player1);
  console.log(player2);
  return(player1, player2);
}



for(let i = 0; i < numCells; i++){
  cells[i].addEventListener('click', ()=>{
    cellClick();
    whoWon();

  })

function cellClick(){

  if(dialog2.classList.contains("visible")){
    return;
  }

  const cellNumber = cells[i].dataset.index;
  
  if (cells[i].innerText != ""){
    return;
  }

  if (turn === player_X){
    cells[i].innerText = player_X;
    gameBoard[i] = player_X;
    turn = player_O;
  } 
  else {
    cells[i].innerText = player_O;
    gameBoard[cellNumber] = player_O;
    turn = player_X;
  }
 }
 function whoWon(){
  for (const winningCombination of winningCombinations ){
    const combo = winningCombination;
    const cellValue1 = gameBoard[combo[0]];
    const cellValue2 = gameBoard[combo[1]];
    const cellValue3 = gameBoard[combo[2]];
    
    if (cellValue1 != null && cellValue1 === cellValue2 && cellValue1 === cellValue3){
      if (turn == player_X){
        winner(p2.value);

      }
      if (turn == player_O){
        winner(p1.value);

      }
      return;
    }

  }
  const cellFilled = gameBoard.every((cell) => cell !== null); 
  if (cellFilled){
    winner(null);
  
  }

}
function newGame(){
  dialog2.className = "hidden";
  gameBoard.fill(null);
  for(let i = 0; i < numCells; i++){
  cells[i].innerText = "";
  }
  turn = player_X;
}


}



function winner(winnerText){
  const but = document.createElement("button");
  const div = document.createElement("div");
  let text = 'Draw!'
  if (winnerText != null){
    text = `'Winner is ${winnerText}'`;
  }
  dialog2.className = "visible"
  but.setAttribute("id", "reset");
  dialog2.appendChild(div);
   dialog2.show();
   div.textContent = text;
   dialog2.appendChild(but);
   but.textContent = "Reset";
   div.style.marginLeft = "50px"
   but.style.marginLeft = "55px"
   but.addEventListener('click', () =>{
    newGame();
    but.remove()
    div.remove()
    dialog2.close();
   });

}





const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];



 









