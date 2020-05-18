import config from "../../config.ts";
import { HolidaysAPI, HolidaysRequest, HolidaysResponse, Status } from "./types.ts";

const api: HolidaysAPI = {
  endpoint: config.external.holidaysAPI
}

export const getHolidays = async (request: HolidaysRequest): Promise<HolidaysResponse> => {
  if (request.country.length == 0) {
    return {
      holidays: [],
      status: Status.ERROR,
    };
  }

  try {
    const response = await fetch(
      `${api.endpoint}/${request.year}/${request.country}`,
      {
        method: "GET",
      }
    ).then((res) => {
      if (res.status === 200) {
        return res.json();
      }

      console.error(res.json())
      throw res;
    });
    
    return {
      holidays: response,
      status: Status.OK,
    }
  } catch(e) {
    console.error(`Error fetching holidays for country ${request.country}.`, e);
    return {
      holidays: [],
      status: Status.ERROR,
    };
  }
}