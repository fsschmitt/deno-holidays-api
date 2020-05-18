import { serve, Server, ServerRequest } from "./deps.ts";
import { RouteHandler } from "./routes/types.ts";
import * as IndexRoutes from "./routes/index.ts";
import * as HolidaysRoutes from "./routes/holidays.ts";
import config from "./config.ts";

const s: Server = serve({ port: config.server.port })
console.log(`Running on port ${config.server.port}`);

for await (const req: ServerRequest of s) {
  let routes: RouteHandler[] = [
    HolidaysRoutes.getHolidaysReport,
    HolidaysRoutes.getHolidays,
  ]
  routes.unshift(IndexRoutes.allRoutes(routes))
  
  const match = routes.find((route) => route.match(req.url));
  if (match) {
    console.log(`Matched route: ${req.url}`);
    try {
      await match.execute(req);
    }
    catch (e) {
      console.error("Error", e);
      req.respond({ status: 500 });
    }
  }
  else {
    req.respond({ status: 200 });
  }
}