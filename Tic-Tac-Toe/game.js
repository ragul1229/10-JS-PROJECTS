 const boardEl = document.querySelector('.board');
    const statusEl = document.querySelector('.status');
    const scoreEl = document.querySelector('.score');
    let board = Array(9).fill(null);
    let currentPlayer = "X";
    let score = JSON.parse(localStorage.getItem("tictactoe-score")) || { X: 0, O: 0, ties: 0 };

    function updateScore() {
      scoreEl.innerHTML = `X: ${score.X}, O: ${score.O}, Ties: ${score.ties}`;
      localStorage.setItem("tictactoe-score", JSON.stringify(score));
    }

    function renderBoard() {
      boardEl.innerHTML = "";
      board.forEach((cell, i) => {
        const div = document.createElement("div");
        div.classList.add("cell");
        div.innerText = cell || "";
        div.addEventListener("click", () => makeMove(i));
        boardEl.appendChild(div);
      });
    }

    function makeMove(i) {
      if (board[i] || checkWinner()) return;
      board[i] = currentPlayer;
      currentPlayer = currentPlayer === "X" ? "O" : "X";
      updateGame();
    }

    function updateGame() {
      renderBoard();
      let winner = checkWinner();
      if (winner) {
        statusEl.innerText = winner === "tie" ? "It's a Tie!" : `${winner} Wins!`;
        if (winner === "tie") score.ties++;
        else score[winner]++;
        updateScore();
      } else {
        statusEl.innerText = `Player ${currentPlayer}'s turn`;
      }
    }

    function checkWinner() {
      const wins = [
        [0,1,2], [3,4,5], [6,7,8],
        [0,3,6], [1,4,7], [2,5,8],
        [0,4,8], [2,4,6]
      ];
      for (let [a,b,c] of wins) {
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
          return board[a];
        }
      }
      return board.includes(null) ? null : "tie";
    }

    function resetBoard() {
      board = Array(9).fill(null);
      currentPlayer = "X";
      updateGame();
    }

    updateScore();
    updateGame();