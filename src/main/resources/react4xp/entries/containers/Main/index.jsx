import { Button, Container, FormControl, InputLabel, LinearProgress, makeStyles, MenuItem, Select, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectSpaces, selectSpacesStatus, selectSpacesError, selectGetSpacesUrl } from './selectors';
import { requestSpaces } from './actions';
import { Alert } from '@material-ui/lab';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2),
  },
  formControll: {
    minWidth: 300,
    marginRight: theme.spacing(2)
  },
}));

export function Main() {
  const classes = useStyles();

  const dispatch = useDispatch();
  const getSpacesUrl = useSelector(selectGetSpacesUrl);
  const spaces = useSelector(selectSpaces);
  const spacesStatus = useSelector(selectSpacesStatus);
  const spacesError = useSelector(selectSpacesError);
  const [space, setSpace] = useState('');
  const [branch, setBranch] = useState('draft');

  useEffect(() => {
    if (spacesStatus === 'idle' && getSpacesUrl) {
      requestSpaces(dispatch, getSpacesUrl);
    }
  });

  function renderSpaceForm() {
    return (
      <React.Fragment>
        <FormControl className={classes.formControll}>
          <InputLabel id="space-select-label">Space</InputLabel>
          <Select labelId="space-select-label" id="space-select" value={space} onChange={(e) => setSpace(e.target.value)}>
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {spaces.map((s) => {
              return (
                <MenuItem key={s._id} value={s._name}>
                  {s._name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <FormControl className={classes.formControll}>
          <InputLabel id="branch-select-label">Branch</InputLabel>
          <Select labelId="branch-select-label" id="branch-select" value={branch} onChange={(e) => setBranch(e.target.value)}>
            <MenuItem value="draft">Draft</MenuItem>
            <MenuItem value="master">Master</MenuItem>
          </Select>
        </FormControl>
      </React.Fragment>
    );
  }

  function renderSpaces() {
    if (spacesStatus === 'loading' || spacesStatus === 'idle') {
      return <LinearProgress />;
    } else if (spacesStatus === 'error') {
      return <Alert severity="error">{spacesError}</Alert>;
    } else if (spacesStatus === 'succeeded') {
      if (spaces.length > 0) {
        return renderSpaceForm();
      } else {
        return <Alert severity="info">No spaces</Alert>;
      }
    }
  }

  return (
    <Container maxWidth={'lg'} className={classes.root}>
      {renderSpaces()}
    </Container>
  );
}
