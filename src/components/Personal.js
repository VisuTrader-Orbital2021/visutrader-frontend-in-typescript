import React from "react";
import { Route, Redirect } from "react-router-dom";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Dashboard from "./Dashboard";
import Forum from "./Forum";
import Guide from "./Guide";
import Trade from "./Trade";
import Wallet from "./Wallet";
import Settings from "./Settings";
import Profile from "./Profile";

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
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 240,
  },
  chartHeader: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  profileHeader: {
    color: theme.palette.primary.main,
    marginBottom: "30px",
  },
  profilePicture: {
    borderRadius: "5px",
  },
  linkText: {
    textDecoration: "underline",
    color: theme.palette.primary.dark,
    "&:hover": {
      color: theme.palette.primary.light,
    },
    "&:active": {
      color: theme.palette.secondary.light,
    },
  },
}));

export default function Personal() {
  const theme = useTheme();
  const classes = useStyles(theme);
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (
    <div className={classes.root}>
      <Route exact path="/forum">
        <Dashboard renderDrawer={true} location="forum" />
        <Forum classes={classes} fixedHeightPaper={fixedHeightPaper} />
      </Route>
      <Route exact path="/guide">
        <Dashboard renderDrawer={true} location="guide" />
        <Guide classes={classes} fixedHeightPaper={fixedHeightPaper} />
      </Route>
      <Route exact path="/trade">
        <Dashboard renderDrawer={true} location="trade" />
        <Trade classes={classes} />
      </Route>
      <Route exact path="/wallet">
        <Dashboard renderDrawer={true} location="wallet" />
        <Wallet classes={classes} fixedHeightPaper={fixedHeightPaper} />
      </Route>
      <Route exact path="/settings">
        <Dashboard renderDrawer={true} location="settings" />
        <Settings classes={classes} fixedHeightPaper={fixedHeightPaper} />
      </Route>
      <Route exact path="/profile">
        <Dashboard renderDrawer={true} location="profile" />
        <Profile classes={classes} fixedHeightPaper={fixedHeightPaper} />
      </Route>
    </div>
  );
}
