import { BoardLevel, FieldPosition } from "./types";

export const HELP_GET = "HELP_GET";

export const getHelp = () => ({
  type: HELP_GET,
});

export const SESSION_START = "SESSION_START";

export const startSession = (payload: BoardLevel) => ({
  type: SESSION_START,
  payload,
});

export const FIELD_OPEN = "FIELD_OPEN";

export const openField = (payload: FieldPosition) => ({
  type: FIELD_OPEN,
  payload,
});
