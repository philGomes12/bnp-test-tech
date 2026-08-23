import { ApplicationConfig } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';

import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import { environment } from '../environments/environment';
import { routes } from './app.routes';
import { LaunchEffects } from './state/launch.effects';
import { launchReducer } from './state/launch.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),

    provideHttpClient(),

    provideStore({
      launch: launchReducer,
    }),

    provideEffects([LaunchEffects]),

    provideStoreDevtools({
      maxAge: 25,
      logOnly: environment.production,
    }),
  ],
};
