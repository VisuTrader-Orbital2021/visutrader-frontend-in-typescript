import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { mainListItems, secondaryListItems } from './listItems';

const drawerWidth = 58;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
}));

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#758afe',
      main: '#536dfe',
      dark: '#3a4cb1',
      contrastText: '#ffffff',
    },
    secondary: {
      light: '#a52c55',
      main: '#ec407a',
      dark: '#ef6694',
      contrastText: '#ffffff',
    },
  },
});

const routerLinkStyle = {
  textDecoration: "none",
  color: '#ffffff',
};

export default function Dashboard(props) {
  const classes = useStyles();
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
      <UpperBar renderDrawer={props.renderDrawer} classes={classes} open={open} handleDrawerOpen={handleDrawerOpen} />
      <LeftDrawer renderDrawer={props.renderDrawer} classes={classes} open={open} handleDrawerClose={handleDrawerClose} />
    </div>
  );
}

function UpperBar({ renderDrawer, classes, open, handleDrawerOpen }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const profileOpen = Boolean(anchorEl);
  const renderElement = () => {
    if (renderDrawer) {
      return (
        <div>
          {/* TODO: Change <span> to <Typography> */}
          <span>
            DISPLAY NAME
          </span>
          <IconButton
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={profileOpen}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>My account</MenuItem>
          </Menu>
        </div>
      );
    }
    else {
      return (
        <div>
          <RouterLink to="/signup" style={routerLinkStyle}>
            <Button color="inherit">SIGN UP</Button>
          </RouterLink>
          <RouterLink to="/login" style={routerLinkStyle}>
            <Button color="inherit">LOG IN</Button>
          </RouterLink>
        </div>
      );
    }
  }
  
  return (
    <ThemeProvider theme={theme}>
      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            VisuTrader
          </Typography>
          { renderElement() }
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
}

function LeftDrawer({ renderDrawer, classes, handleDrawerClose }) {
  if (renderDrawer) {
    return (
      <Drawer
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List autoWidth={false}>{mainListItems}</List>
        <List autoWidth={false}>{secondaryListItems}</List>
      </Drawer>
    );
  }
  return null;
}