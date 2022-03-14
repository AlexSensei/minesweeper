import { render } from "@testing-library/react";
import { ThemeProvider } from "@mui/material";
import { theme } from "../../app/theme";
import { store } from "../../app/store";
import { Provider } from "react-redux";
import BoardSettings from "./BoardSettings";
import { GAME_STATES } from "./constants";
import { setGameState } from "./slice";

describe("Board settings test", () => {
  it("Should render board settings", () => {
    const { baseElement } = render(
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <BoardSettings />
        </Provider>
      </ThemeProvider>
    );

    expect(baseElement).toBeTruthy();
  });

  it("Should not render status", () => {
    const { queryByText } = render(
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <BoardSettings />
        </Provider>
      </ThemeProvider>
    );

    expect(queryByText(GAME_STATES.PLAYING)).not.toBeInTheDocument();
  });

  it("Should render you won status", () => {
    const { getByText } = render(
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <BoardSettings />
        </Provider>
      </ThemeProvider>
    );

    store.dispatch(setGameState(GAME_STATES.WIN));

    expect(getByText(GAME_STATES.WIN)).toBeInTheDocument();
  });

  it("Should not render you lost status", () => {
    const { getByText } = render(
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <BoardSettings />
        </Provider>
      </ThemeProvider>
    );

    store.dispatch(setGameState(GAME_STATES.LOSE));
    expect(getByText(GAME_STATES.LOSE)).toBeInTheDocument();
  });
});
