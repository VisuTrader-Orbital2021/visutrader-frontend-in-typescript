import React from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Copyright from "./Copyright";
import "../styles/Forum.css";

function Post(props) {
  return (
    <div className="post">
      <div className="info">
        {"Posted by " + props.username + " " + props.time + " ago"}
      </div>
      <h3 className="title">{props.title}</h3>
      <p className="comment">{props.children}</p>
    </div>
  );
}

export default function Forum({ classes }) {
  return (
    <main className={classes.content}>
      <div className={classes.appBarSpacer} />
      <Container maxWidth="lg" className={classes.container}>
        <Grid container spacing={3}>
          <Grid item xs={8}>
            <div className="search-bar">Search</div>
          </Grid>
          <Grid item xs={4}>
            <div className="create-post-bar">Create Post</div>
          </Grid>
          <Grid item xs={12}>
            <Post username="bobsmith" time="6 hours" title="Lorem Ipsum">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cu pidatat non proident,
              sunt in culpa qui officia deserunt mol lit anim id est laborum.
            </Post>
          </Grid>
          <Grid item xs={12}>
            <Post username="markrober" time="7 hours" title="Lorem Ipsum">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cu pidatat non proident,
              sunt in culpa qui officia deserunt mol lit anim id est laborum.
            </Post>
          </Grid>
          <Grid item xs={12}>
            <Post username="jamesclear" time="7 hours" title="Lorem Ipsum">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cu pidatat non proident,
              sunt in culpa qui officia deserunt mol lit anim id est laborum.
            </Post>
          </Grid>
        </Grid>
        <Box pt={4}>
          <Copyright />
        </Box>
      </Container>
    </main>
  );
}
