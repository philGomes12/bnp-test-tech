import { createFeatureSelector, createSelector } from '@ngrx/store';

import { LaunchState } from './launch.reducer';

export const selectLaunchState = createFeatureSelector<LaunchState>('launch');

export const selectAllLaunches = createSelector(
  selectLaunchState,
  (state) => state.launches,
);

export const selectSelectedLaunch = createSelector(
  selectLaunchState,
  (state) => state.selectedLaunch,
);

export const selectIsLoading = createSelector(
  selectLaunchState,
  (state) => state.loading,
);

export const selectLaunchError = createSelector(
  selectLaunchState,
  (state) => state.error,
);

export const selectFavoriteIds = createSelector(
  selectLaunchState,
  (state) => state.favoriteIds,
);

export const selectIsFavorite = (id: string) =>
  createSelector(selectFavoriteIds, (favoriteIds) => favoriteIds.includes(id));
