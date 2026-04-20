export default class Menu {
    constructor(onSelectMode) {
        this.pvpBtn = document.getElementById("pvp-btn");
        this.aiBtn = document.getElementById("ai-btn");

        this.onSelectMode = onSelectMode;

        this.init();
    }

    init() {
        this.pvpBtn.addEventListener("click", () => {
            this.onSelectMode("pvp");
        });

        this.aiBtn.addEventListener("click", () => {
            this.onSelectMode("ai");
        });
    }
}