import { createSelector } from '@reduxjs/toolkit'

import { initialState } from './slice'

// First select the relevant part from the state
const selectDomain = (state) => state.main || initialState

export const selectGetSpacesUrl = createSelector(
  [selectDomain],
  (mainState) => mainState.getSpacesUrl,
)

export const selectSpaces = createSelector(
  [selectDomain],
  (mainState) => mainState.spaces,
)

export const selectSpacesStatus = createSelector(
  [selectDomain],
  (mainState) => mainState.spacesStatus,
)

export const selectSpacesError = createSelector(
  [selectDomain],
  (mainState) => mainState.spacesError,
)

export const selectGetFeaturesUrl = createSelector(
  [selectDomain],
  (mainState) => mainState.getFeaturesUrl,
)

export const selectFeatures = createSelector(
  [selectDomain],
  (mainState) => mainState.features,
)

export const selectFeaturesStatus = createSelector(
  [selectDomain],
  (mainState) => mainState.featuresStatus,
)

export const selectFeaturesError = createSelector(
  [selectDomain],
  (mainState) => mainState.featuresError,
)