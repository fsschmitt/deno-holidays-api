import { HolidayRequestData } from "./types.ts";
import { Holiday } from "../../domain/holidays/types.ts";
import { sortHolidays, isNext4Weeks } from "../../domain/holidays/holidays.ts";
import { Status } from "../../infrastructure/holidays/types.ts";
import { getHolidays } from "../../infrastructure/holidays/api.ts"

export const processHolidays = async (request: HolidayRequestData): Promise<Holiday[]>  => {
  const holidayList = await fetchHolidays(request);

  return holidayList.sort(sortHolidays);
}

export const processHolidaysReport = async (request: HolidayRequestData): Promise<Holiday[]> => {
  const holidays = await fetchHolidays(request);
  let holidaysList = holidays.filter(holiday => isNext4Weeks(holiday)).sort(sortHolidays);

  let holidayReport: any = {};
  holidaysList.forEach(holiday => {
    if (holidayReport[holiday.date]) {
      holidayReport[holiday.date].push(holiday);
      return;
    }
    holidayReport[holiday.date] = [holiday];
  });

  return holidayReport;
}

const fetchHolidays = async ({ countries, year }: HolidayRequestData): Promise<Holiday[]> => {
  const holidayList: Holiday[] = new Array();
  for (let index = 0; index < countries.length; index++) {
    const res = await getHolidays({
      country: countries[index],
      year,
    });

    if (res.status === Status.ERROR) {
      continue;
    }
    holidayList.push(...res.holidays);
  }
  return holidayList;
}