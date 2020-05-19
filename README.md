# deno-holidays-api
Small implementation of an API providing National Holidays across multiple countries built with [Deno](https://deno.land).

Deno is a simple, modern and secure runtime for JavaScript and TypeScript that uses V8 and is built in Rust.

## Development

Take advantage of VSCode `.devcontainer` to enable a quick development environment with `Deno` installed and ready to roll.

```bash
deno run --allow-read --allow-env --allow-net src/index.ts
```

It sources environment variables from `.env`, which include:
- SERVER_PORT
- EXTERNAL_HOLIDAYS_API

## Endpoints Implemented

```
/
```

> List of all endpoints available.

```
/holidays?year=2020&countries=PT,DE
```
> Provides a list of all holidays for the year 2020 in Portugal (PT) and Germany (DE).

```
/holidaysReport?year=2020&countries=PT,DE
```
> Provides a list of all holidays **in the upcoming 4 weeks** for the year 2020 in Portugal (PT) and Germany (DE).


## Further development

Explore Deno's capabilities regarding:

[] Unit Tests
[] Mocks
[] Drun module (Deno Runner for development)
[] Oak (Node's Koa-inspired middleware framework for web server)