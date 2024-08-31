import { Logger } from "@common/logger";

import { Elysia } from "elysia";

type LoggerMiddlewareOptions = {
  name: string;
};

export function loggerMiddleware(options: LoggerMiddlewareOptions) {
  const logger = Logger.create(options.name);

  return new Elysia()
    .onRequest(({ request }) => {
      logger.info(`Request: ${request.method} ${request.url}`);
    })
    .onAfterResponse(({ request, response }) => {
      logger.info(
        `Response: ${request.method} ${request.url} in ${performance.now()}ms`,
      );
    })
    .onError(({ error }) => {
      logger.error(`Error: ${error.message}`);
    });
}
