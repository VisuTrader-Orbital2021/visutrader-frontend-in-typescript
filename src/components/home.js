import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Dashboard from './dashboard';

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
    <main className={classes.content}>
      <div className={classes.appBarSpacer} />
      <Container maxWidth="lg" className={classes.container}>
        <RouterLink to="/personal/trade">
          <span>
            Go to personal page
          </span>
        </RouterLink>
      </Container>
    </main>
  );
}