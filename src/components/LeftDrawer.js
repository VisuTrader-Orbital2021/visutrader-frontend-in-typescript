import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import Zoom from "@material-ui/core/Zoom";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import BookmarksIcon from "@material-ui/icons/Bookmarks";
import ChatIcon from "@material-ui/icons/Chat";
import EqualizerIcon from "@material-ui/icons/Equalizer";
import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalanceWallet";
import SettingsIcon from "@material-ui/icons/Settings";

const DRAWER_WIDTH = 58;

const useStyles = makeStyles((theme) => ({
  leftDrawer: {
    display: "flex",
    flexDirection: "row",
  },
  drawerIcons: {
    display: "flex",
    flexDirection: "column",
  },
  listIcons: {
    "&:hover": {
      color: theme.palette.secondary.light,
      transition: "color 1s",
    },
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  drawerPaper: {
    position: "relative",
    width: DRAWER_WIDTH,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    "&::-webkit-scrollbar": {
      display: "none",
    },
  },
}));

function routerStyle(location, icon, theme) {
  return {
    color: location === icon ? theme.palette.primary.main : "#757575",
  };
}

function MainListIcons(props) {
  return (
    <div>
      <ListItem>
        <ListItemIcon>
          <RouterLink
            to="/guide"
            style={routerStyle(props.location, "guide", props.theme)}
          >
            <Tooltip
              title={<Typography variant="body2">Guide</Typography>}
              placement="right"
              TransitionComponent={Zoom}
              arrow
            >
              <BookmarksIcon className={props.classes.listIcons} />
            </Tooltip>
          </RouterLink>
        </ListItemIcon>
      </ListItem>
      <ListItem>
        <ListItemIcon>
          <RouterLink
            to="/news"
            style={routerStyle(props.location, "news", props.theme)}
          >
            <Tooltip
              title={<Typography variant="body2">News</Typography>}
              placement="right"
              TransitionComponent={Zoom}
              arrow
            >
              <ChatIcon className={props.classes.listIcons} />
            </Tooltip>
          </RouterLink>
        </ListItemIcon>
      </ListItem>
      <ListItem>
        <ListItemIcon>
          <RouterLink
            to="/trade"
            style={routerStyle(props.location, "trade", props.theme)}
          >
            <Tooltip
              title={<Typography variant="body2">Trade</Typography>}
              placement="right"
              TransitionComponent={Zoom}
              arrow
            >
              <EqualizerIcon className={props.classes.listIcons} />
            </Tooltip>
          </RouterLink>
        </ListItemIcon>
      </ListItem>
      <ListItem>
        <ListItemIcon>
          <RouterLink
            to="/wallet"
            style={routerStyle(props.location, "wallet", props.theme)}
          >
            <Tooltip
              title={<Typography variant="body2">Wallet</Typography>}
              placement="right"
              TransitionComponent={Zoom}
              arrow
            >
              <AccountBalanceWalletIcon className={props.classes.listIcons} />
            </Tooltip>
          </RouterLink>
        </ListItemIcon>
      </ListItem>
    </div>
  );
}

function SecondaryListIcons(props) {
  return (
    <div>
      <ListItem>
        <ListItemIcon>
          <RouterLink
            to="/settings"
            style={routerStyle(props.location, "settings", props.theme)}
          >
            <Tooltip
              title={<Typography variant="body2">Settings</Typography>}
              placement="right"
              TransitionComponent={Zoom}
              arrow
            >
              <SettingsIcon className={props.classes.listIcons} />
            </Tooltip>
          </RouterLink>
        </ListItemIcon>
      </ListItem>
    </div>
  );
}

export default function LeftDrawer({
  renderDrawer,
  location,
  handleDrawerClose,
}) {
  const theme = useTheme();
  const classes = useStyles(theme);

  if (renderDrawer) {
    return (
      <div className={classes.leftDrawer}>
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
          <div className={classes.drawerIcons}>
            <List className="main-list-icons">
              <MainListIcons
                classes={classes}
                location={location}
                theme={theme}
              />
            </List>
            <List className="secondary-list-icons">
              <SecondaryListIcons
                classes={classes}
                location={location}
                theme={theme}
              />
            </List>
          </div>
        </Drawer>
      </div>
    );
  }
  return null;
}
