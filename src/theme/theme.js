import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#758afe",
      main: "#536dfe",
      dark: "#3a4cb1",
      contrastText: "#ffffff",
    },
    secondary: {
      light: "#ef6694",
      main: "#ec407a",
      dark: "#a52c55",
      contrastText: "#ffffff",
    },
  },
  typography: {
    fontFamily: ["Nunito Sans", "sans-serif"].join(","),
    h1: {
      fontSize: "36px",
      fontWeight: "700",
    },
    h2: {
      fontSize: "28px",
      fontWeight: "700",
    },
    h3: {
      fontSize: "20px",
      fontWeight: "400",
    },
    body1: {
      fontSize: "16px",
      fontWeight: "400",
    },
    body2: {
      fontSize: "12px",
      fontWeight: "400",
    },
  },
});

export default theme;
