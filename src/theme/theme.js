import { createMuiTheme } from "@material-ui/core/styles";

export default function renderTheme(themeMode, primaryColor, secondaryColor) {
  const theme = createMuiTheme({
    palette: {
      type: themeMode,
      primary: {
        main: primaryColor,
        contrastText: "#ffffff",
      },
      secondary: {
        main: secondaryColor,
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
