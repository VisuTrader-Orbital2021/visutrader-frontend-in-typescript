import React from 'react';
import { createMuiTheme } from '@material-ui/core/styles';

export const Theme = createMuiTheme({
  palette: {
    primary: {
      light: '#758afe',
      main: '#536dfe',
      dark: '#3a4cb1',
      contrastText: '#ffffff',
    },
    secondary: {
      light: '#ef6694',
      main: '#ec407a',
      dark: '#a52c55',
      contrastText: '#ffffff',
    },
  },
});

