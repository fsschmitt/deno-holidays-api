import { ServerRequest } from "../deps.ts";
import { RouteHandler } from "./types.ts";

export const allRoutes = (routes: RouteHandler[]): RouteHandler => ({
  name: "Index",
  description: "Lists all available routes",
  url: "/",
  match(url: string) {
    return url === this.url;
  },
  async execute(req: ServerRequest) {
    req.respond({
      status: 200,
      body: JSON.stringify({
        routes: routes.map((r) => ({
          name: r.name,
          description: r.description,
        })),
      }),
    });
  },
});