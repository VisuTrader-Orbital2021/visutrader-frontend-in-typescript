import React from "react";
import { Route, Redirect } from "react-router-dom";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Dashboard from "./Dashboard";
import ForumContent from "./ForumContent";
import GuideContent from "./GuideContent";
import TradeContent from "./TradeContent";
import WalletContent from "./WalletContent";
import SettingsContent from "./SettingsContent";

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
}));

export default function Personal() {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (
    <div className={classes.root}>
      <Route exact path="/forum">
        <Dashboard renderDrawer={true} location="forum" />
        <ForumContent classes={classes} fixedHeightPaper={fixedHeightPaper} />
      </Route>
      <Route exact path="/guide">
        <Dashboard renderDrawer={true} location="guide" />
        <GuideContent classes={classes} fixedHeightPaper={fixedHeightPaper} />
      </Route>
      <Route exact path="/trade">
        <Dashboard renderDrawer={true} location="trade" />
        <TradeContent classes={classes} fixedHeightPaper={fixedHeightPaper} />
      </Route>
      <Route exact path="/wallet">
        <Dashboard renderDrawer={true} location="wallet" />
        <WalletContent classes={classes} fixedHeightPaper={fixedHeightPaper} />
      </Route>
      <Route exact path="/settings">
        <Dashboard renderDrawer={true} location="settings" />
        <SettingsContent
          classes={classes}
          fixedHeightPaper={fixedHeightPaper}
        />
      </Route>
    </div>
  );
}
