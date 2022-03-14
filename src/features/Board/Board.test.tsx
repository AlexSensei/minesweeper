import { render } from "@testing-library/react";
import Board from "./Board";
import { ThemeProvider } from "@mui/material";
import { theme } from "../../app/theme";
import { store } from "../../app/store";
import { Provider } from "react-redux";
import { setMap } from "./slice";

describe("Board testing test", () => {
  it("Should render board ", () => {
    const { baseElement } = render(
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <Board />
        </Provider>
      </ThemeProvider>
    );

    expect(baseElement).toBeTruthy();
  });

  it("Should render game settings", () => {
    const { getByText } = render(
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <Board />
        </Provider>
      </ThemeProvider>
    );

    expect(getByText("Game Settings")).toBeInTheDocument();
  });

  it("Should render board settings", () => {
    const { queryByText } = render(
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <Board />
        </Provider>
      </ThemeProvider>
    );

    store.dispatch(
      setMap({
        map: [
          ["1", "2"],
          ["1", "2"],
        ],
      })
    );
    expect(queryByText("Game Settings")).not.toBeInTheDocument();
  });
});
