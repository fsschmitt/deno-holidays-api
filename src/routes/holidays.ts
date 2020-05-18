import { ServerRequest } from "../deps.ts";
import { RouteHandler } from "./types.ts";
import { processHolidays, processHolidaysReport } from "../controller/holidays/process.ts";
import { HolidayRequestData } from "../controller/holidays/types.ts";

export const getHolidays: RouteHandler = {
  name: "Get Holidays",
  description: "Gets holidays for multiple countries, /holidays?year=X&countries=Y,Z",
  url: /\/holidays/,
  match(url: string) {
    return !!url.match(this.url);
  },
  async execute(req: ServerRequest) {
    await executeHolidaysRoute(req, processHolidays);
  },
};

export const getHolidaysReport: RouteHandler = {
  name: "Get Holidays Report",
  description: "Gets monthly holidays for multiple countries, /holidaysReport?year=X&countries=Y,Z",
  url: /\/holidaysReport/,
  match(url: string) {
    return !!url.match(this.url);
  },
  async execute(req: ServerRequest) {
    await executeHolidaysRoute(req, processHolidaysReport);
  },
};


const executeHolidaysRoute = async (req: ServerRequest, handler: any) => {
  const urlParams = new URLSearchParams(req.url);
    const year = Number.parseInt(urlParams.get('year') ||  new Date().getFullYear().toString(), 10);
    const countries = urlParams.get('countries');
    if (!year || !countries) {
      return req.respond({
        status: 400,
        body: "Missing year/countries parameter",
      });
    }

    try {
      const requestData: HolidayRequestData = { countries: countries.split(','), year: year };
      const holidaysResult = await handler(requestData);
      return req.respond({
        status: 200,
        body: JSON.stringify(holidaysResult),
      });
    } catch (e) {
      return req.respond({
        status: 400,
        body: e.toString(),
      });
    }
}