import { createTheme, colors } from "@material-ui/core";
import shadows from "./shadows";
import typography from "./typography";

const theme = createTheme({
  palette: {
    background: {
      dark: "#ffffff",
      default: colors.common.white,
      paper: colors.common.white,
    },
    primary: {
      main: "#000000",
    },
    secondary: {
      main: "#ffffff",
    },
    text: {
      primary: "#000000",
      secondary: "#a4a4a4",
      white: "#ffffff",
    },
  },
  shadows,
  typography,
});

export default theme;
