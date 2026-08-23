import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

import { Launch, SpaceXLaunchDto } from '../models/launch.model';

@Injectable({
  providedIn: 'root',
})
export class SpacexService {
  private readonly http = inject(HttpClient);
  private readonly localUrl = 'launches.json';

  getPastLaunches(): Observable<Launch[]> {
    return this.http
      .get<SpaceXLaunchDto[]>(this.localUrl)
      .pipe(
        map((launches) => launches.map((launch) => this.mapLaunch(launch))),
      );
  }

  getLaunchById(id: string): Observable<Launch | undefined> {
    return this.getPastLaunches().pipe(
      map((launches) => launches.find((launch) => launch.id === id)),
    );
  }

  private mapLaunch(launch: SpaceXLaunchDto): Launch {
    return {
      id: launch.flight_number.toString(),
      flightNumber: launch.flight_number,
      name: launch.mission_name,
      dateLocal: launch.launch_date_local,
      success: launch.launch_success,
      details: launch.details,
      patchUrl: launch.links.mission_patch_small,
    };
  }
}
