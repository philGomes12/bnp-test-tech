import { TestBed } from '@angular/core/testing';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { beforeEach, describe, expect, it } from 'vitest';

import { SpaceXLaunchDto } from '../models/launch.model';
import { SpacexService } from './spacex';

describe('SpacexService', () => {
  let service: SpacexService;
  let httpTestingController: HttpTestingController;

  const launchDto: SpaceXLaunchDto = {
    flight_number: 11,
    mission_name: 'FalconSat',
    launch_date_local: '2006-03-25T10:30:00+12:00',
    launch_success: false,
    details: 'Engine failure at 33 seconds and loss of vehicle.',
    links: {
      mission_patch_small: 'https://example.com/falconsat.png',
    },
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SpacexService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });

    service = TestBed.inject(SpacexService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load and map past launches', () => {
    service.getPastLaunches().subscribe((launches) => {
      expect(launches).toHaveLength(1);

      expect(launches[0]).toEqual({
        id: '11',
        flightNumber: 11,
        name: 'FalconSat',
        dateLocal: '2006-03-25T10:30:00+12:00',
        success: false,
        details: 'Engine failure at 33 seconds and loss of vehicle.',
        patchUrl: 'https://example.com/falconsat.png',
      });
    });

    const request = httpTestingController.expectOne('launches.json');

    expect(request.request.method).toBe('GET');

    request.flush([launchDto]);

    httpTestingController.verify();
  });

  it('should return a launch by id', () => {
    service.getLaunchById('11').subscribe((launch) => {
      expect(launch).toBeDefined();
      expect(launch?.id).toBe('11');
      expect(launch?.name).toBe('FalconSat');
    });

    const request = httpTestingController.expectOne('launches.json');

    request.flush([launchDto]);

    httpTestingController.verify();
  });

  it('should return undefined when launch id does not exist', () => {
    service.getLaunchById('999').subscribe((launch) => {
      expect(launch).toBeUndefined();
    });

    const request = httpTestingController.expectOne('launches.json');

    request.flush([launchDto]);

    httpTestingController.verify();
  });
});
