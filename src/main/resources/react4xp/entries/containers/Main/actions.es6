import axios from 'axios';
import { actions } from './slice';

export function requestSpaces(dispatch) {
  dispatch({
    type: actions.loadSpaces.type,
  });

  axios
    .get('http://localhost:8080/_/service/com.gravitondigital.app.featuretoggle/getSpaces')
    .then((res) => {
      dispatch({
        type: actions.spacesLoaded.type,
        spaces: res.data.spaces,
      });
    })
    .catch((err) => {
      dispatch({
        type: actions.spacesError.type,
        error: err.toString(),
      });
    });
}
