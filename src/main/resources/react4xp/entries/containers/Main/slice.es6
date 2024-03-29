import { createSlice } from '../../utils/@reduxjs/toolkit';

export const initialState = {
  spacesUrl: null,
  featuresUrl: null,
  publishFeatureUrl: null,
  spaces: [],
  spacesStatus: 'idle',
  spacesError: undefined,
  features: [],
  featuresStatus: 'idle',
  featuresError: undefined,
};

const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    setSpacesUrl(state, action) {
      state.spacesUrl = action.spacesUrl;
    },
    setFeaturesUrl(state, action) {
      state.featuresUrl = action.featuresUrl;
    },
    setPublishFeatureUrl(state, action) {
      state.publishFeatureUrl = action.publishFeatureUrl;
    },
    loadSpaces(state, action) {
      state.spaces = [];
      state.spacesStatus = 'loading';
      state.spacesError = undefined;
    },
    spacesLoaded(state, action) {
      state.spaces = action.spaces;
      state.spacesStatus = 'succeeded';
    },
    spacesError(state, action) {
      state.spacesError = action.error;
      state.spacesStatus = 'error';
    },
    loadFeatures(state, action) {
      state.features = [];
      state.featuresStatus = 'loading';
      state.featuresError = undefined;
    },
    featuresLoaded(state, action) {
      state.features = action.features.map((f) => {
        return {
          ...f,
          error: null,
          updateStatus: 'idle',
          publishStatus: 'idle'
        }
      });
      state.featuresStatus = 'succeeded';
    },
    featuresError(state, action) {
      state.featuresError = action.error;
      state.featuresStatus = 'error';
    },
    updateFeatureLoading(state, action) {
      const feature = state.features.find((f) => f._name === action.feature);
      if (feature) {
        feature.error = null;
        feature.updateStatus = 'loading';
      }
    },
    updateFeatureSuccess(state, action) {
      const feature = state.features.find((f) => f._name === action.feature._name);
      if (feature) {
        feature.updateStatus = 'succeeded';
        feature.enabled = action.feature.enabled
      }
    },
    updateFeatureError(state, action) {
      const feature = state.features.find((f) => f._name === action.feature);
      if (feature) {
        feature.updateStatus = 'error';
        feature.error = action.error
      }
    },
    publishFeatureLoading(state, action) {
      const feature = state.features.find((f) => f._name === action.feature);
      if (feature) {
        feature.error = null;
        feature.publishStatus = 'loading';
      }
    },
    publishFeatureSuccess(state, action) {
      const feature = state.features.find((f) => f._name === action.feature);
      if (feature) {
        feature.publishStatus = 'succeeded';
      }
    },
    publishFeatureError(state, action) {
      const feature = state.features.find((f) => f._name === action.feature);
      if (feature) {
        feature.publishStatus = 'error';
        feature.error = action.error
      }
    },
    setFeaturePublishStatus(state, action) {
      const feature = state.features.find((f) => f._id === action.feature._id);
      if (feature) {
        feature.publishStatus = action.status;
      }
    },
    setFeatureUpdateStatus(state, action) {
      const feature = state.features.find((f) => f._id === action.feature._id);
      if (feature) {
        feature.updateStatus = action.status;
      }
    },
  },
});

export const { actions, reducer, name: sliceKey } = mainSlice;
