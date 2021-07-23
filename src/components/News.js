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
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import Typography from "@material-ui/core/Typography";
import Copyright from "./Copyright";

export default function News({ classes }) {
  const user = useSelector(userSelector);
  const dispatch = useDispatch();
  const { newsHeadline: newsData, newsHeadlineLoading: newsLoading } =
    useSelector((state) => state.news);

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
            <Grid container item spacing={3} xs={12}>
              <Grid item xs={12}>
                <Typography variant="h2">NEWS HEADLINE</Typography>
              </Grid>

              <Grid item xs={6}>
                <NewsCard
                  classes={classes}
                  content={newsData[0]}
                  loading={newsLoading}
                />
              </Grid>

              <Grid item xs={6}>
                <NewsCard
                  classes={classes}
                  content={newsData[1]}
                  loading={newsLoading}
                />
              </Grid>
            </Grid>

            <Grid container item spacing={3} xs={12} direction="row">
              <Grid item xs={6}>
                <Card>
                  <CardContent>
                    <Toolbar>
                      <Typography variant="h3" color="primary">
                        MORE NEWS
                      </Typography>
                    </Toolbar>
                    <NewsList
                      classes={classes}
                      content={newsData[2]}
                      loading={newsLoading}
                    />
                    <Divider />
                    <NewsList
                      classes={classes}
                      content={newsData[3]}
                      loading={newsLoading}
                    />
                    <Divider />
                    <NewsList
                      classes={classes}
                      content={newsData[4]}
                      loading={newsLoading}
                    />
                    <Divider />
                    <NewsList
                      classes={classes}
                      content={newsData[5]}
                      loading={newsLoading}
                    />
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={6}>
                <Card>
                  <CardContent>
                    <Toolbar>
                      <Typography
                        className={classes.title}
                        variant="h3"
                        color="primary"
                        noWrap
                      >
                        SEARCH NEWS
                      </Typography>
                      <div className={classes.search}>
                        <div className={classes.searchIcon}>
                          <SearchIcon />
                        </div>
                        <InputBase
                          placeholder="Search…"
                          classes={{
                            root: classes.inputRoot,
                            input: classes.inputInput,
                          }}
                          inputProps={{ "aria-label": "search" }}
                        />
                      </div>
                    </Toolbar>
                    <NewsList
                      classes={classes}
                      content={newsData[2]}
                      loading={newsLoading}
                    />
                    <Divider />
                    <NewsList
                      classes={classes}
                      content={newsData[3]}
                      loading={newsLoading}
                    />
                    <Divider />
                    <NewsList
                      classes={classes}
                      content={newsData[4]}
                      loading={newsLoading}
                    />
                    <Divider />
                    <NewsList
                      classes={classes}
                      content={newsData[5]}
                      loading={newsLoading}
                    />
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
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
        <Card className={classes.newsCard}>
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
                <div style={{ height: "48px" }}>
                  <Chip
                    className={classes.newsChip}
                    label={content.source.name}
                  />
                  <Chip
                    className={classes.newsChip}
                    label={content.publishedAt.substring(0, 10)}
                  />
                </div>
                <div>
                  <Typography gutterBottom variant="h5" component="h2">
                    {content.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {content.description}
                  </Typography>
                </div>
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

function NewsList({ classes, content, loading }) {
  if (!loading && content) {
    return (
      <React.Fragment>
        <a
          href={content.url}
          style={{ color: "black", textDecoration: "none" }}
        >
          <List>
            <ListItem button>
              <ListItemAvatar>
                <Avatar
                  className={classes.newsListAvatar}
                  alt={content.title}
                  src={content.urlToImage}
                />
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography
                    gutterBottom
                    variant="h6"
                    style={{ lineHeight: 1.2 }}
                  >
                    {content.title}
                  </Typography>
                }
                secondary={content.publishedAt.substring(0, 10)}
              />
            </ListItem>
          </List>
        </a>
      </React.Fragment>
    );
  } else {
    return <div>FAILED</div>;
  }
}
