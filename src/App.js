import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core/styles";
import renderTheme from "./theme/theme";
import Home from "./components/Home";
import Signup from "./components/Signup";
import Login from "./components/Login";
import { useSelector } from "react-redux";
import ForgotPassword from "./components/forget-password/ForgotPassword";
import ResetPassword from "./components/forget-password/ResetPassword";
import ChangePassword from "./components/ChangePassword";
import Personal from "./components/Personal";

function App() {
  const { primaryColor, secondaryColor, themeMode } = useSelector(
    (state) => state.color
  );

  return (
    <ThemeProvider theme={renderTheme(themeMode, primaryColor, secondaryColor)}>
      <BrowserRouter>
        <div>
          <Switch>
            <Route exact path="/signup">
              <Signup />
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/forgot-password">
              <ForgotPassword />
            </Route>
            <Route exact path="/forgot-password/:uid/:token">
              <ResetPassword />
            </Route>
            <Route exact path="/change-password">
              <ChangePassword />
            </Route>
            <Route
              exact
              path={[
                "/guide",
                "/news",
                "/trade",
                "/wallet",
                "/settings",
                "/profile",
              ]}
            >
              <Personal />
            </Route>
            <Route exact path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
