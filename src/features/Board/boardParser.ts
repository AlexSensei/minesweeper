export const parseBoard = (board: Array<string>): Array<Array<string>> =>
  board.map((row) => row.split(""));
