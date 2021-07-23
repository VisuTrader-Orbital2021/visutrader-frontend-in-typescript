import { createMuiTheme } from "@material-ui/core/styles";
import store from "../redux/store";

export default function renderTheme(primaryColor, secondaryColor) {
  const theme = createMuiTheme({
    palette: {
      primary: {
        main: primaryColor,
        contrastText: "#ffffff",
      },
      secondary: {
        main: secondaryColor,
        contrastText: "#ffffff",
      },
      rising: "#04f77e",
      falling: "#ff3911",
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
        fontWeight: "700",
      },
      h4: {
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

  return theme;
}
