import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of, switchMap } from 'rxjs';

import { SpacexService } from '../services/spacex';
import * as LaunchActions from './launch.actions';

@Injectable()
export class LaunchEffects {
  private readonly actions$ = inject(Actions);
  private readonly spacexService = inject(SpacexService);

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

  private getErrorMessage(error: unknown): string {
    return error instanceof Error
      ? error.message
      : 'Unable to load launch data';
  }
}
