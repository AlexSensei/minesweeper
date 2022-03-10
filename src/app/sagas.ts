import { eventChannel } from "redux-saga";
import { take, call, put, all, takeEvery } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";

import { HELP_GET, SESSION_START } from "../features/Board/actions";
import { BoardLevel } from "../features/Board/types";
import { setMap } from "../features/Board/slice";
import { parseBoard } from "../features/Board/boardParser";

export let ws: WebSocket;

export function createWebsocketConnection() {
  return eventChannel((emit) => {
    const wsUrl: string | undefined = process.env.REACT_APP_WEBSOCKET_BASE_URL;

    if (!wsUrl) {
      throw new Error("Web socket base url not specified");
    }

    ws = new WebSocket(wsUrl);

    ws.onopen = () => {
      console.log("Connection success!");
    };

    ws.onerror = (error) => {
      console.error("Error" + error);
    };

    ws.onmessage = (message) => {
      const { data } = message;

      switch (data.split("\n")[0]) {
        case "map:":
          return emit(setMap({ map: parseBoard(message.data) }));
      }
    };

    return () => {
      ws.close();
    };
  });
}

function* getHelp() {
  ws.send("help");
}

function* startSession({ payload }: PayloadAction<BoardLevel>) {
  const { level } = payload;
  ws.send(`new ${level}`);
  ws.send("map");
}

export default function* watchRequests(): any {
  const channel = yield call(createWebsocketConnection);

  while (true) {
    const action = yield take(channel);

    yield put(action);
  }
}

export function* rootSaga() {
  yield all([
    watchRequests(),
    takeEvery(HELP_GET, getHelp),
    takeEvery(SESSION_START, startSession),
  ]);
}
