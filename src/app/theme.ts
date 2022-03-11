import { createTheme } from "@mui/material";
import { green, red, orange, grey, blue } from "@mui/material/colors";

export const theme = createTheme({
  palette: {
    primary: {
      main: blue[700],
    },
    secondary: {
      main: grey[300],
    },
    warning: {
      main: orange[500],
    },
    success: {
      main: green[800],
    },
    error: {
      main: red[700],
    },
  },
});
