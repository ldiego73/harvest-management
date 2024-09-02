import { bearer } from "@elysiajs/bearer";
import { cors } from "@elysiajs/cors";
import { swagger } from "@elysiajs/swagger";
import { opentelemetry } from "@elysiajs/opentelemetry";

import { BatchSpanProcessor } from "@opentelemetry/sdk-trace-node";
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-proto";

import { Application } from "@shared/interface/application";
import { loggerMiddleware, exceptionMiddleware } from "@middlewares/index";

import { Elysia } from "elysia";
import { compression } from "elysia-compression";
import { helmet } from "elysia-helmet";
import { rateLimit } from "elysia-rate-limit";

import { decoratorRoutes } from "./routes";

export class Microservice implements Application {
  protected app: Elysia | undefined;

  private loadPlugins(app: Elysia) {
    const duration = 60000;

    app
      .use(cors())
      .use(
        helmet({
          contentSecurityPolicy: {
            directives: {
              "default-src": ["'self'"],
              "script-src": [
                "'self'",
                "'unsafe-inline'",
                "https://cdn.jsdelivr.net",
              ],
              "style-src": ["'self'", "'unsafe-inline'"],
              "img-src": ["'self'"],
              "font-src": ["'self'", "https://fonts.scalar.com"],
              "connect-src": ["'self'"],
            },
          },
        }),
      )
      .use(compression())
      .use(bearer())
      .use(
        rateLimit({
          duration,
          max: 1000,
          errorResponse: new Response("rate-limited", {
            status: 429,
            headers: new Headers({
              "Retry-After": `${Math.ceil(duration / 1000)}`,
            }),
          }),
        }),
      )
      .use(
        swagger({
          path: "/docs",
          documentation: {
            info: {
              title: "Back-End Task",
              version: "1.0.0",
            },
            tags: [
              {
                name: "Fruits",
                description: "API for the task of Fruits",
              },
              {
                name: "Harvests",
                description: "API for the task of Harvests",
              },
              {
                name: "Farmers",
                description: "API for the task of Farmers",
              },
              {
                name: "Clients",
                description: "API for the task of Clients",
              },
            ],
          },
        }),
      )
      .use(
        opentelemetry({
          spanProcessors: [new BatchSpanProcessor(new OTLPTraceExporter({}))],
        }),
      );
  }

  private loadMiddlewares(app: Elysia) {
    exceptionMiddleware(app);
    loggerMiddleware({ app, name: "microservice" });
  }

  private loadRoutes(app: Elysia) {
    app.use(decoratorRoutes);
  }

  start() {
    const port = process.env.PORT || 3000;

    this.app = new Elysia();

    this.loadPlugins(this.app);
    this.loadMiddlewares(this.app);
    this.loadRoutes(this.app);

    this.app.listen(port, (server) => {
      console.log(`🦊 Elysia is running at ${server.hostname}:${server.port}`);
    });
  }

  stop() {
    this.app?.stop();
  }
}
