import "./style.css";

const rows = 7;
const columns = 6;

class Game {
  constructor(rows, columns) {
    this.rows = rows;
    this.columns = columns;
    this.board = this.generateBoard();
    this.gameBoardElement = document.getElementById("game-board");
    this.setupBoard();
  }


  setupBoard() {
    this.gameBoardElement.style.gridTemplateColumns = `repeat(${this.columns}, 50px)`;
    this.renderBoard();
  }

  generateBoard() {
    const elements = ["♢", "♠", "♡"];
    const board = [];

    for (let i = 0; i < this.rows; i++) {
      const row = [];

      for (let j = 0; j < this.columns; j++) {
        const randomElement =
          elements[Math.floor(Math.random() * elements.length)];

        row.push(randomElement);
      }

      board.push(row);
    }

    return board;
  }

  renderBoard() {
    this.gameBoardElement.innerHTML = "";

    this.board.forEach((row, i) => {
      row.forEach((cell, j) => {
        const cellElement = document.createElement("div");
        cellElement.className = "cell";
        cellElement.innerText = cell || " ";
        cellElement.addEventListener("click", () => this.handleCellClick(i, j));
        this.gameBoardElement.appendChild(cellElement);
      });
    });
  }

  handleCellClick(row, col) {
    this.removeClickedElements(row, col);
    this.renderBoard();
  }

  removeClickedElements(row, col) {
    const element = this.board[row][col];
    this.visitedCells = Array.from({ length: this.rows }, () => Array(this.columns).fill(false));

    const cellsToClear = this.findSameNeighborElement(row, col, element);
    cellsToClear.forEach(([r, c]) => (this.board[r][c] = null));
  }

  findSameNeighborElement(row, col, element) {
    if (!this.isValidCell(row, col) || this.visitedCells[row][col] || this.board[row][col] !== element) {
      return [];
    }

    const directions = [
          [-1, 0],
      [0, -1], [0, 1],
          [1, 0],
    ];

    const sameNeighborElements = [];

    sameNeighborElements.push([row, col]);
    this.visitedCells[row][col] = true;

    for (const [dRow, dCol] of directions) {
      sameNeighborElements.push(
        ...this.findSameNeighborElement(row + dRow, col + dCol, element)
      );
    }

    return sameNeighborElements;
  }

  isValidCell(row, col) {
    return row >= 0 && row < this.rows && col >= 0 && col < this.columns;
  }
}

const game = new Game(rows, columns);
