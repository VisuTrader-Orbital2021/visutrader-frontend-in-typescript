import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { useSnackbar } from "notistack";
import Slide from "@material-ui/core/Slide";
import CircularProgress from "@material-ui/core/CircularProgress";
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

  const { enqueueSnackbar } = useSnackbar();
  const [progress, setProgress] = useState(false);

  const handleSubmit = async (values) => {
    setProgress(true);
    const response = await dispatch(signUpUser(values));

    if (response.type === signUpUser.fulfilled.toString()) {
      enqueueSnackbar("Sign up successful. Please confirm your email.", {
        variant: "success",
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
        TransitionComponent: Slide,
      });
      history.push("/login");
    } else {
      setProgress(false);
      enqueueSnackbar("Sign up failed.", {
        variant: "error",
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
        TransitionComponent: Slide,
      });
      console.log(response);
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
              confirm_password: "",
            }}
            validationSchema={yup.object({
              username: yup.string().required("Required"),
              display_name: yup.string().required("Required"),
              email: yup.string().email("Invalid email").required("Required"),
              password: yup
                .string()
                .required("Required")
                .min(8, "Password must contains at least 8 characters")
                .max(20, "Password must contains less than 20 characters"),
              confirm_password: yup.string().when("password", {
                is: (val) => val && val.length > 0,
                then: yup
                  .string()
                  .oneOf(
                    [yup.ref("password")],
                    "Password confirmation does not match"
                  )
                  .required("Required"),
              }),
            })}
            onSubmit={handleSubmit}
          >
            <Form className={classes.form}>
              <Field
                component={TextField}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
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
                name="confirm_password"
                label="Confirm Password"
                type="password"
                id="confirm_password"
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
              <div style={{ display: "flex", justifyContent: "space-around" }}>
                {progress && <CircularProgress color="secondary" />}
              </div>
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
