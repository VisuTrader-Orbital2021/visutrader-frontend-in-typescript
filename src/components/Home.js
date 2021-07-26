/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { useSpring, animated, config } from "react-spring";
import Dashboard from "./Dashboard";
import Copyright from "./Copyright";

// WORK IN PROGRESS
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  main: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#dfecff",
    minHeight: "100%",
    minWidth: "1024px",
    width: "100%",
    height: "auto",
    position: "fixed",
    top: 0,
    left: 0,
  },
  appBarSpacer: theme.mixins.toolbar,
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    minHeight: "780px",
    height: "auto",
  },
  welcome: {
    fontSize: "60px",
    fontWeight: "700",
  },
  description: {
    fontSize: "24px",
    marginTop: "16px",
    marginBottom: "32px",
  },
  routerLink: {
    textDecoration: "none",
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
  const [flip, set] = useState(false);
  const props = useSpring({
    to: { opacity: 1 },
    from: { opacity: 0 },
    reset: true,
    reverse: flip,
    delay: 200,
    config: config.molasses,
    onRest: () => set(!flip),
  });

  return (
    <main className={classes.main}>
      <div className={classes.appBarSpacer} />
      <div className={classes.container}>
        <animated.div style={props}>
          <Typography className={classes.welcome}>WELCOME</Typography>
          <Typography className={classes.description}>
            The most beginner-friendly paper trading website on the internet
          </Typography>
        </animated.div>
        <RouterLink className={classes.routerLink} to="/trade">
          <Button variant="contained" color="primary">
            GET STARTED
          </Button>
        </RouterLink>
      </div>
      <div>
        <Copyright />
      </div>
    </main>
  );
}
