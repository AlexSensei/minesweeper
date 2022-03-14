import { Server } from "mock-socket";
import { createWebsocketConnection } from "./socketSaga";
import { openField, startSession } from "./boardSaga";
import { FIELD_OPEN, SESSION_START } from "../../features/Board/actions";

describe("Websocket saga and communication test", () => {
  let socketMockUrl: string = "ws://localhost:8080";
  let mockServer: Server;

  beforeEach(() => {
    if (mockServer) {
      mockServer.close();
    }

    if (!process.env.REACT_APP_WEBSOCKET_BASE_URL) {
      process.env.REACT_APP_WEBSOCKET_BASE_URL = socketMockUrl;
    }

    mockServer = new Server(process.env.REACT_APP_WEBSOCKET_BASE_URL);

    createWebsocketConnection();
  });

  it("Should be able to start new session", () => {
    mockServer.on("connection", (socket) => {
      socket.on("message", (message) => {
        expect(message).toBe("new 1");
      });
    });

    startSession({ payload: { level: 1 }, type: SESSION_START }).next();
  });

  it("Should be able to open field", () => {
    mockServer.on("connection", (socket) => {
      socket.on("message", (message) => {
        expect(message).toBe("open 1 1");
      });
    });

    openField({ payload: { x: 1, y: 1 }, type: FIELD_OPEN }).next();
  });

  afterAll(() => {
    if (mockServer) {
      mockServer.close();
    }
  });
});
