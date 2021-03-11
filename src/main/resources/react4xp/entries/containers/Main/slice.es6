import { createSlice } from '../../utils/@reduxjs/toolkit'

export const initialState = {
  test: '123',
};

const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    setTest(state, action) {
      state.test = 'test'
    },
  },
});

export const { actions, reducer, name: sliceKey } = mainSlice
