import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Alert, Snackbar } from '@mui/material';
import { selectFeaturePublishErrors, selectFeaturePublishSuccesses, selectFeatureUpdateErrors, selectFeatureUpdateSuccesses } from '../Main/selectors';
import { setFeaturePublishStatus, setFeatureUpdateStatus } from '../Main/actions';

export function Feedback() {
  const dispatch = useDispatch();

  const publishErrors = useSelector(selectFeaturePublishErrors);
  const publishSuccesses = useSelector(selectFeaturePublishSuccesses);
  const updateErrors = useSelector(selectFeatureUpdateErrors);
  const updateSuccsses = useSelector(selectFeatureUpdateSuccesses);

  const handleClose = (feature, alertType, reason) => {
    if(reason === 'clickaway') return

    if (alertType === 'publish') {
      setFeaturePublishStatus(dispatch, feature, 'idle');
    } else if (alertType === 'update') {
      setFeatureUpdateStatus(dispatch, feature, 'idle');
    }
  };

  return (
    <React.Fragment>
      {publishErrors.map((f) => {
        return (
          <Snackbar key={`publish-error-${f._id}`} open={true} autoHideDuration={6000} onClose={(e, reason) => handleClose(f, 'publish', reason)}>
            <Alert onClose={() => handleClose(f, 'publish')} severity="error">
              Publish error: {f.error}
            </Alert>
          </Snackbar>
        );
      })}
      {publishSuccesses.map((f) => {
        return (
          <Snackbar key={`publish-success-${f._id}`} open={true} autoHideDuration={3000} onClose={(e, reason) => handleClose(f, 'publish', reason)}>
            <Alert onClose={() => handleClose(f, 'publish')} severity="success">
              Successfully published {f._name}
            </Alert>
          </Snackbar>
        );
      })}
      {updateErrors.map((f) => {
        return (
          <Snackbar key={`update-error-${f._id}`} open={true} autoHideDuration={6000} onClose={(e, reason) => handleClose(f, 'update', reason)}>
            <Alert onClose={() => handleClose(f, 'update')} severity="error">
              Update error: {f.error}
            </Alert>
          </Snackbar>
        );
      })}
      {updateSuccsses.map((f) => {
        return (
          <Snackbar key={`update-success-${f._id}`} open={true} autoHideDuration={3000} onClose={(e, reason) => handleClose(f, 'update', reason)}>
            <Alert onClose={() => handleClose(f, 'update')} severity="success">
              Successfully updated {f._name}
            </Alert>
          </Snackbar>
        );
      })}
    </React.Fragment>
  );
}
