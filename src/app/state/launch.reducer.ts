import { createReducer, on } from '@ngrx/store';

import { Launch } from '../models/launch.model';
import * as LaunchActions from './launch.actions';

export interface LaunchState {
  launches: Launch[];
  selectedLaunch: Launch | null;
  favoriteIds: string[];
  loading: boolean;
  error: string | null;
}

export const initialState: LaunchState = {
  launches: [],
  selectedLaunch: null,
  favoriteIds: [],
  loading: false,
  error: null,
};

export const launchReducer = createReducer(
  initialState,

  on(LaunchActions.loadLaunches, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(LaunchActions.loadLaunchesSuccess, (state, { launches }) => ({
    ...state,
    launches,
    loading: false,
    error: null,
  })),

  on(LaunchActions.loadLaunchesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(LaunchActions.loadLaunchDetails, (state) => ({
    ...state,
    selectedLaunch: null,
    loading: true,
    error: null,
  })),

  on(LaunchActions.loadLaunchDetailsSuccess, (state, { launch }) => ({
    ...state,
    selectedLaunch: launch,
    loading: false,
    error: null,
  })),

  on(LaunchActions.loadLaunchDetailsFailure, (state, { error }) => ({
    ...state,
    selectedLaunch: null,
    loading: false,
    error,
  })),

  on(LaunchActions.toggleFavorite, (state, { id }) => {
    const isFavorite = state.favoriteIds.includes(id);

    return {
      ...state,
      favoriteIds: isFavorite
        ? state.favoriteIds.filter((favoriteId) => favoriteId !== id)
        : [...state.favoriteIds, id],
    };
  }),

  on(LaunchActions.loadFavoritesSuccess, (state, { favoriteIds }) => ({
    ...state,
    favoriteIds,
  })),
);
