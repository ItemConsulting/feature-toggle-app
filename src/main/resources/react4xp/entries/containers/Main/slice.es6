import { createSlice } from '../../utils/@reduxjs/toolkit';

export const initialState = {
  spaces: [],
  spacesStatus: 'idle',
  spacesError: undefined,
};

const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
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
  },
});

export const { actions, reducer, name: sliceKey } = mainSlice;
