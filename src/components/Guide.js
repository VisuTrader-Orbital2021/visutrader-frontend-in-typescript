import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { userSelector } from "../redux/slices/user";
import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from '@material-ui/core/styles';
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Copyright from "./Copyright";

// TODO: Write guide content
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
  topic: {
    display: "flex",
    marginTop: "50px",
  },
  subtopic: {
    display: "flex",
    marginTop: "40px",
  },
  paragraph: {
    display: "flex",
    marginTop: "20px",
  },
  padding: {
    display: "flex",
  },
  tableOfContents: {
    position: "fixed",
  },
  list: {
    listStyle: "none",
  },
  navigationText: {
    textDecoration: "none",
    color: "black",
    "&:hover": {
      color: theme.palette.secondary.main,
    },
  },
}));

export default function Guide() {
  const theme = useTheme();
  const classes = useStyles(theme);
  const user = useSelector(userSelector);

  if (!user.authenticated) {
    return (
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={10}>
            <Grid item xs={9}>
              <div>
                <header>
                  <Typography className={classes.root} variant="h1">
                    WELCOME
                  </Typography>

                  <Typography className={classes.paragraph} variant="body1">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cu pidatat non proident, sunt in culpa qui officia
                    deserunt mol lit anim id est laborum.
                  </Typography>
                </header>

                <article>
                  <section>
                    {/* Empty padding */}
                    <Typography id="topic-1" className={classes.padding}>‎</Typography>

                    <Typography
                      className={classes.topic}
                      variant="h2"
                    >
                      TOPIC 1
                    </Typography>

                    <Typography className={classes.paragraph} variant="body1">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat.
                      Duis aute irure dolor in reprehenderit in voluptate velit
                      esse cillum dolore eu fugiat nulla pariatur. Excepteur
                      sint occaecat cu pidatat non proident, sunt in culpa qui
                      officia deserunt mol lit anim id est laborum.
                    </Typography>

                    <section>
                      {/* Empty padding */}
                      <Typography id="subtopic-1.1" className={classes.padding}>‎</Typography>

                      <Typography
                        className={classes.subtopic}
                        variant="h3"
                      >
                        SUBTOPIC 1.1
                      </Typography>

                      <Typography className={classes.paragraph} variant="body1">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat. Duis aute irure dolor in
                        reprehenderit in voluptate velit esse cillum dolore eu
                        fugiat nulla pariatur. Excepteur sint occaecat cu
                        pidatat non proident, sunt in culpa qui officia deserunt
                        mol lit anim id est laborum.
                      </Typography>

                      <Typography className={classes.paragraph} variant="body1">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat. Duis aute irure dolor in
                        reprehenderit in voluptate velit esse cillum dolore eu
                        fugiat nulla pariatur. Excepteur sint occaecat cu
                        pidatat non proident, sunt in culpa qui officia deserunt
                        mol lit anim id est laborum.
                      </Typography>

                      <Typography className={classes.paragraph} variant="body1">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat. Duis aute irure dolor in
                        reprehenderit in voluptate velit esse cillum dolore eu
                        fugiat nulla pariatur. Excepteur sint occaecat cu
                        pidatat non proident, sunt in culpa qui officia deserunt
                        mol lit anim id est laborum.
                      </Typography>

                      <Typography
                        id="subtopic-1.2"
                        className={classes.subtopic}
                        variant="h3"
                      >
                        SUBTOPIC 1.2
                      </Typography>

                      <Typography className={classes.paragraph} variant="body1">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat. Duis aute irure dolor in
                        reprehenderit in voluptate velit esse cillum dolore eu
                        fugiat nulla pariatur. Excepteur sint occaecat cu
                        pidatat non proident, sunt in culpa qui officia deserunt
                        mol lit anim id est laborum.
                      </Typography>

                      <Typography className={classes.paragraph} variant="body1">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat. Duis aute irure dolor in
                        reprehenderit in voluptate velit esse cillum dolore eu
                        fugiat nulla pariatur. Excepteur sint occaecat cu
                        pidatat non proident, sunt in culpa qui officia deserunt
                        mol lit anim id est laborum.
                      </Typography>

                      <Typography className={classes.paragraph} variant="body1">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat. Duis aute irure dolor in
                        reprehenderit in voluptate velit esse cillum dolore eu
                        fugiat nulla pariatur. Excepteur sint occaecat cu
                        pidatat non proident, sunt in culpa qui officia deserunt
                        mol lit anim id est laborum.
                      </Typography>
                    </section>
                  </section>

                  <section>
                    {/* Empty padding */}
                    <Typography id="topic-2">‎</Typography>

                    <Typography
                      className={classes.topic}
                      variant="h2"
                    >
                      TOPIC 2
                    </Typography>

                    <Typography className={classes.paragraph} variant="body1">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat.
                      Duis aute irure dolor in reprehenderit in voluptate velit
                      esse cillum dolore eu fugiat nulla pariatur. Excepteur
                      sint occaecat cu pidatat non proident, sunt in culpa qui
                      officia deserunt mol lit anim id est laborum.
                    </Typography>

                    <section>
                      <Typography
                        id="subtopic-2.1"
                        className={classes.subtopic}
                        variant="h3"
                      >
                        SUBTOPIC 2.1
                      </Typography>

                      <Typography className={classes.paragraph} variant="body1">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat. Duis aute irure dolor in
                        reprehenderit in voluptate velit esse cillum dolore eu
                        fugiat nulla pariatur. Excepteur sint occaecat cu
                        pidatat non proident, sunt in culpa qui officia deserunt
                        mol lit anim id est laborum.
                      </Typography>

                      <Typography className={classes.paragraph} variant="body1">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat. Duis aute irure dolor in
                        reprehenderit in voluptate velit esse cillum dolore eu
                        fugiat nulla pariatur. Excepteur sint occaecat cu
                        pidatat non proident, sunt in culpa qui officia deserunt
                        mol lit anim id est laborum.
                      </Typography>

                      <Typography className={classes.paragraph} variant="body1">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat. Duis aute irure dolor in
                        reprehenderit in voluptate velit esse cillum dolore eu
                        fugiat nulla pariatur. Excepteur sint occaecat cu
                        pidatat non proident, sunt in culpa qui officia deserunt
                        mol lit anim id est laborum.
                      </Typography>

                      <Typography
                        id="subtopic-2.2"
                        className={classes.subtopic}
                        variant="h3"
                      >
                        SUBTOPIC 2.2
                      </Typography>

                      <Typography className={classes.paragraph} variant="body1">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat. Duis aute irure dolor in
                        reprehenderit in voluptate velit esse cillum dolore eu
                        fugiat nulla pariatur. Excepteur sint occaecat cu
                        pidatat non proident, sunt in culpa qui officia deserunt
                        mol lit anim id est laborum.
                      </Typography>

                      <Typography className={classes.paragraph} variant="body1">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat. Duis aute irure dolor in
                        reprehenderit in voluptate velit esse cillum dolore eu
                        fugiat nulla pariatur. Excepteur sint occaecat cu
                        pidatat non proident, sunt in culpa qui officia deserunt
                        mol lit anim id est laborum.
                      </Typography>

                      <Typography className={classes.paragraph} variant="body1">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat. Duis aute irure dolor in
                        reprehenderit in voluptate velit esse cillum dolore eu
                        fugiat nulla pariatur. Excepteur sint occaecat cu
                        pidatat non proident, sunt in culpa qui officia deserunt
                        mol lit anim id est laborum.
                      </Typography>
                    </section>
                  </section>

                  <section>
                    <Typography
                      id="topic-3"
                      className={classes.topic}
                      variant="h2"
                    >
                      TOPIC 3
                    </Typography>

                    <Typography className={classes.paragraph} variant="body1">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat.
                      Duis aute irure dolor in reprehenderit in voluptate velit
                      esse cillum dolore eu fugiat nulla pariatur. Excepteur
                      sint occaecat cu pidatat non proident, sunt in culpa qui
                      officia deserunt mol lit anim id est laborum.
                    </Typography>

                    <section>
                      <Typography
                        id="subtopic-3.1"
                        className={classes.subtopic}
                        variant="h3"
                      >
                        SUBTOPIC 3.1
                      </Typography>

                      <Typography className={classes.paragraph} variant="body1">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat. Duis aute irure dolor in
                        reprehenderit in voluptate velit esse cillum dolore eu
                        fugiat nulla pariatur. Excepteur sint occaecat cu
                        pidatat non proident, sunt in culpa qui officia deserunt
                        mol lit anim id est laborum.
                      </Typography>

                      <Typography className={classes.paragraph} variant="body1">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat. Duis aute irure dolor in
                        reprehenderit in voluptate velit esse cillum dolore eu
                        fugiat nulla pariatur. Excepteur sint occaecat cu
                        pidatat non proident, sunt in culpa qui officia deserunt
                        mol lit anim id est laborum.
                      </Typography>

                      <Typography className={classes.paragraph} variant="body1">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat. Duis aute irure dolor in
                        reprehenderit in voluptate velit esse cillum dolore eu
                        fugiat nulla pariatur. Excepteur sint occaecat cu
                        pidatat non proident, sunt in culpa qui officia deserunt
                        mol lit anim id est laborum.
                      </Typography>

                      <Typography
                        id="subtopic-3.2"
                        className={classes.subtopic}
                        variant="h3"
                      >
                        SUBTOPIC 3.2
                      </Typography>

                      <Typography className={classes.paragraph} variant="body1">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat. Duis aute irure dolor in
                        reprehenderit in voluptate velit esse cillum dolore eu
                        fugiat nulla pariatur. Excepteur sint occaecat cu
                        pidatat non proident, sunt in culpa qui officia deserunt
                        mol lit anim id est laborum.
                      </Typography>

                      <Typography className={classes.paragraph} variant="body1">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat. Duis aute irure dolor in
                        reprehenderit in voluptate velit esse cillum dolore eu
                        fugiat nulla pariatur. Excepteur sint occaecat cu
                        pidatat non proident, sunt in culpa qui officia deserunt
                        mol lit anim id est laborum.
                      </Typography>

                      <Typography className={classes.paragraph} variant="body1">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat. Duis aute irure dolor in
                        reprehenderit in voluptate velit esse cillum dolore eu
                        fugiat nulla pariatur. Excepteur sint occaecat cu
                        pidatat non proident, sunt in culpa qui officia deserunt
                        mol lit anim id est laborum.
                      </Typography>
                    </section>
                  </section>
                </article>
              </div>
            </Grid>
            <Grid item xs={3}>
              <div className={classes.tableOfContents}>
                <aside>
                  <h2>TABLE OF CONTENTS</h2>
                  <nav>
                    <ul className={classes.list}>
                      <li>
                        <h3>
                          <a className={classes.navigationText} href="#topic-1">
                            TOPIC 1
                          </a>
                        </h3>
                        <ul className={classes.list}>
                          <li>
                            <a
                              className={classes.navigationText}
                              href="#subtopic-1.1"
                            >
                              SUBTOPIC 1.1
                            </a>
                          </li>
                          <li>
                            <a
                              className={classes.navigationText}
                              href="#subtopic-1.2"
                            >
                              SUBTOPIC 1.2
                            </a>
                          </li>
                        </ul>
                      </li>
                      <li>
                        <h3>
                          <a className={classes.navigationText} href="#topic-2">
                            TOPIC 2
                          </a>
                        </h3>
                        <ul className={classes.list}>
                          <li>
                            <a
                              className={classes.navigationText}
                              href="#subtopic-2.1"
                            >
                              SUBTOPIC 2.1
                            </a>
                          </li>
                          <li>
                            <a
                              className={classes.navigationText}
                              href="#subtopic-2.2"
                            >
                              SUBTOPIC 2.2
                            </a>
                          </li>
                        </ul>
                      </li>
                      <li>
                        <h3>
                          <a className={classes.navigationText} href="#topic-3">
                            TOPIC 3
                          </a>
                        </h3>
                        <ul className={classes.list}>
                          <li>
                            <a
                              className={classes.navigationText}
                              href="#subtopic-3.1"
                            >
                              SUBTOPIC 3.1
                            </a>
                          </li>
                          <li>
                            <a
                              className={classes.navigationText}
                              href="#subtopic-3.2"
                            >
                              SUBTOPIC 3.2
                            </a>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </nav>
                </aside>
              </div>
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
