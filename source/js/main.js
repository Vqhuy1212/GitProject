import Game from './core/game.js';
import Menu from './ui/menu.js';
import Screen from './ui/screen.js';

const screen = new Screen();

let game = null;

// MENU
const menu = new Menu((mode) => {
    // chuyển màn hình
    screen.showGame();

    // tạo game mới
    game = new Game(10);

    console.log("Mode:", mode);
});

// BACK BUTTON
const backBtn = document.getElementById("back-btn");

backBtn.addEventListener("click", () => {
    // quay lại menu
    screen.showMenu();

    // reset game
    game = null;

    // xoá bàn cờ (tránh giữ trạng thái cũ)
    document.getElementById("board").innerHTML = "";
});

// RESTART BUTTON
const restartBtn = document.getElementById("restart-btn");

restartBtn.addEventListener("click", () => {
    // xoá bàn cờ cũ
    document.getElementById("board").innerHTML = "";

    // tạo lại game mới
    game = new Game(10);
});