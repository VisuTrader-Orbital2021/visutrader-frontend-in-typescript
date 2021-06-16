import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import ForumIcon from '@material-ui/icons/Forum';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import SettingsIcon from '@material-ui/icons/Settings';

/* TODO: Hide <ListItemText> and apply
   conditional rendering on mouse hover */

export const mainListItems = (
  <div>
    <ListItem button>
      <ListItemIcon>
        <ForumIcon />
      </ListItemIcon>
      <ListItemText primary="Forum" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <MenuBookIcon />
      </ListItemIcon>
      <ListItemText primary="Guide" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <EqualizerIcon />
      </ListItemIcon>
      <ListItemText primary="Trade" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AccountBalanceWalletIcon />
      </ListItemIcon>
      <ListItemText primary="Wallet" />
    </ListItem>
  </div>
);

export const secondaryListItems = (
  <div>
    <ListItem button>
      <ListItemIcon>
        <SettingsIcon />
      </ListItemIcon>
      <ListItemText primary="Settings" />
    </ListItem>
  </div>
);