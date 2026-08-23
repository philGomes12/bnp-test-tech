export interface Launch {
  id: string;
  flightNumber: number;
  name: string;
  dateLocal: string;
  success: boolean | null;
  details: string | null;
  patchUrl: string | null;
}

export interface SpaceXLaunchDto {
  flight_number: number;
  mission_name: string;
  launch_date_local: string;
  launch_success: boolean | null;
  details: string | null;
  links: {
    mission_patch_small: string | null;
  };
}
