export const BOARD_LEVELS: Array<{ value: number; label: string }> = [
  { value: 1, label: "Small" },
  { value: 2, label: "Medium" },
  { value: 3, label: "Large" },
  { value: 4, label: "Extra large" },
];

export const GAME_STATES = {
  PLAYING: "PLAYING",
  WIN: "YOU WON",
  LOSE: "YOU LOSE",
};

export const FIELD_VALUES = {
  BOMB: "*",
  EMPTY: "0",
  HIDDEN: "□",
};
