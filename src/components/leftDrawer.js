import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ForumIcon from '@material-ui/icons/Forum';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import SettingsIcon from '@material-ui/icons/Settings';
import '../styles/leftDrawer.css'

function forumRouterStyle(location) {
  if (location === "forum") {
    return {
      color: "#536dfe"
    };
  }
  else {
    return {
      color: "#757575"
    };
  }
}

function guideRouterStyle(location) {
  if (location === "guide") {
    return {
      color: "#536dfe"
    };
  }
  else {
    return {
      color: "#757575"
    };
  }
}

function tradeRouterStyle(location) {
  if (location === "trade") {
    return {
      color: "#536dfe"
    };
  }
  else {
    return {
      color: "#757575"
    };
  }
}

function walletRouterStyle(location) {
  if (location === "wallet") {
    return {
      color: "#536dfe"
    };
  }
  else {
    return {
      color: "#757575"
    };
  }
}

function settingsRouterStyle(location) {
  if (location === "settings") {
    return {
      color: "#536dfe"
    };
  }
  else {
    return {
      color: "#757575"
    };
  }
}

function MainListIcons(props) {
  return (
    <div>
      <ListItem>
        <ListItemIcon>
          <RouterLink to="/personal/forum" style={forumRouterStyle(props.location)}>
            <ForumIcon
              className="forum-icon"
              onMouseEnter={props.openForumTag}
              onMouseLeave={props.closeForumTag}
            />
          </RouterLink>
        </ListItemIcon>
      </ListItem>
      <ListItem>
        <ListItemIcon>
          <RouterLink to="/personal/guide" style={guideRouterStyle(props.location)}>
            <MenuBookIcon
              className="guide-icon"
              onMouseEnter={props.openGuideTag}
              onMouseLeave={props.closeGuideTag}
            />
          </RouterLink>
        </ListItemIcon>
      </ListItem>
      <ListItem>
        <ListItemIcon>
          <RouterLink to="/personal/trade" style={tradeRouterStyle(props.location)}>
            <EqualizerIcon
              className="trade-icon"
              onMouseEnter={props.openTradeTag}
              onMouseLeave={props.closeTradeTag}
            />
          </RouterLink>
        </ListItemIcon>
      </ListItem>
      <ListItem>
        <ListItemIcon>
          <RouterLink to="/personal/wallet" style={walletRouterStyle(props.location)}>
            <AccountBalanceWalletIcon
              className="wallet-icon"
              onMouseEnter={props.openWalletTag}
              onMouseLeave={props.closeWalletTag}
            />
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
          <RouterLink to="/personal/settings" style={settingsRouterStyle(props.location)}>
            <SettingsIcon
              className="settings-icon"
              onMouseEnter={props.openSettingsTag}
              onMouseLeave={props.closeSettingsTag}
            />
          </RouterLink>
        </ListItemIcon>
      </ListItem>
    </div>
  );
}

export default function LeftDrawer({ renderDrawer, location, classes, open, handleDrawerClose }) {
  const [forumTag, setForumTag] = React.useState(false);
  const openForumTag = () => {
    setForumTag(true);
  };
  const closeForumTag = () => {
    setForumTag(false);
  };

  const [guideTag, setGuideTag] = React.useState(false);
  const openGuideTag = () => {
    setGuideTag(true);
  };
  const closeGuideTag = () => {
    setGuideTag(false);
  };

  const [tradeTag, setTradeTag] = React.useState(false);
  const openTradeTag = () => {
    setTradeTag(true);
  };
  const closeTradeTag = () => {
    setTradeTag(false);
  };

  const [walletTag, setWalletTag] = React.useState(false);
  const openWalletTag = () => {
    setWalletTag(true);
  };
  const closeWalletTag = () => {
    setWalletTag(false);
  };

  const [settingsTag, setSettingsTag] = React.useState(false);
  const openSettingsTag = () => {
    setSettingsTag(true);
  };
  const closeSettingsTag = () => {
    setSettingsTag(false);
  };
  
  if (renderDrawer) {
    return (
      <div className="left-drawer">
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
          <div classsName="drawer-list-icons">
            <List className="main-list-icons" autowidth={false}>
              <MainListIcons
                location={location}
                openForumTag={openForumTag}
                closeForumTag={closeForumTag}
                openGuideTag={openGuideTag}
                closeGuideTag={closeGuideTag}
                openTradeTag={openTradeTag}
                closeTradeTag={closeTradeTag}
                openWalletTag={openWalletTag}
                closeWalletTag={closeWalletTag}
              />
            </List>
            <List className="secondary-list-icons" autowith={false}>
              <SecondaryListIcons
                location={location}
                openSettingsTag={openSettingsTag}
                closeSettingsTag={closeSettingsTag}
              />
            </List>
          </div>
        </Drawer>
        <div className="drawer-list-tags">
          <div className="main-list-tags">
            <RenderForumTag forumTag={forumTag} />
            <RenderGuideTag guideTag={guideTag} />
            <RenderTradeTag tradeTag={tradeTag} />
            <RenderWalletTag walletTag={walletTag} />
          </div>
          <div className="secondary-list-tags">
            <RenderSettingsTag settingsTag={settingsTag} />
          </div>
        </div>
      </div>
    );
  }
  return null;
}

function RenderForumTag({ forumTag }) {
  if (forumTag) {
    return (
      <span className="forum-tag">Forum</span>
    );
  }
  else {
    return null;
  }
}

function RenderGuideTag({ guideTag }) {
  if (guideTag) {
    return (
      <span className="guide-tag">Guide</span>
    );
  }
  else {
    return null;
  }
}

function RenderTradeTag({ tradeTag }) {
  if (tradeTag) {
    return (
      <span className="trade-tag">Trade</span>
    );
  }
  else {
    return null;
  }
}

function RenderWalletTag({ walletTag }) {
  if (walletTag) {
    return (
      <span className="wallet-tag">Wallet</span>
    );
  }
  else {
    return null;
  }
}

function RenderSettingsTag({ settingsTag }) {
  if (settingsTag) {
    return (
      <span className="settings-tag">Settings</span>
    );
  }
  else {
    return null;
  }
}
