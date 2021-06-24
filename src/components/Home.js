/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dashboard from "./Dashboard";
import Copyright from "./Copyright";
import "../styles/Home.css";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  buttonStyle: {
    textDecoration: "none",
    color: "primary",
  },
}));

export default function Home() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Dashboard renderDrawer={false} />
      <MainContent classes={classes} />
    </div>
  );
}

function MainContent({ classes }) {
  return (
    <main>
      <div className={classes.appBarSpacer} />
      <div className="welcome-section">
        <h1>WELCOME</h1>
        <span>
          The most beginner-friendly paper trading app on the internet
        </span>
        {/* TODO: Change RouterLink destination */}
        <RouterLink to="/trade" className={classes.buttonStyle}>
          <Button color="primary">GET STARTED</Button>
        </RouterLink>
      </div>
      <div className="features-section">
        <Feature>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cu pidatat non proident, sunt in
          culpa qui officia deserunt mol lit anim id est laborum.
        </Feature>
        <Feature>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cu pidatat non proident, sunt in
          culpa qui officia deserunt mol lit anim id est laborum.
        </Feature>
        <Feature>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cu pidatat non proident, sunt in
          culpa qui officia deserunt mol lit anim id est laborum.
        </Feature>
      </div>
      <div className="footer-section">
        <Copyright />
      </div>
    </main>
  );
}

function Feature({ src, children }) {
  return (
    <div className="feature">
      <span className="feature-text">{children}</span>
      {/* TODO: replace the following line with image component */}
      <span className="feature-image">IMAGE</span>
      {/* <img className="feature-image" src={src} /> */}
    </div>
  );
}
