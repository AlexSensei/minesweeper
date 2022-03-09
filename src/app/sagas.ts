import { eventChannel } from "redux-saga";
import { take, call, put, all, takeEvery } from "redux-saga/effects";
import { HELP_GET } from "../features/Board/Actions";

export let ws: WebSocket;

export function createWebsocketConnection() {
  return eventChannel(() => {
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
      console.log("Message received: ");
      console.log(message.data);
    };

    return () => {
      ws.close();
    };
  });
}

function* getHelp() {
  ws.send("help");
}

export default function* watchRequests(): any {
  const channel = yield call(createWebsocketConnection);

  while (true) {
    const action = yield take(channel);

    yield put(action);
  }
}

export function* rootSaga() {
  yield all([watchRequests(), takeEvery(HELP_GET, getHelp)]);
}
