export default class Board {
    constructor(size) {
        this.size = size;
        this.element = document.getElementById("board");
    }

    render() {
        this.element.innerHTML = "";

        for (let i = 0; i < this.size; i++) {
            let row = document.createElement("tr");

            for (let j = 0; j < this.size; j++) {
                let cell = document.createElement("td");

                cell.dataset.row = i;
                cell.dataset.col = j;

                row.appendChild(cell);
            }

            this.element.appendChild(row);
        }
    }
}