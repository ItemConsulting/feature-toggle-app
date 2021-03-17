import { createSelector } from '@reduxjs/toolkit'

import { initialState } from './slice'

// First select the relevant part from the state
const selectDomain = (state) => state.main || initialState

export const selectSpacesUrl = createSelector(
  [selectDomain],
  (mainState) => mainState.spacesUrl,
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

export const selectFeaturesUrl = createSelector(
  [selectDomain],
  (mainState) => mainState.featuresUrl,
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

export const selectPublishFeatureUrl = createSelector(
  [selectDomain],
  (mainState) => mainState.publishFeatureUrl,
)