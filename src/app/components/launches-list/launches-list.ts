import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { BehaviorSubject, combineLatest, map } from 'rxjs';

import * as LaunchActions from '../../state/launch.actions';
import {
  selectAllLaunches,
  selectIsLoading,
} from '../../state/launch.selectors';

@Component({
  selector: 'app-launches-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatChipsModule,
    MatButtonModule,
  ],
  templateUrl: './launches-list.html',
  styleUrl: './launches-list.scss',
})
export class LaunchesListComponent implements OnInit {
  private readonly store = inject(Store);
  private readonly searchTermSubject = new BehaviorSubject<string>('');

  private readonly launches$ = this.store.select(selectAllLaunches);

  readonly loading$ = this.store.select(selectIsLoading);

  readonly filteredLaunches$ = combineLatest([
    this.launches$,
    this.searchTermSubject,
  ]).pipe(
    map(([launches, searchTerm]) => {
      const normalizedSearchTerm = searchTerm.trim().toLowerCase();

      if (!normalizedSearchTerm) {
        return launches;
      }

      return launches.filter((launch) =>
        launch.name.toLowerCase().includes(normalizedSearchTerm),
      );
    }),
  );

  searchTerm = '';

  ngOnInit(): void {
    this.store.dispatch(LaunchActions.loadLaunches());
  }

  onSearchChange(searchTerm: string): void {
    this.searchTermSubject.next(searchTerm);
  }
}
