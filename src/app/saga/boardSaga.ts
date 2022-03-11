import { PayloadAction } from "@reduxjs/toolkit";
import { all, takeEvery } from "redux-saga/effects";

import { ws } from "./socketSaga";
import {
  FIELD_OPEN,
  HELP_GET,
  SESSION_START,
} from "../../features/Board/actions";
import { BoardLevel, FieldPosition } from "../../features/Board/types";

function* getHelp() {
  ws.send("help");
}

function* startSession({ payload }: PayloadAction<BoardLevel>) {
  const { level } = payload;

  ws.send(`new ${level}`);
  ws.send("map");
}

function* openField({ payload }: PayloadAction<FieldPosition>) {
  const { x, y } = payload;

  ws.send(`open ${x} ${y}`);
  ws.send("map");
}

export default function* watchBoardSagas() {
  yield all([
    takeEvery(HELP_GET, getHelp),
    takeEvery(SESSION_START, startSession),
    takeEvery(FIELD_OPEN, openField),
  ]);
}
