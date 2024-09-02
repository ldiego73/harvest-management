import { Logger } from "@common/logger";

import { Elysia } from "elysia";

type LoggerMiddlewareOptions = {
  app: Elysia;
  name: string;
};

export function loggerMiddleware(options: LoggerMiddlewareOptions) {
  const logger = Logger.create(options.name);

  options.app
    .onRequest(({ request }) => {
      logger.info(`Request: ${request.method} ${request.url}`);
    })
    .onAfterHandle(({ request }) => {
      logger.info(
        `Handle: ${request.method} ${request.url} in ${performance.now()}ms`,
      );
    })
    .onAfterResponse(({ request }) => {
      logger.info(
        `Response: ${request.method} ${request.url} in ${performance.now()}ms`,
      );
    })
    .onError(({ error }) => {
      logger.error(`Error: ${error.message}`);
    });
}
