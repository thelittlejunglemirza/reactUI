// External
import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

/*
* @ Des:
*     Component that renders circular progress bar
*/

const Loadbar = () => (
      <MuiThemeProvider>
         <CircularProgress size={60} thickness={6} color="#2196F3"/>
      </MuiThemeProvider>
);

export default Loadbar;
