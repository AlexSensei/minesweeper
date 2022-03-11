import { render } from "@testing-library/react";
import Field from "./Field";
import { ThemeProvider } from "@mui/material";
import { theme } from "../../../app/theme";
import { store } from "../../../app/store";
import { Provider } from "react-redux";
import { addFlag } from "../slice";
import { FIELD_VALUES } from "../constants";
import FieldRow from "./FieldRow";

describe("Field row testing", () => {
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
