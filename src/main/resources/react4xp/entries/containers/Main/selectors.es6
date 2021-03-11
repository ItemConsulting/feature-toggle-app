import { createSelector } from '@reduxjs/toolkit'

import { initialState } from './slice'

// First select the relevant part from the state
const selectDomain = (state) => state.main || initialState

export const selectTest = createSelector(
  [selectDomain],
  (mainState) => mainState.test,
)
