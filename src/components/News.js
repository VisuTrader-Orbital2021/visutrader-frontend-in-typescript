import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { userSelector } from "../redux/slices/user";
import { getNewsHeadline } from "../redux/slices/news";
import { unwrapResult } from "@reduxjs/toolkit";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import Chip from "@material-ui/core/Chip";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Copyright from "./Copyright";

export default function News({ classes }) {
  const user = useSelector(userSelector);
  const dispatch = useDispatch();
  const { news: newsData, loading } = useSelector((state) => state.news);

  useEffect(() => {
    dispatch(getNewsHeadline())
      .then(unwrapResult)
      .catch((err) => {
        alert(JSON.stringify(err));
      });
  }, [dispatch]);

  if (user.authenticated) {
    return (
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography variant="h2">NEWS HEADLINE</Typography>
              </Grid>

              <Grid item xs={4}>
                <NewsCard
                  classes={classes}
                  content={newsData[0]}
                  loading={loading}
                />
              </Grid>

              {/* <Grid item xs={4}>
                <NewsCard classes={classes} />
              </Grid>

              <Grid item xs={4}>
                <NewsCard classes={classes} />
              </Grid> */}
            </Grid>

            {/* <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography variant="h2">
                  NEWS HEADLINE
                </Typography>
              </Grid>

              <Grid item xs={4}>
                <NewsCard classes={classes} />
              </Grid>

              <Grid item xs={4}>
                <NewsCard classes={classes} />
              </Grid>

              <Grid item xs={4}>
                <NewsCard classes={classes} />
              </Grid>
            </Grid> */}
          </Grid>

          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      </main>
    );
  } else {
    return (
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Box pt={4}>
            <Typography variant="h3" align="center">
              Sign up to unlock this feature
            </Typography>
          </Box>
          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      </main>
    );
  }
}

function NewsCard({ classes, content, loading }) {
  if (!loading && content) {
    return (
      <React.Fragment>
        <Card>
          <a
            href={content.url}
            style={{ color: "black", textDecoration: "none" }}
          >
            <CardActionArea>
              <CardMedia
                className={classes.newsCardMedia}
                image={content.urlToImage}
              />
              <CardContent>
                <Chip label={content.source.name} style={{ borderRadius: 0 }} />
                <Typography gutterBottom variant="h5" component="h2">
                  {content.title}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {content.description}
                </Typography>
              </CardContent>
            </CardActionArea>
          </a>
        </Card>
      </React.Fragment>
    );
  } else {
    return <div>FAILED</div>;
  }
}
