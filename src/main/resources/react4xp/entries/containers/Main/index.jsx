import { Button, Container, Divider, FormControl, Grid, InputLabel, LinearProgress, makeStyles, MenuItem, Select, Switch, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectSpaces, selectSpacesStatus, selectSpacesError, selectSpacesUrl, selectFeaturesUrl, selectFeatures, selectFeaturesStatus, selectFeaturesError } from './selectors';
import { requestSpaces, requestFeatures, updateFeature } from './actions';
import { Alert } from '@material-ui/lab';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2),
  },
  formControll: {
    minWidth: 300,
    marginRight: theme.spacing(2),
  },
  row: {
    marginBottom: theme.spacing(2),
  },
  featureName: {
    padding: theme.spacing(1.5)
  }
}));

export function Main() {
  const classes = useStyles();

  const dispatch = useDispatch();
  const spacesUrl = useSelector(selectSpacesUrl);
  const spaces = useSelector(selectSpaces);
  const spacesStatus = useSelector(selectSpacesStatus);
  const spacesError = useSelector(selectSpacesError);

  const featuresUrl = useSelector(selectFeaturesUrl);
  const features = useSelector(selectFeatures);
  const featuresStatus = useSelector(selectFeaturesStatus);
  const featuresError = useSelector(selectFeaturesError);

  const [space, setSpace] = useState('');
  const [branch, setBranch] = useState('draft');

  useEffect(() => {
    if (spacesStatus === 'idle' && spacesUrl) {
      requestSpaces(dispatch, spacesUrl);
    }
  });

  useEffect(() => {
    if (space && branch) {
      requestFeatures(dispatch, featuresUrl, space, branch);
    }
  }, [space, branch]);

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

  function renderFeatures() {
    if (!space) {
      return <Alert severity="info">No space selected</Alert>;
    }
    if (featuresStatus === 'loading') {
      return <LinearProgress />;
    } else if (featuresStatus === 'error') {
      return <Alert severity="error">{spacesError}</Alert>;
    } else if (featuresStatus === 'succeeded') {
      return (
        <Grid container spacing={2}>
          {features.map((feature) => {
            return (
              <React.Fragment key={feature._id}>
                <Grid item xs={12}>
                  <Grid container spacing={2}>
                    <Grid item xs={10}>
                      <Typography component="div" className={classes.featureName} variant="body1">{feature._name}</Typography>
                    </Grid>
                    <Grid item xs={1}>
                      <Switch
                        checked={feature.enabled}
                        onChange={() => {
                          updateFeature(dispatch, featuresUrl, space, feature._name, !feature.enabled)
                        }}
                        color="primary"
                      />
                    </Grid>
                    <Grid item xs={1}>
                      <Button variant="contained" color="primary">Publish</Button>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Divider />
                </Grid>
              </React.Fragment>
            );
          })}
        </Grid>
      );
    } else {
      return <Alert severity="info">No features</Alert>;
    }
  }

  return (
    <Container maxWidth={'lg'} className={classes.root}>
      <div className={classes.row}>{renderSpaces()}</div>
      <div className={classes.row}>{renderFeatures()}</div>
    </Container>
  );
}
