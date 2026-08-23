import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import * as LaunchActions from '../../state/launch.actions';
import { initialState } from '../../state/launch.reducer';
import { LaunchDetailsComponent } from './launch-details';

describe('LaunchDetailsComponent', () => {
  let component: LaunchDetailsComponent;
  let fixture: ComponentFixture<LaunchDetailsComponent>;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LaunchDetailsComponent],
      providers: [
        provideMockStore({
          initialState: {
            launch: initialState,
          },
        }),
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: (key: string): string | null =>
                  key === 'id' ? '11' : null,
              },
            },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LaunchDetailsComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch loadLaunchDetails with the route id on init', () => {
    const dispatchSpy = vi.spyOn(store, 'dispatch');

    fixture.detectChanges();

    expect(dispatchSpy).toHaveBeenCalledWith(
      LaunchActions.loadLaunchDetails({
        id: '11',
      }),
    );
  });

  it('should dispatch toggleFavorite with the launch id', () => {
    const dispatchSpy = vi.spyOn(store, 'dispatch');

    fixture.detectChanges();

    component.toggleFavorite();

    expect(dispatchSpy).toHaveBeenCalledWith(
      LaunchActions.toggleFavorite({
        id: '11',
      }),
    );
  });
});
