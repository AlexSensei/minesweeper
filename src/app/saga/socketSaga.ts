import { eventChannel } from "redux-saga";
import { call, take, put } from "redux-saga/effects";

import { setGameState, setMap, resetState } from "../../features/Board/slice";
import { parseBoard } from "../../features/Board/boardParser";
import { GAME_STATES } from "../../features/Board/constants";

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

      const payload = data.split("\n");
      const header = payload.shift();

      switch (header) {
        case "map:":
          return emit(setMap({ map: parseBoard(payload) }));
        case "open: You lose":
          return emit(setGameState(GAME_STATES.LOSE));
        case (header.match("open: You win") || {}).input:
          return emit(setGameState(GAME_STATES.WIN));
        case "new: OK":
          return emit(resetState());
      }
    };

    return () => {
      ws.close();
    };
  });
}

export default function* watchSocketsSaga(): any {
  const channel = yield call(createWebsocketConnection);

  while (true) {
    const action = yield take(channel);

    yield put(action);
  }
}
