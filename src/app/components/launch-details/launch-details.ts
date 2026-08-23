import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';

import * as LaunchActions from '../../state/launch.actions';
import {
  selectIsLoading,
  selectLaunchError,
  selectSelectedLaunch,
} from '../../state/launch.selectors';

@Component({
  selector: 'app-launch-details',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
  ],
  templateUrl: './launch-details.html',
  styleUrl: './launch-details.scss',
})
export class LaunchDetailsComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly store = inject(Store);

  readonly launch$ = this.store.select(selectSelectedLaunch);
  readonly loading$ = this.store.select(selectIsLoading);
  readonly error$ = this.store.select(selectLaunchError);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.store.dispatch(LaunchActions.loadLaunchDetails({ id }));
    }
  }
}
