import { createSlice } from '../../utils/@reduxjs/toolkit';

export const initialState = {
  spacesUrl: null,
  featuresUrl: null,
  spaces: [],
  spacesStatus: 'idle',
  spacesError: undefined,
  features: [],
  featuresStatus: 'idle',
  featuresError: undefined
};

const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    setSpacesUrl(state, action) {
      state.spacesUrl = action.spacesUrl
    },
    setFeaturesUrl(state, action) {
      state.featuresUrl = action.featuresUrl
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
      state.features = action.features;
      state.featuresStatus = 'succeeded';
    },
    featuresError(state, action) {
      state.featuresError = action.error;
      state.featuresStatus = 'error';
    },
  },
});

export const { actions, reducer, name: sliceKey } = mainSlice;
