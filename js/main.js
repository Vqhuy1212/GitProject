import Game from './core/game.js';
import Menu from './ui/menu.js';
import Screen from './ui/screen.js';

const screen = new Screen();

let game = null;
let currentMode = null;

// MENU
const menu = new Menu((mode) => {
    currentMode = mode;

    screen.showGame();
    game = new Game(10, mode);
});

// BACK BUTTON
const backBtn = document.getElementById("back-btn");

backBtn.addEventListener("click", () => {
    // quay lại menu
    screen.showMenu();

    // reset game
    game = null;
});

// RESTART BUTTON
const restartBtn = document.getElementById("restart-btn");

restartBtn.addEventListener("click", () => {
    if (game) game.restart();
});
