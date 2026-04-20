export default class Board {
    constructor(size, onCellClick) {
        this.size = size;
        this.element = document.getElementById("board");
        this.onCellClick = onCellClick; //callback từ game
    }

    render() {
        this.element.innerHTML = "";

        for (let i = 0; i < this.size; i++) {
            let row = document.createElement("tr");

            for (let j = 0; j < this.size; j++) {
                let cell = document.createElement("td");

                cell.classList.add("cell"); // để style
                cell.dataset.row = i;
                cell.dataset.col = j;

                // 👇 click
                cell.addEventListener("click", () => {
                    this.onCellClick(cell, i, j);
                });

                row.appendChild(cell);
            }

            this.element.appendChild(row);
        }
    }
}