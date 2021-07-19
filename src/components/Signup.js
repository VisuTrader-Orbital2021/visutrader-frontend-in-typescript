import React from "react";
import { Link as RouterLink } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Formik, Form, Field } from "formik";
import { TextField } from "formik-material-ui";
import * as yup from "yup";
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

  const handleSubmit = async (values) => {
    const response = await dispatch(signUpUser(values));

    if (response.type === signUpUser.fulfilled.toString()) {
      // Redirect when success here
      alert("Signed up successfully");
      history.push("/login");
    } else {
      // TODO: fix this with better UI.
      alert(JSON.stringify(response.payload));
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
          <Formik
            initialValues={{
              username: "",
              display_name: "",
              email: "",
              password: "",
              confirmPassword: "",
            }}
            className={classes.form}
            validationSchema={yup.object({
              username: yup.string().required("Required"),
              display_name: yup.string().required("Required"),
              email: yup.string().email("Invalid email").required("Required"),
              password: yup
                .string()
                .required("Required")
                .min(8, "Password must have length of at least 8"),
              confirmPassword: yup.string().when("password", {
                is: (val) => val && val.length > 0,
                then: yup
                  .string()
                  .oneOf(
                    [yup.ref("password")],
                    "Confirm password need to be the same as password field"
                  )
                  .required("Required"),
              }),
            })}
            onSubmit={handleSubmit}
          >
            <Form>
              <Field
                component={TextField}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoFocus
              />
              <Field
                component={TextField}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="display_name"
                label="Display name"
                name="display_name"
              />
              <Field
                component={TextField}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
              />
              <Field
                component={TextField}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
              />
              <Field
                component={TextField}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                id="confirmPassword"
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
            </Form>
          </Formik>
        </div>
      </Grid>
    </Grid>
  );
}
