import { HttpStatus } from "@common/http-status";
import { HttpResponseException } from "@common/http.exception";
import { Elysia, t } from "elysia";

export function exceptionMiddleware(app: Elysia) {
  app.onError(({ error, set }) => {
    set.headers["content-type"] = "application/json";

    if (error instanceof HttpResponseException) {
      return {
        status: error.status,
        code: error.code,
        message: error.message,
        timestamp: error.timestamp,
      };
    }

    if (error.constructor.name === "T") {
      return {
        status: 400,
        code: "INTERNAL_SERVER_ERROR",
        message: JSON.parse(error.message),
        timestamp: new Date().toISOString(),
      };
    }

    const errorCode = (error as any).code as keyof typeof HttpStatus;

    if (!!errorCode) {
      return {
        status: HttpStatus[errorCode],
        code: HttpStatus[HttpStatus[errorCode]],
        timestamp: new Date().toISOString(),
      };
    }

    return {
      status: 500,
      code: "INTERNAL_SERVER_ERROR",
      message: error.message,
      timestamp: new Date().toISOString(),
    };
  });
}
