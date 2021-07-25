import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { userSelector } from "../redux/slices/user";
import { getNewsHeadline, getNewsSearch } from "../redux/slices/news";
import { unwrapResult } from "@reduxjs/toolkit";
import { useSnackbar } from "notistack";
import Slide from "@material-ui/core/Slide";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import Chip from "@material-ui/core/Chip";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Skeleton from "@material-ui/lab/Skeleton";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Toolbar from "@material-ui/core/Toolbar";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import Typography from "@material-ui/core/Typography";
import Copyright from "./Copyright";

export default function News({ classes }) {
  const user = useSelector(userSelector);
  const dispatch = useDispatch();
  const {
    newsHeadline: newsData,
    newsHeadlineLoading: newsLoading,
    newsSearch: searchData,
    newsSearchLoading: searchLoading,
  } = useSelector((state) => state.news);

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    dispatch(getNewsHeadline())
      .then(unwrapResult)
      .catch((err) =>
        enqueueSnackbar("Failed to fetch news.", {
          variant: "error",
          anchorOrigin: {
            vertical: "top",
            horizontal: "center",
          },
          TransitionComponent: Slide,
        })
      );
  }, [dispatch, enqueueSnackbar]);

  const [query, setQuery] = useState("trading");
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      setQuery(event.target.value);
    }
  };

  useEffect(() => {
    dispatch(getNewsSearch(query))
      .then(unwrapResult)
      .catch((err) =>
        enqueueSnackbar("Failed to search news.", {
          variant: "error",
          anchorOrigin: {
            vertical: "top",
            horizontal: "center",
          },
          TransitionComponent: Slide,
        })
      );
  }, [dispatch, query, enqueueSnackbar]);

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
                      <Typography variant="h2" color="primary">
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
                        variant="h2"
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
                          onKeyDown={handleKeyDown}
                        />
                      </div>
                    </Toolbar>
                    <NewsList
                      classes={classes}
                      content={searchData[0]}
                      loading={searchLoading}
                    />
                    <Divider />
                    <NewsList
                      classes={classes}
                      content={searchData[1]}
                      loading={searchLoading}
                    />
                    <Divider />
                    <NewsList
                      classes={classes}
                      content={searchData[2]}
                      loading={searchLoading}
                    />
                    <Divider />
                    <NewsList
                      classes={classes}
                      content={searchData[3]}
                      loading={searchLoading}
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
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  if (!loading && content) {
    return (
      <React.Fragment>
        <Card>
          <CardActionArea onClick={handleClick}>
            <CardMedia
              className={classes.newsCardMedia}
              image={content.image.url}
            />
            <CardContent>
              <div style={{ height: "48px" }}>
                <Chip
                  className={classes.newsChip}
                  label={content.provider.name}
                />
                <Chip
                  className={classes.newsChip}
                  label={content.datePublished.substring(0, 10)}
                />
              </div>
              <div>
                <Typography gutterBottom variant="h5" component="h2">
                  {content.title}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {content.description}
                </Typography>
              </div>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <a
              href={content.url}
              style={{ color: "black", textDecoration: "none" }}
            >
              <Button
                size="small"
                color="secondary"
                style={{
                  marginLeft: "5px",
                  marginButtom: "5px",
                  borderRadius: 0,
                }}
              >
                VISIT SOURCE
              </Button>
            </a>
          </CardActions>
        </Card>
        <Dialog onClose={handleClose} open={open}>
          <DialogTitle>{content.title}</DialogTitle>
          <DialogContent>
            <DialogContentText>{content.body}</DialogContentText>
          </DialogContent>
        </Dialog>
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <Card>
          <Skeleton variant="rect" height="260px" />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              padding: "20px",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              <Skeleton
                variant="rect"
                height="30px"
                width="100px"
                style={{ marginRight: "20px" }}
              />
              <Skeleton variant="rect" height="30px" width="100px" />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                paddingTop: "20px",
              }}
            >
              <Skeleton variant="text" height="40px" />
              <Skeleton variant="text" height="20px" />
              <Skeleton variant="text" height="20px" />
              <Skeleton variant="text" height="20px" width="50%" />
            </div>
            <div style={{ paddingTop: "10px" }}>
              <Skeleton variant="rect" height="30px" width="100px" />
            </div>
          </div>
        </Card>
      </React.Fragment>
    );
  }
}

function NewsList({ classes, content, loading }) {
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  if (!loading && content) {
    return (
      <React.Fragment>
        <List>
          <ListItem button onClick={handleClick}>
            <ListItemAvatar>
              <Avatar
                className={classes.newsListAvatar}
                alt={content.title}
                src={content.image.url}
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
              secondary={
                <React.Fragment>
                  <Chip
                    className={classes.newsChip}
                    label={content.provider.name}
                  />
                  <Chip
                    className={classes.newsChip}
                    label={content.datePublished.substring(0, 10)}
                  />
                  <a
                    href={content.url}
                    style={{ color: "black", textDecoration: "none" }}
                  >
                    <Button
                      size="small"
                      color="secondary"
                      style={{ borderRadius: 0 }}
                    >
                      VISIT SOURCE
                    </Button>
                  </a>
                </React.Fragment>
              }
            />
          </ListItem>
        </List>
        <Dialog onClose={handleClose} open={open}>
          <DialogTitle>{content.title}</DialogTitle>
          <DialogContent>
            <DialogContentText>{content.body}</DialogContentText>
          </DialogContent>
        </Dialog>
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            padding: "10px",
          }}
        >
          <div style={{ marginRight: "30px" }}>
            <Skeleton variant="rect" height="120px" width="120px" />
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                paddingTop: "10px",
              }}
            >
              <Skeleton variant="text" height="30px" />
              <Skeleton variant="text" height="20px" />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                paddingTop: "20px",
              }}
            >
              <Skeleton
                variant="rect"
                height="30px"
                width="100px"
                style={{ marginRight: "20px" }}
              />
              <Skeleton
                variant="rect"
                height="30px"
                width="100px"
                style={{ marginRight: "20px" }}
              />
              <Skeleton variant="rect" height="30px" width="100px" />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
