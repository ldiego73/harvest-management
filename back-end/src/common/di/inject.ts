import "reflect-metadata";

import { Container } from "./container";

const container = Container.getInstance();

export function Inject(token: string): ParameterDecorator {
  return (
    target: Object,
    propertyKey: string | symbol | undefined,
    parameterIndex: number,
  ) => {
    const existingInjections = Reflect.getMetadata("injections", target) || [];
    existingInjections[parameterIndex] = token;
    Reflect.defineMetadata("injections", existingInjections, target);
    console.log(`Inject decorator applied for ${token}`); // Logging for debugging
  };
}

export function Injectable(name?: string): ClassDecorator {
  return (target: any) => {
    const targetName = name || target.name;
    const tokens = Reflect.getMetadata("design:paramtypes", target) || [];
    const injections = Reflect.getMetadata("injections", target) || [];

    console.log("tokens", tokens);

    console.log(`Injectable decorator applied to "${targetName}"`); // Logging for debugging
    console.log(`Injections:`, injections);

    const resolvedDependencies = tokens.map((token: any, index: number) => {
      const injectionToken = injections[index] || token.name;
      console.log(
        `Resolving dependency: ${injectionToken} for "${targetName}"`,
      ); // Logging for debugging
      return container.resolve(injectionToken);
    });

    console.log("resolvedDependencies", resolvedDependencies);

    const instance = new target(...resolvedDependencies);
    console.log(`Registering "${targetName}" with container`); // Logging for debugging
    container.register(targetName, instance);
  };
}
