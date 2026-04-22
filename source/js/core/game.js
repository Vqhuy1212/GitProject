import Board from './board.js';

export default class Game {
    constructor(size, mode) {
        this.size = size;
        this.mode = mode;

        this.initPopup();

        this.currentPlayer = "X";
        this.isGameOver = false;

        this.playerIcon = document.getElementById("player-icon");

        this.data = Array.from({ length: size }, () =>
            Array(size).fill(null)
        );

        this.popup = document.getElementById("popup");
        this.popupText = document.getElementById("popup-text");

        this.board = new Board(size, this.handleCellClick.bind(this));
        this.init();
    }

    init() {
        this.isGameOver = false;
        this.currentPlayer = "X";


        const container = document.getElementById("player-turn");
        container.innerHTML = 'Player <span id="player-icon"></span>';

        this.playerIcon = document.getElementById("player-icon");

        this.updatePlayerTurn();
        this.board.render();
    }

    handleCellClick(cell, i, j, isAI = false) {
        // Game kết thúc thì không đươc đánh nữa
        if (this.isGameOver) return;

        if (this.mode === "ai" && this.currentPlayer === "O" && !isAI) return;

        // ❌ ô đã có rồi
        if (this.data[i][j] !== null) return;

        // ✅ lưu vào data
        this.data[i][j] = this.currentPlayer;

        // ✅ update UI
        cell.classList.add(this.currentPlayer);

        // 🔥 CHECK WIN
        const winCells = this.checkWin(i, j);

        if (winCells) {
            this.isGameOver = true;

            this.highlightWin(winCells);

            this.updatePlayerTurn(true);
            this.showWinner();

            return;
        }

        // 🔥 CHECK DRAW
        if (this.checkDraw()) {
            this.isGameOver = true;

            this.showDraw();
            return;
        }

        // 🔄 đổi lượt: X -> O, O -> X
        this.currentPlayer = this.currentPlayer === "X" ? "O" : "X";

        this.updatePlayerTurn();

        // AI mode
        if (!isAI && this.mode === "ai" && this.currentPlayer === "O" && !this.isGameOver) {
            setTimeout(() => this.aiMove(), 300);
        }
    }

    updatePlayerTurn(isWinner = false) {
        const container = document.getElementById("player-turn");

        container.innerHTML = (isWinner ? "Winner " : "Player ") + '<span id="player-icon"></span>';

        this.playerIcon = document.getElementById("player-icon");
        this.playerIcon.className = this.currentPlayer;
    }

    showWinner() {
        this.popupText.textContent = this.currentPlayer + " wins!";
        this.popup.style.display = "flex";
    }

    showDraw() {
        this.popupText.textContent = "Draw!";
        this.popup.style.display = "flex";
    }

    highlightWin(cells) {
        const allCells = document.querySelectorAll("#board td");

        cells.forEach(([i, j]) => {
            const index = i * this.size + j;
            allCells[index].classList.add("win");
        });
    }

    initPopup() {
        this.popup = document.getElementById("popup");
        this.popupRestart = document.getElementById("popup-restart");
        this.popupClose = document.getElementById("popup-close");

        // PLAY AGAIN BUTTON
        if (this.popupRestart) {
            this.popupRestart.onclick = () => {
                this.popup.style.display = "none";
                this.restart();
            };
        }

        // CLOSE BUTTON
        if (this.popupClose) {
            this.popupClose.onclick = () => {
                this.popup.style.display = "none";
            };
        }
    }

    restart() {
        if (this.popup) this.popup.style.display = "none";

        // reset trạng thái
        this.currentPlayer = "X";
        this.isGameOver = false;

        // reset data
        this.data = Array.from({ length: this.size }, () =>
            Array(this.size).fill(null)
        );

        // xoá UI bàn cờ
        this.board.element.innerHTML = "";

        // render lại board
        this.board.render();

        // reset UI player
        this.updatePlayerTurn();
    }

    checkWin(row, col) {
        const player = this.data[row][col];

        const directions = [
            [0, 1], // ngang
            [1, 0], // dọc
            [1, 1], // chéo \
            [1, -1] // chéo /
        ];

        for (let [dx, dy] of directions) {
            let cells = [[row, col]];

            // 👉 đi tới
            let x = row + dx;
            let y = col + dy;

            while (this.data[x]?.[y] === player) {
                cells.push([x, y]);
                x += dx;
                y += dy;
            }

            // 👉 đi ngược
            x = row - dx;
            y = col - dy;

            while (this.data[x]?.[y] === player) {
                cells.unshift([x, y]); // thêm vào đầu
                x -= dx;
                y -= dy;
            }

            if (cells.length >= 5) {
                return cells; // 🔥 trả về danh sách ô thắng
            }
        }

        return null;
    }

    checkDraw() {
        for (let i = 0; i < this.size; i++) {
            for (let j = 0; j < this.size; j++) {
                if (this.data[i][j] === null) {
                    return false;
                }
            }
        }
        return true;
    }

    aiMove() {
        if (this.isGameOver) return;

        let emptyCells = [];

        for (let i = 0; i < this.size; i++) {
            for (let j = 0; j < this.size; j++) {
                if (this.data[i][j] === null) {
                    emptyCells.push([i, j]);
                }
            }
        }

        if (emptyCells.length === 0) return;

        const [i, j] = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        const cell = document.querySelectorAll("#board td")[i * this.size + j];

        this.handleCellClick(cell, i, j, true);
    }
}