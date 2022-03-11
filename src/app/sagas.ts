import { all } from "redux-saga/effects";

import watchBoardSagas from "./saga/boardSaga";
import watchSocketsSaga from "./saga/socketSaga";

export function* rootSaga() {
  yield all([watchSocketsSaga(), watchBoardSagas()]);
}
