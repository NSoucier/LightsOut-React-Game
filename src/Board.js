import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows, ncols, chanceLightStartsOn }) {
  const [board, setBoard] = useState(createBoard());

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    let initialBoard = [];
    // TODO: create array-of-arrays of true/false values
    for (let row=0; row<nrows; row++) {
      initialBoard[row] = [];
      for (let col=0; col<ncols; col++) {
        let status = Math.random() < parseFloat(chanceLightStartsOn) ? true : false;
        initialBoard[row][col] = status;
      }
    }
    return initialBoard;
  }

  function hasWon() {
    // TODO: check the board in state to determine whether the player has won.
    // return: true when they won, false when they haven't won yet 
    return board.every(row => row.every(state => !state)); 
  }

  function flipCellsAround(coord) {
    setBoard(oldBoard => {
      const [y, x] = coord.split("-").map(Number);
      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it
        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      // TODO: Make a (deep) copy of the oldBoard
      const copyOldBoard = JSON.parse(JSON.stringify(oldBoard));

      // TODO: in the copy, flip this cell and the cells around it
      flipCell(y,x,copyOldBoard);
      flipCell(y,x-1,copyOldBoard);
      flipCell(y,x+1,copyOldBoard);
      flipCell(y-1,x,copyOldBoard);
      flipCell(y+1,x,copyOldBoard);

      // TODO: return the copy
      return copyOldBoard
    });
  }

  // if the game is won, just show a winning msg & render nothing else
  // TODO
  if (hasWon()) {
    return <h2>You won!</h2>
  }

  // make table board
  // TODO
  return (
    <table className="Board">
      <tbody>
        {board.map((row, y) => (
          <tr key={y}>
            {row.map((cell, x) => 
              <Cell 
                flipCellsAroundMe={() => flipCellsAround(`${y}-${x}`)} 
                isLit={cell} 
                key={`${y}-${x}`}/>)}
          </tr>
        ))}
      </tbody>  
    </table>
  )
}

export default Board;
