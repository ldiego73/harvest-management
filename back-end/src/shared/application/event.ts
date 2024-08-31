import { Logger } from "@common/logger";

export interface Event {}

export abstract class EventHandler<T extends Event> {
  readonly logger = Logger.create(this.constructor.name);

  abstract handle(event: T): Promise<void> | void;
}
