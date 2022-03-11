import { render } from "@testing-library/react";
import Board from "./Board";
import { ThemeProvider } from "@mui/material";
import { theme } from "../../app/theme";
import { store } from "../../app/store";
import { Provider } from "react-redux";

describe("Field testing", () => {
  it("Should render 1 field ", () => {
    const { baseElement } = render(
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <Board />
        </Provider>
      </ThemeProvider>
    );

    expect(baseElement).toBeTruthy();
  });
});
