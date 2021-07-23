import React, { useEffect } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Formik, Form, Field } from "formik";
import { TextField } from "formik-material-ui";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import Copyright from "./Copyright";
import {
  changePasswordUser,
  resetUser,
  userSelector,
} from "../redux/slices/user";
import { unwrapResult } from "@reduxjs/toolkit";

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
}));

export default function ChangePassword() {
  useEffect(() => {
    if (!authenticated) {
      alert("Please log in to view this page");
      history.push("/login");
    }
  });

  const theme = useTheme();
  const classes = useStyles(theme);

  const dispatch = useDispatch();
  const { authenticated } = useSelector(userSelector);

  const history = useHistory();
  const { uid, token } = useParams();

  const handleSubmit = async (formValues) => {
    const values = {
      ...formValues,
      uid,
      token,
    };

    await dispatch(changePasswordUser(values))
      .then(unwrapResult)
      .then((res) => alert(res))
      .then(() => dispatch(resetUser()))
      .then(() => history.push("/login"))
      .catch((err) => alert(JSON.stringify(err)));
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
            CHANGE PASSWORD
          </Typography>
          <Formik
            initialValues={{
              old_password: "",
              new_password1: "",
              new_password2: "",
            }}
            validationSchema={yup.object({
              old_password: yup.string().required("Required"),
              new_password1: yup
                .string()
                .required("Required")
                .min(8, "Password must contains at least 8 characters")
                .max(20, "Password must contains less than 20 characters"),
              new_password2: yup.string().when("new_password1", {
                is: (val) => val && val.length > 0,
                then: yup
                  .string()
                  .oneOf(
                    [yup.ref("new_password1")],
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
                id="old_password"
                label="Password"
                name="old_password"
                type="password"
              />
              <Field
                component={TextField}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="new_password1"
                label="New Password"
                name="new_password1"
                type="password"
              />
              <Field
                component={TextField}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="new_password2"
                label="Confirm Password"
                name="new_password2"
                type="password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                CHANGE PASSWORD
              </Button>
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
