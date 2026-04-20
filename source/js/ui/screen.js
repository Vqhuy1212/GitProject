export default class Screen {
    constructor() {
        this.menu = document.getElementById("menu-screen");
        this.game = document.getElementById("game-screen");
    }

    showMenu() {
        this.menu.style.display = "flex";
        this.game.style.display = "none";
    }

    showGame() {
        this.menu.style.display = "none";
        this.game.style.display = "flex";
    }
}