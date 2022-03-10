export const parseBoard = (board: string): Array<Array<string>> => {
  const boardRows: Array<string> = board.split("\n");

  // remove the header ( map string )
  boardRows.shift();

  return boardRows.map((row) => row.split(""));
};
