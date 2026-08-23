import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { firstValueFrom } from 'rxjs';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { Launch } from '../../models/launch.model';
import * as LaunchActions from '../../state/launch.actions';
import { initialState } from '../../state/launch.reducer';
import { LaunchesListComponent } from './launches-list';

describe('LaunchesListComponent', () => {
  let component: LaunchesListComponent;
  let fixture: ComponentFixture<LaunchesListComponent>;
  let store: MockStore;

  const launches: Launch[] = [
    {
      id: '11',
      flightNumber: 11,
      name: 'FalconSat',
      dateLocal: '2006-03-24T22:30:00+12:00',
      success: false,
      details: null,
      patchUrl: null,
    },
    {
      id: '12',
      flightNumber: 12,
      name: 'DemoSat',
      dateLocal: '2007-03-21T01:10:00+12:00',
      success: false,
      details: null,
      patchUrl: null,
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LaunchesListComponent],
      providers: [
        provideRouter([]),
        provideMockStore({
          initialState: {
            launch: {
              ...initialState,
              launches,
            },
          },
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LaunchesListComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch loadLaunches on init', () => {
    const dispatchSpy = vi.spyOn(store, 'dispatch');

    fixture.detectChanges();

    expect(dispatchSpy).toHaveBeenCalledWith(LaunchActions.loadLaunches());
  });

  it('should dispatch toggleFavorite with the launch id', () => {
    const dispatchSpy = vi.spyOn(store, 'dispatch');

    component.toggleFavorite('11');

    expect(dispatchSpy).toHaveBeenCalledWith(
      LaunchActions.toggleFavorite({
        id: '11',
      }),
    );
  });

  it('should filter launches by mission name', async () => {
    component.onSearchChange('falcon');

    const filteredLaunches = await firstValueFrom(component.filteredLaunches$);

    expect(filteredLaunches).toHaveLength(1);
    expect(filteredLaunches[0].name).toBe('FalconSat');
  });
});
