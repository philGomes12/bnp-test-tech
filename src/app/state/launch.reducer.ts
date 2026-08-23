import { createReducer, on } from '@ngrx/store';
import * as LaunchActions from './launch.actions';
import { Launch } from '../models/launch.model';

export interface LaunchState {
  launches: Launch[];
  favoriteIds: string[];
  loading: boolean;
  error: string | null;
}

export const initialState: LaunchState = {
  launches: [],
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
    loading: false,
    launches,
  })),

  on(LaunchActions.loadLaunchesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
);
