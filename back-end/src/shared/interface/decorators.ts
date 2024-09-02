import "reflect-metadata";

export const CONTROLLER_METADATA_KEY = Symbol("controller");
export const ROUTE_METADATA_KEY = Symbol("route");

export type HttpMethod = "get" | "post" | "put" | "delete" | "patch";

export interface RouteConfig {
  path?: string;
  description?: string;
  body?: any;
  params?: any;
  query?: any;
  response?: any;
  detail?: {
    tags?: string[];
    [key: string]: any;
  };
}

export interface RouteDefinition extends RouteConfig {
  method: HttpMethod;
  methodName: string;
}

type HttpMethodDecorator = (config?: RouteConfig) => MethodDecorator;

const correctEmptyPath = (path: string): string => {
  if (path === "/") return "";
  if (path.startsWith(":")) return `/${path}`;
  if (path.startsWith("/") && path.length > 1) return path;

  return path;
};

export function Controller(prefix: string = "", tag: string): ClassDecorator {
  return (target: Function) => {
    Reflect.defineMetadata(CONTROLLER_METADATA_KEY, { prefix, tag }, target);
  };
}

function createRouteMethod(method: HttpMethod): HttpMethodDecorator {
  return (config: RouteConfig = {}): MethodDecorator => {
    return (
      target: Object,
      propertyKey: string | symbol,
      descriptor: PropertyDescriptor,
    ) => {
      if (!Reflect.hasMetadata(ROUTE_METADATA_KEY, target.constructor)) {
        Reflect.defineMetadata(ROUTE_METADATA_KEY, [], target.constructor);
      }

      const routes = Reflect.getMetadata(
        ROUTE_METADATA_KEY,
        target.constructor,
      ) as RouteDefinition[];

      routes.push({
        ...config,
        path: correctEmptyPath(config.path || ""),
        method,
        methodName: propertyKey.toString(),
      });

      Reflect.defineMetadata(ROUTE_METADATA_KEY, routes, target.constructor);
    };
  };
}

export const Get = createRouteMethod("get");
export const Post = createRouteMethod("post");
export const Put = createRouteMethod("put");
export const Delete = createRouteMethod("delete");
export const Patch = createRouteMethod("patch");
