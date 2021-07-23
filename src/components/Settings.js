import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { userSelector } from "../redux/slices/user";
import {
  changePrimaryColor,
  changeSecondaryColor,
  changeThemeMode,
  resetDefault,
} from "../redux/slices/color";
import {
  DEFAULT_PRIMARY_COLOR,
  DEFAULT_SECONDARY_COLOR,
} from "../utils/constants";
import Container from "@material-ui/core/Container";
import Switch from "@material-ui/core/Switch";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { ColorPicker, createColor } from "material-ui-color";
import { Link as RouterLink } from "react-router-dom";
import Copyright from "./Copyright";

const useStyles = makeStyles({
  routerLink: {
    textDecoration: "none",
    color: "#ffffff",
  },
});

export default function Settings({ classes }) {
  const user = useSelector(userSelector);
  const dispatch = useDispatch();
  const routerClass = useStyles();

  const [primaryColor, setPrimaryColor] = useState(createColor("#536DFE"));
  const handlePrimaryColor = (value) => {
    setPrimaryColor(value);
    dispatch(changePrimaryColor(`#${value.hex}`));
  };

  const [secondaryColor, setSecondaryColor] = useState(createColor("#EC407A"));
  const handleSecondaryColor = (value) => {
    setSecondaryColor(value);
    dispatch(changeSecondaryColor(`#${value.hex}`));
  };

  const [checked, setChecked] = React.useState(false);
  const handleChange = () => {
    setChecked(!checked);
    dispatch(changeThemeMode(checked ? "light" : "dark"));
  };

  const handleClick = () => {
    dispatch(resetDefault());
    setPrimaryColor(createColor(DEFAULT_PRIMARY_COLOR));
    setSecondaryColor(createColor(DEFAULT_SECONDARY_COLOR));
    setChecked(false);
  };

  if (user.authenticated) {
    return (
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Typography variant="h2" className={classes.cardHeader}>
                    SETTINGS
                  </Typography>
                  <Typography variant="h3">Color scheme</Typography>
                  <div className={classes.settingsContent}>
                    <div className={classes.settingsContentRow}>
                      <Typography variant="h4">Primary color</Typography>
                      <ColorPicker
                        value={primaryColor}
                        onChange={handlePrimaryColor}
                      />
                    </div>
                    <div className={classes.settingsContentRow}>
                      <Typography variant="h4">Secondary color</Typography>
                      <ColorPicker
                        value={secondaryColor}
                        onChange={handleSecondaryColor}
                      />
                    </div>
                    <div className={classes.settingsContentRow}>
                      <Typography variant="h4">Dark mode</Typography>
                      <Switch
                        checked={checked}
                        onChange={handleChange}
                        name="checked"
                        inputProps={{ "aria-label": "secondary checkbox" }}
                      />
                    </div>
                    <div className={classes.settingsContentRow}>
                      <Typography variant="h4">Reset default</Typography>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleClick}
                        disableElevation
                      >
                        RESET DEFAULT
                      </Button>
                    </div>
                    <div className={classes.settingsContentRow}>
                      <Typography variant="h4">Change password</Typography>
                      <RouterLink
                        to="/change-password"
                        className={routerClass.routerLink}
                      >
                        <Button variant="contained" color="secondary">
                          CHANGE PASSWORD
                        </Button>
                      </RouterLink>
                    </div>
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
