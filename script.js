const gameBoard = (() => {
let board = ["", "", "", "", "", "", "", "", ""];

const getBoard = () => board;

const markCell = (index, symbol) =>{
    if(board[index] === ""){
        board[index]= symbol;
        return true;
    }
    return false;
};
 const resetBoard = () => {
    board = ["", "", "", "", "", "", "", "", ""];
    updateBoard();
}
   return{getBoard, markCell, resetBoard}
})();

function createPlayer(name, symbol) {
  return { name, symbol };
}


const game = (() => {

  const p1 = createPlayer("Player1", "X");
  const p2 = createPlayer("Player2", "O");
  let player = p1;
  let gameOver = false;

  const switchPlayer = () => {
    player = player === p1 ? p2 : p1;
  };

  const checkWin = () => {
    const board = gameBoard.getBoard();
    const winningCombos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let combo of winningCombos) {
      const [a, b, c] = combo;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }

    if (!board.includes("")) {
      return "tie";
    }

    return null;
  };

  const play = (index) => {
    if (!gameOver && gameBoard.markCell(index, player.symbol)) {
      const winner = checkWin();
      if (winner) {
        gameOver = true;
        displayDialog(winner === "tie" ? "Tie game!" : `${winner} wins!`);
      } else {
        switchPlayer();
      }
    }
    updateBoard();
  };

  const reset = () => {
    gameBoard.resetBoard();
    player = p1;
    gameOver = false;
    closeDialog();
  };

  return { play, reset, gameOver };
})();



const updateBoard = () => {
    const board = gameBoard.getBoard();
    const buttons = document.querySelectorAll(".button");
    buttons.forEach((cell, index) => {
      cell.textContent = board[index];
    });
  };
  
  document.querySelectorAll(".button").forEach((cell, index) => {
    cell.addEventListener("click", () => {
      if (!game.gameOver && !gameBoard.getBoard()[index]) {
        game.play(index);
      }
    });
  });
  
  document.getElementById("reset").addEventListener("click", () => {
    game.reset();
  });

  
  const displayDialog = (message) => {
    const dialog = document.getElementById("dialog");
    const dialogContent = document.getElementById("dialog-content");
    const but = document.getElementById("reset");
    const form = document.getElementById("form");
    dialogContent.textContent = message;
    dialog.style.display = "block";
    but.textContent = "reset";
    but.style.marginLeft = "60px";
    but.style.marginTop = "20px";
    form.remove();
  
  };

  const closeDialog = () => {
    const dialog = document.getElementById("dialog");
    dialog.style.display = "none";
  };
