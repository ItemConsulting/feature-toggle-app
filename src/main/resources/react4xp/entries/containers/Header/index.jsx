import React from 'react';
import { AppBar, makeStyles, Toolbar, Typography } from '@material-ui/core';

const useStyles = makeStyles({
  title: {
    flexGrow: 1,
  },
});

export function Header() {
  const classes = useStyles();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          Feature Toggle
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
