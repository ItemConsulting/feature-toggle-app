import axios from 'axios';
import { actions } from './slice';

export function setServiceUrls(dispatch, getSpacesUrl, getFeaturesUrl) {
  dispatch({
    type: actions.setGetSpacesUrl.type,
    getSpacesUrl,
  });
  dispatch({
    type: actions.setGetFeaturesUrl.type,
    getFeaturesUrl,
  });
}

export function requestSpaces(dispatch, getSpacesUrl) {
  dispatch({
    type: actions.loadSpaces.type,
  });

  axios
    .get(getSpacesUrl)
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

export function requestFeatures(dispatch, getFeaturesUrl, space, branch) {
  dispatch({
    type: actions.loadFeatures.type,
  });
  axios
    .get(getFeaturesUrl, {
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
