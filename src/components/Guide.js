import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { userSelector } from "../redux/slices/user";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Copyright from "./Copyright";
import "../styles/Guide.css";

// TODO: Write guide content
// TODO: Remove styling with CSS
export default function Guide({ classes, fixedHeightPaper }) {
  const user = useSelector(userSelector);

  if (user.authenticated) {
    return (
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={10}>
            <Grid item xs={9}>
              <div>
                <header>
                  <h1>WELCOME</h1>

                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cu pidatat non proident, sunt in culpa qui officia
                    deserunt mol lit anim id est laborum.
                  </p>
                </header>

                <article>
                  <section>
                    <h1 id="topic-1">TOPIC 1</h1>

                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat.
                      Duis aute irure dolor in reprehenderit in voluptate velit
                      esse cillum dolore eu fugiat nulla pariatur. Excepteur
                      sint occaecat cu pidatat non proident, sunt in culpa qui
                      officia deserunt mol lit anim id est laborum.
                    </p>

                    <section>
                      <h2 id="subtopic-1.1">SUBTOPIC 1.1</h2>

                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat. Duis aute irure dolor in
                        reprehenderit in voluptate velit esse cillum dolore eu
                        fugiat nulla pariatur. Excepteur sint occaecat cu
                        pidatat non proident, sunt in culpa qui officia deserunt
                        mol lit anim id est laborum.
                      </p>

                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat. Duis aute irure dolor in
                        reprehenderit in voluptate velit esse cillum dolore eu
                        fugiat nulla pariatur. Excepteur sint occaecat cu
                        pidatat non proident, sunt in culpa qui officia deserunt
                        mol lit anim id est laborum.
                      </p>

                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat. Duis aute irure dolor in
                        reprehenderit in voluptate velit esse cillum dolore eu
                        fugiat nulla pariatur. Excepteur sint occaecat cu
                        pidatat non proident, sunt in culpa qui officia deserunt
                        mol lit anim id est laborum.
                      </p>

                      <h2 id="subtopic-1.2">SUBTOPIC 1.2</h2>

                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat. Duis aute irure dolor in
                        reprehenderit in voluptate velit esse cillum dolore eu
                        fugiat nulla pariatur. Excepteur sint occaecat cu
                        pidatat non proident, sunt in culpa qui officia deserunt
                        mol lit anim id est laborum.
                      </p>

                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat. Duis aute irure dolor in
                        reprehenderit in voluptate velit esse cillum dolore eu
                        fugiat nulla pariatur. Excepteur sint occaecat cu
                        pidatat non proident, sunt in culpa qui officia deserunt
                        mol lit anim id est laborum.
                      </p>

                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat. Duis aute irure dolor in
                        reprehenderit in voluptate velit esse cillum dolore eu
                        fugiat nulla pariatur. Excepteur sint occaecat cu
                        pidatat non proident, sunt in culpa qui officia deserunt
                        mol lit anim id est laborum.
                      </p>
                    </section>
                  </section>

                  <section>
                    <h1 id="topic-2">TOPIC 2</h1>

                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat.
                      Duis aute irure dolor in reprehenderit in voluptate velit
                      esse cillum dolore eu fugiat nulla pariatur. Excepteur
                      sint occaecat cu pidatat non proident, sunt in culpa qui
                      officia deserunt mol lit anim id est laborum.
                    </p>

                    <section>
                      <h2 id="subtopic-2.1">SUBTOPIC 2.1</h2>

                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat. Duis aute irure dolor in
                        reprehenderit in voluptate velit esse cillum dolore eu
                        fugiat nulla pariatur. Excepteur sint occaecat cu
                        pidatat non proident, sunt in culpa qui officia deserunt
                        mol lit anim id est laborum.
                      </p>

                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat. Duis aute irure dolor in
                        reprehenderit in voluptate velit esse cillum dolore eu
                        fugiat nulla pariatur. Excepteur sint occaecat cu
                        pidatat non proident, sunt in culpa qui officia deserunt
                        mol lit anim id est laborum.
                      </p>

                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat. Duis aute irure dolor in
                        reprehenderit in voluptate velit esse cillum dolore eu
                        fugiat nulla pariatur. Excepteur sint occaecat cu
                        pidatat non proident, sunt in culpa qui officia deserunt
                        mol lit anim id est laborum.
                      </p>

                      <h2 id="subtopic-2.2">SUBTOPIC 2.2</h2>

                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat. Duis aute irure dolor in
                        reprehenderit in voluptate velit esse cillum dolore eu
                        fugiat nulla pariatur. Excepteur sint occaecat cu
                        pidatat non proident, sunt in culpa qui officia deserunt
                        mol lit anim id est laborum.
                      </p>

                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat. Duis aute irure dolor in
                        reprehenderit in voluptate velit esse cillum dolore eu
                        fugiat nulla pariatur. Excepteur sint occaecat cu
                        pidatat non proident, sunt in culpa qui officia deserunt
                        mol lit anim id est laborum.
                      </p>

                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat. Duis aute irure dolor in
                        reprehenderit in voluptate velit esse cillum dolore eu
                        fugiat nulla pariatur. Excepteur sint occaecat cu
                        pidatat non proident, sunt in culpa qui officia deserunt
                        mol lit anim id est laborum.
                      </p>
                    </section>
                  </section>

                  <section>
                    <h1 id="topic-3">TOPIC 3</h1>

                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat.
                      Duis aute irure dolor in reprehenderit in voluptate velit
                      esse cillum dolore eu fugiat nulla pariatur. Excepteur
                      sint occaecat cu pidatat non proident, sunt in culpa qui
                      officia deserunt mol lit anim id est laborum.
                    </p>

                    <section>
                      <h2 id="subtopic-3.1">SUBTOPIC 3.1</h2>

                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat. Duis aute irure dolor in
                        reprehenderit in voluptate velit esse cillum dolore eu
                        fugiat nulla pariatur. Excepteur sint occaecat cu
                        pidatat non proident, sunt in culpa qui officia deserunt
                        mol lit anim id est laborum.
                      </p>

                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat. Duis aute irure dolor in
                        reprehenderit in voluptate velit esse cillum dolore eu
                        fugiat nulla pariatur. Excepteur sint occaecat cu
                        pidatat non proident, sunt in culpa qui officia deserunt
                        mol lit anim id est laborum.
                      </p>

                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat. Duis aute irure dolor in
                        reprehenderit in voluptate velit esse cillum dolore eu
                        fugiat nulla pariatur. Excepteur sint occaecat cu
                        pidatat non proident, sunt in culpa qui officia deserunt
                        mol lit anim id est laborum.
                      </p>

                      <h2 id="subtopic-3.2">SUBTOPIC 3.2</h2>

                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat. Duis aute irure dolor in
                        reprehenderit in voluptate velit esse cillum dolore eu
                        fugiat nulla pariatur. Excepteur sint occaecat cu
                        pidatat non proident, sunt in culpa qui officia deserunt
                        mol lit anim id est laborum.
                      </p>

                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat. Duis aute irure dolor in
                        reprehenderit in voluptate velit esse cillum dolore eu
                        fugiat nulla pariatur. Excepteur sint occaecat cu
                        pidatat non proident, sunt in culpa qui officia deserunt
                        mol lit anim id est laborum.
                      </p>

                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat. Duis aute irure dolor in
                        reprehenderit in voluptate velit esse cillum dolore eu
                        fugiat nulla pariatur. Excepteur sint occaecat cu
                        pidatat non proident, sunt in culpa qui officia deserunt
                        mol lit anim id est laborum.
                      </p>
                    </section>
                  </section>
                </article>
              </div>
            </Grid>
            <Grid item xs={3}>
              <div className="table-of-contents">
                <aside>
                  <h2>TABLE OF CONTENTS</h2>
                  <nav>
                    <ul>
                      <li>
                        <h3>
                          <a href="#topic-1">TOPIC 1</a>
                        </h3>
                        <ul>
                          <li>
                            <a href="#subtopic-1.1">SUBTOPIC 1.1</a>
                          </li>
                          <li>
                            <a href="#subtopic-1.2">SUBTOPIC 1.2</a>
                          </li>
                        </ul>
                      </li>
                      <li>
                        <h3>
                          <a href="#topic-2">TOPIC 2</a>
                        </h3>
                        <ul>
                          <li>
                            <a href="#subtopic-2.1">SUBTOPIC 2.1</a>
                          </li>
                          <li>
                            <a href="#subtopic-2.2">SUBTOPIC 2.2</a>
                          </li>
                        </ul>
                      </li>
                      <li>
                        <h3>
                          <a href="#topic-3">TOPIC 3</a>
                        </h3>
                        <ul>
                          <li>
                            <a href="#subtopic-3.1">SUBTOPIC 3.1</a>
                          </li>
                          <li>
                            <a href="#subtopic-3.2">SUBTOPIC 3.2</a>
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
