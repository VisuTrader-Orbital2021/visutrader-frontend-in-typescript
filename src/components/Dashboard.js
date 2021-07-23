import React from "react";
import { Link as RouterLink } from "react-router-dom";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { userSelector } from "../redux/slices/user";
import { resetUser } from "../redux/slices/user";
import SparkMD5 from "spark-md5";
import LeftDrawer from "./LeftDrawer";

const DRAWER_WIDTH = 58;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: DRAWER_WIDTH,
    width: `calc(100% - ${DRAWER_WIDTH}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
  routerLink: {
    textDecoration: "none",
    color: "#ffffff",
  },
  profileIcon: {
    borderRadius: "50%",
  },
}));

export default function Dashboard(props) {
  const classes = useStyles();
  const user = useSelector(userSelector);
  const [open, setOpen] = React.useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <UpperBar classes={classes} open={open} />
      <LeftDrawer
        renderDrawer={props.renderDrawer}
        location={props.location}
        handleDrawerClose={handleDrawerClose}
      />
    </div>
  );
}

function UpperBar({ classes, open }) {
  const dispatch = useDispatch();
  const user = useSelector(userSelector);
  const history = useHistory();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleProfile = () => {
    handleClose();
    history.push("/profile");
  };

  const handleLogOut = () => {
    handleClose();
    dispatch(resetUser());

    // TODO: fix for better UI & UX
    alert("Logged out successfully");
    history.push("/");
  };

  const profileOpen = Boolean(anchorEl);

  const renderElement = () => {
    if (user.authenticated) {
      return (
        <div>
          <Typography variant="body1" display="inline">
            {user.displayName}
          </Typography>
          <IconButton
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <img
              alt="gravatar"
              src={
                "https://www.gravatar.com/avatar/" +
                SparkMD5.hash(user.email) +
                "?s=32"
              }
              className={classes.profileIcon}
            />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={profileOpen}
            onClose={handleClose}
          >
            <MenuItem onClick={handleProfile}>Profile</MenuItem>
            <MenuItem onClick={handleLogOut}>Log out</MenuItem>
          </Menu>
        </div>
      );
    } else {
      return (
        <div>
          <RouterLink to="/login" className={classes.routerLink}>
            <Button color="inherit">LOG IN</Button>
          </RouterLink>
          <RouterLink to="/signup" className={classes.routerLink}>
            <Button variant="contained" color="secondary">
              SIGN UP
            </Button>
          </RouterLink>
        </div>
      );
    }
  };

  return (
    <AppBar
      position="absolute"
      className={clsx(classes.appBar, open && classes.appBarShift)}
    >
      <Toolbar className={classes.toolbar}>
        <Typography
          component="h1"
          variant="h2"
          color="inherit"
          noWrap
          className={classes.title}
        >
          <RouterLink to="/" className={classes.routerLink}>
            VISUTRADER
          </RouterLink>
        </Typography>
        {renderElement()}
      </Toolbar>
    </AppBar>
  );
}
