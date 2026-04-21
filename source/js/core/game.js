import Board from './board.js';

export default class Game {
    constructor(size) {
        this.currentPlayer = "X";

        this.playerIcon = document.getElementById("player-icon");

        this.board = new Board(size, this.handleCellClick.bind(this));
        this.init();
    }

    init() {
        this.updatePlayerTurn();
        this.board.render();
    }

    handleCellClick(cell, i, j) {
        if (this.isGameOver) return;

        // Nếu ô đã có rồi thì không cho đánh
        if (cell.classList.contains("X") || cell.classList.contains("O")) return;

        // ✅ đặt X hoặc O
        cell.classList.add(this.currentPlayer);

        // 🔄 đổi lượt: X -> O, O -> X
        this.currentPlayer = this.currentPlayer === "X" ? "O" : "X";

        this.updatePlayerTurn();
    }

    updatePlayerTurn() {
        this.playerIcon.className = this.currentPlayer;
    }
}