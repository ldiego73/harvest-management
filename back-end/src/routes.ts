import { clientControllers } from "@modules/client";
import { fruitControllers } from "@modules/fruit";
import { harvestControllers } from "@modules/harvest";
import { farmerControllers } from "@modules/farmer";
import {
  CONTROLLER_METADATA_KEY,
  ROUTE_METADATA_KEY,
  RouteDefinition,
} from "@shared/interface";

import { Elysia } from "elysia";

const controllers = [
  ...clientControllers,
  ...harvestControllers,
  ...farmerControllers,
];

export function decoratorRoutes(app: Elysia) {
  controllers.forEach((controller) => {
    const instance = controller.constructor;
    const { prefix, tag } = Reflect.getMetadata(
      CONTROLLER_METADATA_KEY,
      instance,
    ) as { prefix: string; tag: string };
    const endpoints = Reflect.getMetadata(
      ROUTE_METADATA_KEY,
      instance,
    ) as Array<RouteDefinition>;

    endpoints.forEach((endpoint) => {
      const {
        method,
        methodName,
        path,
        body,
        params,
        query,
        response,
        description,
        detail,
      } = endpoint;
      const fullPath = `${prefix}${path}`;

      console.log(`Setting up route: ${method.toUpperCase()} ${fullPath}`);

      app.route(
        method,
        fullPath,
        (context: unknown) => {
          console.log(`Handler called for ${method.toUpperCase()} ${fullPath}`);
          // @ts-ignore
          const handler = controller[methodName];
          return handler.call(controller, context);
        },
        // @ts-ignore
        {
          body,
          params,
          query,
          response,
          detail: {
            description,
            tags: [tag, ...(detail?.tags || [])],
          },
        },
      );
    });
  });

  return app;
}
