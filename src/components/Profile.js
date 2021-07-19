import React from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Copyright from "./Copyright";

export default function Profile({ classes, fixedHeightPaper }) {
  return (
    <main className={classes.content}>
      <div className={classes.appBarSpacer} />
      <Container maxWidth="lg" className={classes.container}>
        <Grid container item spacing={3} alignItems="stretch">
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h2" className={classes.profileHeader} >
                  PROFILE
                </Typography>
                <div className={classes.profileContent}>
                  <img
                    alt="gravatar"
                    src="https://www.gravatar.com/avatar/ca7a60a96f3931d9bfb0ddc9c05310ec?s=280"
                    className={classes.profilePicture}
                  />
                  <div></div>
                </div>
                <div className={classes.profileFooter}>
                  <Typography variant="body1">
                    You can change your profile picture with{" "}
                    <a
                      className={classes.linkText}
                      href="https://en.gravatar.com/"
                    >
                      Gravatar
                    </a>
                    . Please ensure that you are using the same email address.
                  </Typography>
                </div>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <Box pt={4}>
          <Copyright />
        </Box>
      </Container>
    </main>
  );
}
