import React from "react";
import { Route } from "react-router-dom";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Dashboard from "./Dashboard";
import Guide from "./Guide";
import News from "./News";
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
  chartHeader: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cardHeader: {
    color: theme.palette.primary.main,
    marginBottom: "30px",
  },
  newsCardMedia: {
    height: "240px",
  },
  settingsContent: {
    display: "flex",
    flexDirection: "column",
    marginTop: "20px",
  },
  settingsContentRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "500px",
    padding: "5px",
  },
  profileContent: {
    display: "flex",
    flexDirection: "row",
  },
  profilePicture: {
    borderRadius: "5px",
    marginRight: "100px",
  },
  profileInfo: {
    display: "flex",
    flexDirection: "row",
    padding: "10px",
  },
  profileInfoLeft: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    marginRight: "60px",
  },
  profileInfoRight: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
  },
  profileFooter: {
    display: "flex",
    height: "48px",
    alignItems: "flex-end",
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

  return (
    <div className={classes.root}>
      <Route exact path="/guide">
        <Dashboard renderDrawer={true} location="guide" />
        <Guide classes={classes} />
      </Route>
      <Route exact path="/news">
        <Dashboard renderDrawer={true} location="news" />
        <News classes={classes} />
      </Route>
      <Route exact path="/trade">
        <Dashboard renderDrawer={true} location="trade" />
        <Trade classes={classes} />
      </Route>
      <Route exact path="/wallet">
        <Dashboard renderDrawer={true} location="wallet" />
        <Wallet classes={classes} />
      </Route>
      <Route exact path="/settings">
        <Dashboard renderDrawer={true} location="settings" />
        <Settings classes={classes} />
      </Route>
      <Route exact path="/profile">
        <Dashboard renderDrawer={true} location="profile" />
        <Profile classes={classes} />
      </Route>
    </div>
  );
}
