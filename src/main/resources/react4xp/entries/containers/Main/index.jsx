import { Alert, Button, Container, Divider, FormControl, Grid, InputLabel, LinearProgress, MenuItem, Select, Switch, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectSpaces,
  selectSpacesStatus,
  selectSpacesError,
  selectSpacesUrl,
  selectFeaturesUrl,
  selectFeatures,
  selectFeaturesStatus,
  selectFeaturesError,
  selectPublishFeatureUrl,
} from './selectors';
import { requestSpaces, requestFeatures, updateFeature, publishFeature } from './actions';
import { Feedback } from '../Feedback'

const PREFIX = 'index';

const classes = {
  root: `${PREFIX}-root`,
  formControll: `${PREFIX}-formControll`,
  row: `${PREFIX}-row`,
  featureName: `${PREFIX}-featureName`
};

const StyledContainer = styled(Container)((
  {
    theme
  }
) => ({
  [`&.${classes.root}`]: {
    marginTop: theme.spacing(2),
  },

  [`& .${classes.formControll}`]: {
    minWidth: 300,
    marginRight: theme.spacing(2),
  },

  [`& .${classes.row}`]: {
    marginBottom: theme.spacing(2),
  },

  [`& .${classes.featureName}`]: {
    padding: theme.spacing(1.5),
  }
}));

export function Main() {


  const dispatch = useDispatch();
  const spacesUrl = useSelector(selectSpacesUrl);
  const spaces = useSelector(selectSpaces);
  const spacesStatus = useSelector(selectSpacesStatus);
  const spacesError = useSelector(selectSpacesError);

  const featuresUrl = useSelector(selectFeaturesUrl);
  const features = useSelector(selectFeatures);
  const featuresStatus = useSelector(selectFeaturesStatus);
  const featuresError = useSelector(selectFeaturesError);

  const publishFeaturesUrl = useSelector(selectPublishFeatureUrl);

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
          <Select labelId="space-select-label" id="space-select" value={space} onChange={(e) => setSpace(e.target.value)} label="Space">
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
          <Select labelId="branch-select-label" id="branch-select" value={branch} onChange={(e) => setBranch(e.target.value)} label="Branch">
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
      return <Alert severity="error">{featuresError}</Alert>;
    } else if (featuresStatus === 'succeeded') {
      return (
        <Grid container spacing={2}>
          {features.map((feature) => {
            return (
              <React.Fragment key={feature._id}>
                <Grid item xs={12}>
                  <Grid container spacing={2}>
                    <Grid item xs={8}>
                      <Typography component="div" className={classes.featureName} variant="body1">
                        {feature._name}
                      </Typography>
                    </Grid>
                    <Grid item xs={2}>
                      <Switch
                        checked={feature.enabled}
                        disabled={feature.updateStatus === 'loading'}
                        onChange={() => {
                          if (branch === 'master') return;
                          updateFeature(dispatch, featuresUrl, space, feature._name, !feature.enabled);
                        }}
                        color="primary"
                      />
                    </Grid>
                    <Grid item xs={2}>
                      {branch === 'master' ? null : (
                        <Button
                          variant="contained"
                          color="primary"
                          disabled={feature.publishStatus === 'loading'}
                          onClick={() => {
                            publishFeature(dispatch, publishFeaturesUrl, space, feature._name);
                          }}
                        >
                          Publish
                        </Button>
                      )}
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
    <StyledContainer maxWidth={'lg'} className={classes.root}>
      <div className={classes.row}>{renderSpaces()}</div>
      <div className={classes.row}>{renderFeatures()}</div>
      <Feedback />
    </StyledContainer>
  );
}
