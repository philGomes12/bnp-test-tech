import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import {
  catchError,
  exhaustMap,
  map,
  of,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs';

import { SpacexService } from '../services/spacex';
import * as LaunchActions from './launch.actions';
import { selectFavoriteIds } from './launch.selectors';

@Injectable()
export class LaunchEffects {
  private readonly actions$ = inject(Actions);
  private readonly spacexService = inject(SpacexService);
  private readonly store = inject(Store);

  private readonly favoritesStorageKey = 'spacex-favorite-launches';

  readonly loadLaunches$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LaunchActions.loadLaunches),
      exhaustMap(() =>
        this.spacexService.getPastLaunches().pipe(
          map((launches) => LaunchActions.loadLaunchesSuccess({ launches })),
          catchError((error: unknown) =>
            of(
              LaunchActions.loadLaunchesFailure({
                error: this.getErrorMessage(error),
              }),
            ),
          ),
        ),
      ),
    ),
  );

  readonly loadLaunchDetails$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LaunchActions.loadLaunchDetails),
      switchMap(({ id }) =>
        this.spacexService.getLaunchById(id).pipe(
          map((launch) => {
            if (!launch) {
              return LaunchActions.loadLaunchDetailsFailure({
                error: 'Launch not found',
              });
            }

            return LaunchActions.loadLaunchDetailsSuccess({
              launch,
            });
          }),
          catchError((error: unknown) =>
            of(
              LaunchActions.loadLaunchDetailsFailure({
                error: this.getErrorMessage(error),
              }),
            ),
          ),
        ),
      ),
    ),
  );

  readonly loadFavorites$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LaunchActions.loadFavorites),
      map(() => {
        const storedFavorites = localStorage.getItem(this.favoritesStorageKey);

        if (!storedFavorites) {
          return LaunchActions.loadFavoritesSuccess({
            favoriteIds: [],
          });
        }

        try {
          const parsedFavorites: unknown = JSON.parse(storedFavorites);

          if (
            Array.isArray(parsedFavorites) &&
            parsedFavorites.every(
              (favoriteId) => typeof favoriteId === 'string',
            )
          ) {
            return LaunchActions.loadFavoritesSuccess({
              favoriteIds: parsedFavorites,
            });
          }

          return LaunchActions.loadFavoritesSuccess({
            favoriteIds: [],
          });
        } catch {
          return LaunchActions.loadFavoritesSuccess({
            favoriteIds: [],
          });
        }
      }),
    ),
  );

  readonly persistFavorites$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(LaunchActions.toggleFavorite),
        withLatestFrom(this.store.select(selectFavoriteIds)),
        tap(([, favoriteIds]) => {
          localStorage.setItem(
            this.favoritesStorageKey,
            JSON.stringify(favoriteIds),
          );
        }),
      ),
    { dispatch: false },
  );

  private getErrorMessage(error: unknown): string {
    return error instanceof Error
      ? error.message
      : 'Unable to load launch data';
  }
}
