export class Container {
  private static instance: Container;
  private dependencies: Map<string, any> = new Map();

  private constructor() {}

  static getInstance(): Container {
    if (!Container.instance) {
      Container.instance = new Container();
    }
    return Container.instance;
  }

  register<T>(token: string, dependency: T): void {
    this.dependencies.set(token, dependency);
    console.log(`Registered dependency: ${token}`); // Logging for debugging
  }

  resolve<T>(token: string): T {
    const dependency = this.dependencies.get(token);
    if (!dependency) {
      throw new Error(`Dependency ${token} not found`);
    }
    console.log(`Resolved dependency: ${token}`); // Logging for debugging
    return dependency;
  }
}
