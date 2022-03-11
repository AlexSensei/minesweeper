import { render } from "@testing-library/react";
import Field from "./Field";
import { ThemeProvider } from "@mui/material";
import { theme } from "../../../app/theme";
import { store } from "../../../app/store";
import { Provider } from "react-redux";
import { addFlag } from "../slice";
import { FIELD_VALUES } from "../constants";

describe("Field testing", () => {
  it("Should render 1 field ", () => {
    const { getByText } = render(
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <Field value={"1"} />
        </Provider>
      </ThemeProvider>
    );

    expect(getByText("1")).toBeInTheDocument();
  });

  it("Should render flag field ", () => {
    const { getByTestId } = render(
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <Field value={"1"} index={1} rowIndex={1} />
        </Provider>
      </ThemeProvider>
    );

    store.dispatch(addFlag({ x: 1, y: 1 }));

    expect(getByTestId("FlagIcon")).toBeInTheDocument();
  });

  it("Should render bomb field ", () => {
    const { getByTestId } = render(
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <Field value={FIELD_VALUES.BOMB} />
        </Provider>
      </ThemeProvider>
    );

    expect(getByTestId("FlareIcon")).toBeInTheDocument();
  });
});
