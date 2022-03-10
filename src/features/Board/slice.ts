import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type BoardState = {
  map: Array<Array<string>>;
};

const initialState: BoardState = {
  map: [],
};

const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    setMap(state, action: PayloadAction<Pick<BoardState, "map">>) {
      state.map = action.payload.map;
    },
  },
});

export const { setMap } = boardSlice.actions;

export default boardSlice.reducer;
