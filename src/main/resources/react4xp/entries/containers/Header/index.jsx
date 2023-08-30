import React from 'react';
import { styled } from '@mui/material/styles';
import { AppBar, Toolbar, Typography } from '@mui/material';

const PREFIX = 'index';

const classes = {
  title: `${PREFIX}-title`
};

const StyledAppBar = styled(AppBar)({
  [`& .${classes.title}`]: {
    flexGrow: 1,
  },
});

export function Header() {


  return (
    <StyledAppBar position="static">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          Feature Toggle
        </Typography>
      </Toolbar>
    </StyledAppBar>
  );
}
