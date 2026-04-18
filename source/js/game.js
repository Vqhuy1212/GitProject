import Board from './board.js';

export default class Game {
    constructor(size) {
        this.currentPlayer = "X";

        this.board = new Board(size, this.handleCellClick.bind(this));
        this.init();
    }

    init() {
        this.board.render();
    }

    handleCellClick(cell, i, j) {
            // ❌ nếu ô đã có rồi thì không cho đánh
            if (cell.textContent !== "") return;

            // ✅ đặt X hoặc O
            cell.textContent = this.currentPlayer;
            cell.classList.add(this.currentPlayer);

            // 🔄 đổi lượt
            this.currentPlayer = this.currentPlayer === "X" ? "O" : "X";
        }
}