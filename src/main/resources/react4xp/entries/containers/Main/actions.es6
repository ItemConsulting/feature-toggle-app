import axios from 'axios';
import { actions } from './slice';

export function setServiceUrls(dispatch, spacesUrl, featuresUrl) {
  dispatch({
    type: actions.setSpacesUrl.type,
    spacesUrl: spacesUrl,
  });
  dispatch({
    type: actions.setFeaturesUrl.type,
    featuresUrl: featuresUrl,
  });
}

export function requestSpaces(dispatch, spacesUrl) {
  dispatch({
    type: actions.loadSpaces.type,
  });

  axios
    .get(spacesUrl)
    .then((res) => {
      dispatch({
        type: actions.spacesLoaded.type,
        spaces: res.data.spaces,
      });
    })
    .catch((err) => {
      dispatch({
        type: actions.spacesError.type,
        error: `${err.toString()}${err.response.data.message ? ` - ${err.response.data.message}` : ''}`,
      });
    });
}

export function requestFeatures(dispatch, featuresUrl, space, branch) {
  dispatch({
    type: actions.loadFeatures.type,
  });
  axios
    .get(featuresUrl, {
      params: {
        space,
        branch,
      },
    })
    .then((res) => {
      dispatch({
        type: actions.featuresLoaded.type,
        features: res.data.features,
      });
    })
    .catch((err) => {
      dispatch({
        type: actions.featuresError.type,
        error: `${err.toString()}${err.response.data.message ? ` - ${err.response.data.message}` : ''}`,
      });
    });
}

export function updateFeature(dispatch, featuresUrl, space, feature, enabled) {
  dispatch({
    type: actions.updateFeatureLoading.type,
    feature,
  });
  axios
    .post(featuresUrl, {
      space,
      feature,
      enabled,
    })
    .then((res) => {
      dispatch({
        type: actions.updateFeatureSuccess.type,
        feature: res.data.feature,
      });
    })
    .catch((err) => {
      dispatch({
        type: actions.updateFeatureError.type,
        error: `${err.toString()}${err.response.data.message ? ` - ${err.response.data.message}` : ''}`,
        feature: feature,
      });
    });
}
