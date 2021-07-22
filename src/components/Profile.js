import React from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { useSelector } from "react-redux";
import { userSelector } from "../redux/slices/user";
import SparkMD5 from "spark-md5";
import Copyright from "./Copyright";

export default function Profile({ classes }) {
  const user = useSelector(userSelector);

  return (
    <main className={classes.content}>
      <div className={classes.appBarSpacer} />
      <Container maxWidth="lg" className={classes.container}>
        <Grid container item spacing={3} alignItems="stretch">
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h2" className={classes.cardHeader}>
                  PROFILE
                </Typography>
                <div className={classes.profileContent}>
                  <img
                    alt="gravatar"
                    src={
                      "https://www.gravatar.com/avatar/" +
                      SparkMD5.hash(user.email) +
                      "?s=160"
                    }
                    className={classes.profilePicture}
                  />
                  <div className={classes.profileInfo}>
                    <div className={classes.profileInfoLeft}>
                      <Typography variant="h3">Name:</Typography>
                      <Typography variant="h3">Display name:</Typography>
                      <Typography variant="h3">Email:</Typography>
                      <Typography variant="h3">Date joined:</Typography>
                    </div>
                    <div className={classes.profileInfoRight}>
                      <Typography variant="h4">{user.username}</Typography>
                      <Typography variant="h4">{user.displayName}</Typography>
                      <Typography variant="h4">{user.email}</Typography>
                      <Typography variant="h4">
                        {user.dateJoined.substring(0, 10)}
                      </Typography>
                    </div>
                  </div>
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
