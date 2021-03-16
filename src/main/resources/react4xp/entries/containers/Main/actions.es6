import axios from 'axios';
import { actions } from './slice';

export function setServiceUrls(dispatch, getSpacesUrl) {
  dispatch({
    type: actions.setGetSpacesUrl.type,
    getSpacesUrl,
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
