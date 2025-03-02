document.addEventListener("DOMContentLoaded", () => {
    const board = document.getElementById("board");
    const status = document.getElementById("status");
    const resetButton = document.getElementById("resetButton");
    const cells = document.querySelectorAll(".cell");

    let currentPlayer = "X";
    let gameState = ["", "", "", "", "", "", "", "", ""];
    let gameActive = true;

    const winningConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8], 
        [0, 4, 8], [2, 4, 6]
    ];

    function handleCellClick(event) {
        const clickedCell = event.target;
        const clickedCellIndex = parseInt(clickedCell.getAttribute("data-index"));

        if (!gameActive || gameState[clickedCellIndex] !== "") return;

        gameState[clickedCellIndex] = currentPlayer;
        clickedCell.textContent = currentPlayer;
        clickedCell.classList.add(currentPlayer);

        checkForWinner();
    }

    function checkForWinner() {
        for (let condition of winningConditions) {
            const [a, b, c] = condition;
            if (gameState[a] && gameState[a] === gameState[b] && gameState[b] === gameState[c]) {
                status.textContent =  `Player ${currentPlayer} wins!` ;
                gameActive = false;
                return;
            }
        }

        if (!gameState.includes("")) {
            status.textContent = "It's a draw!";
            gameActive = false;
            return;
        }

        currentPlayer = currentPlayer === "X" ? "O" : "X";
        status.textContent =  `Player ${currentPlayer}'s Turn` ;
    }

    function resetGame() {
        gameState = ["", "", "", "", "", "", "", "", ""];
        gameActive = true;
        currentPlayer = "X";
        status.textContent =  `Player ${currentPlayer}'s Turn` ;
        cells.forEach(cell => {
            cell.textContent = "";
            cell.classList.remove("X", "O");
        });
    }

    cells.forEach(cell => cell.addEventListener("click", handleCellClick));
    resetButton.addEventListener("click", resetGame);
});