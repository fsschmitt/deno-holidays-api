export interface HolidaysAPI {
  endpoint: string;
  apiKey?: string;
}

export interface HolidaysRequest {
  country: string;
  year: number;
}

export interface HolidaysResponse {
  holidays: Holiday[];
  status: Status;
}

export interface Holiday {
  date: string;
  localName: string;
  name: string;
  countryCode: string;
  fixed: boolean;
  global: boolean;
  counties: string[];
  launchYear: number;
  type: string;
}

export enum Status {
  OK,
  ERROR
}