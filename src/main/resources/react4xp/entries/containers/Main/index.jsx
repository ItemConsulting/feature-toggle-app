import { Button, Container, LinearProgress, makeStyles, Typography } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectSpaces, selectSpacesStatus, selectSpacesError, selectGetSpacesUrl } from './selectors';
import { requestSpaces } from './actions';
import { Alert } from '@material-ui/lab';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2),
  },
}));

export function Main() {
  const classes = useStyles();

  const dispatch = useDispatch();
  const getSpacesUrl = useSelector(selectGetSpacesUrl);
  const spaces = useSelector(selectSpaces);
  const spacesStatus = useSelector(selectSpacesStatus);
  const spacesError = useSelector(selectSpacesError);

  useEffect(() => {
    if (spacesStatus === 'idle' && getSpacesUrl) {
      requestSpaces(dispatch, getSpacesUrl);
    }
  });

  function renderSpaces() {
    if (spacesStatus === 'loading' || spacesStatus === 'idle') {
      return <LinearProgress />;
    } else if (spacesStatus === 'error') {
      return <Alert severity="error">{spacesError}</Alert>;
    } else if (spacesStatus === 'succeeded') {
      if (spaces.length > 0) {
        return spaces.map((space) => {
          return <div key={space._id}>{space._name}</div>;
        });
      } else {
        return <Alert severity="info">No spaces</Alert>
      }
    }
  }

  return (
    <Container maxWidth={'lg'} className={classes.root}>
      {renderSpaces()}
    </Container>
  );
}
