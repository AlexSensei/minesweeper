import { PayloadAction } from "@reduxjs/toolkit";

import { BoardLevel } from "./types";

export const HELP_GET = "HELP_GET";

export const getHelp = () => ({
  type: HELP_GET,
});

export const SESSION_START = "SESSION_START";

export const startSession = (payload: BoardLevel) => ({
  type: SESSION_START,
  payload,
});
