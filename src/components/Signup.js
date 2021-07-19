import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
import { signUpUser } from "../redux/slices/user";
import { useHistory } from "react-router-dom";
import Copyright from "./Copyright";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage: "url(https://source.unsplash.com/random)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  warningText: {
    color: "red",
  },
  routerLink: {
    textDecoration: "none",
    color: theme.palette.primary.main,
    "&:hover": {
      textDecoration: "underline",
    },
  },
}));

export default function Signup() {
  const theme = useTheme();
  const classes = useStyles(theme);

  const dispatch = useDispatch();
  const history = useHistory();

  const [fields, setFields] = useState({});
  const [passwordWarning, setPasswordWarning] = useState(false);
  const [confirmPasswordWarning, setConfirmPasswordWarning] = useState(false);

  const handleInputChange = (e) => {
    const target = e.target;

    const name = target.name;
    const value = target.value;

    setFields({
      ...fields,
      [name]: value,
    });

    if (name === "password") {
      if (value.length > 0 && value.length < 8) {
        setPasswordWarning(true);
      } else {
        setPasswordWarning(false);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (e.target[6].value >= 8) {
      if (e.target[6].value === e.target[8].value) {
        setConfirmPasswordWarning(false);

        const response = await dispatch(signUpUser(fields));

        if (response.type === signUpUser.fulfilled.toString()) {
          // Redirect when success here
          alert("Signed up successfully");
          history.push("/login");
        } else {
          // TODO: fix this with better UI.
          alert(JSON.stringify(response.payload));
        }
      } else {
        setConfirmPasswordWarning(true);
      }
    } else {
      if (e.target[6].value === e.target[8].value) {
        setConfirmPasswordWarning(false);
      } else {
        setConfirmPasswordWarning(true);
      }
    }
  };

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            SIGN UP
          </Typography>
          <form className={classes.form} noValidate onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoFocus
              onChange={handleInputChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="display_name"
              label="Display name"
              name="display_name"
              autoFocus
              onChange={handleInputChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoFocus
              onChange={handleInputChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              onChange={handleInputChange}
            />
            {passwordWarning && (
              <Typography variant="body2" className={classes.warningText}>
                × Must contain at least 8 characters
              </Typography>
            )}
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="confirm_password"
              label="Confirm Password"
              type="password"
              id="confirm_password"
              onChange={handleInputChange}
            />
            {confirmPasswordWarning && (
              <Typography variant="body2" className={classes.warningText}>
                × Password does not match
              </Typography>
            )}
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              SIGN UP
            </Button>
            <Grid container>
              <Grid item xs>
                <RouterLink to="/login" className={classes.routerLink}>
                  Already have an account? Log In!
                </RouterLink>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}
