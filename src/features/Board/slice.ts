import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GAME_STATES } from "./constants";
import { FieldPosition } from "./types";

export type BoardState = {
  map: Array<Array<string>>;
  flags: { [key: string]: boolean };
  gameState: string;
};

const initialState: BoardState = {
  map: [],
  flags: {},
  gameState: GAME_STATES.PLAYING,
};

const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    setMap(state, action: PayloadAction<Pick<BoardState, "map">>) {
      state.map = action.payload.map;
    },
    addFlag(state, action: PayloadAction<FieldPosition>) {
      const { x, y } = action.payload;

      state.flags[`${x}-${y}`] = state.flags[`${x}-${y}`] ? false : true;
    },
    setGameState(state, action: PayloadAction<string>) {
      state.gameState = action.payload;
    },
    resetState: () => initialState,
  },
});

export const { setMap, addFlag, setGameState, resetState } = boardSlice.actions;

export default boardSlice.reducer;
