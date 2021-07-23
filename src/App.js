import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core/styles";
import renderTheme from "./theme/theme";
import Home from "./components/Home";
import Signup from "./components/Signup";
import Login from "./components/Login";
import { useSelector } from "react-redux";
import ForgotPassword from "./components/ForgotPassword";
import Personal from "./components/Personal";

function App() {
  const color = useSelector((state) => state.color);

  return (
    <ThemeProvider
      theme={renderTheme(color.primaryColor, color.secondaryColor)}
    >
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
