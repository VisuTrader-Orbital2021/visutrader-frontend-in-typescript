import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ForumIcon from '@material-ui/icons/Forum';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import SettingsIcon from '@material-ui/icons/Settings';

/* TODO: Hide <ListItemText> and apply
   conditional rendering on mouse hover */

export const mainListItems = (
  <div>
    <ListItem>
      <ListItemIcon>
        <ForumIcon />
      </ListItemIcon>
    </ListItem>
    <ListItem>
      <ListItemIcon>
        <MenuBookIcon />
      </ListItemIcon>
    </ListItem>
    <ListItem>
      <ListItemIcon>
        <EqualizerIcon />
      </ListItemIcon>
    </ListItem>
    <ListItem>
      <ListItemIcon>
        <AccountBalanceWalletIcon />
      </ListItemIcon>
    </ListItem>
  </div>
);

export const secondaryListItems = (
  <div>
    <ListItem>
      <ListItemIcon>
        <SettingsIcon />
      </ListItemIcon>
      <ListItemText primary="Settings" />
    </ListItem>
  </div>
);