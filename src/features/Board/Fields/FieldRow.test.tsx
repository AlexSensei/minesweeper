import { render } from "@testing-library/react";
import { ThemeProvider } from "@mui/material";
import { theme } from "../../../app/theme";
import { store } from "../../../app/store";
import { Provider } from "react-redux";
import FieldRow from "./FieldRow";

describe("Fields row testing", () => {
  it("Should render 5 fields ", () => {
    const { queryAllByText } = render(
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <FieldRow row={["1", "1", "1", "1", "1"]} index={1} />
        </Provider>
      </ThemeProvider>
    );

    expect(queryAllByText("1")).toHaveLength(5);
  });
});
