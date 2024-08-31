export abstract class Application {
  abstract start(): Promise<void> | void;
  abstract stop(): Promise<void> | void;
}
