import React from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Chart from './chart';
import Deposits from './deposits'
import Copyright from './copyright';

export default function SettingsContent({ classes, fixedHeightPaper }) {
  return (
    <main className={classes.content}>
      <div className={classes.appBarSpacer} />
      <Container maxWidth="lg" className={classes.container}>
        <Grid container spacing={3}>
          {/* TODO: Put settings content here */}
        </Grid>
        <Box pt={4}>
          <Copyright />
        </Box>
      </Container>
    </main>
  );
}