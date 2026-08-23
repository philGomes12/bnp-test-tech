import { createAction, props } from '@ngrx/store';

import { Launch } from '../models/launch.model';

export const loadLaunches = createAction('[Launch List] Load Launches');

export const loadLaunchesSuccess = createAction(
  '[Launch API] Load Launches Success',
  props<{ launches: Launch[] }>(),
);

export const loadLaunchesFailure = createAction(
  '[Launch API] Load Launches Failure',
  props<{ error: string }>(),
);

export const loadLaunchDetails = createAction(
  '[Launch Details] Load Launch Details',
  props<{ id: string }>(),
);

export const loadLaunchDetailsSuccess = createAction(
  '[Launch API] Load Launch Details Success',
  props<{ launch: Launch }>(),
);

export const loadLaunchDetailsFailure = createAction(
  '[Launch API] Load Launch Details Failure',
  props<{ error: string }>(),
);

export const toggleFavorite = createAction(
  '[Launch] Toggle Favorite',
  props<{ id: string }>(),
);

export const loadFavorites = createAction('[Favorites] Load Favorites');

export const loadFavoritesSuccess = createAction(
  '[Favorites] Load Favorites Success',
  props<{ favoriteIds: string[] }>(),
);
