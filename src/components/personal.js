import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Dashboard from './dashboard';
import ForumContent from './forumContent';
import GuideContent from './guideContent';
import TradeContent from './tradeContent';
import WalletContent from './walletContent';
import SettingsContent from './settingsContent';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
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
      <Route path="/personal/forum">
        <Dashboard renderDrawer={true} location="forum" />
        <ForumContent classes={classes} fixedHeightPaper={fixedHeightPaper} />
      </Route>
      <Route path="/personal/guide">
        <Dashboard renderDrawer={true} location="guide" />
        <GuideContent classes={classes} fixedHeightPaper={fixedHeightPaper} />
      </Route>
      <Route path="/personal/trade">
        <Dashboard renderDrawer={true} location="trade" />
        <TradeContent classes={classes} fixedHeightPaper={fixedHeightPaper} />
      </Route>
      <Route path="/personal/wallet">
        <Dashboard renderDrawer={true} location="wallet" />
        <WalletContent classes={classes} fixedHeightPaper={fixedHeightPaper} />
      </Route>
      <Route path="/personal/settings">
        <Dashboard renderDrawer={true} location="settings" />
        <SettingsContent classes={classes} fixedHeightPaper={fixedHeightPaper} />
      </Route>
      <Route path="/personal">
        <Redirect to="/personal/trade" />
      </Route>
    </div>
  );
}
