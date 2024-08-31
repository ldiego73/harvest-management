import { Logger } from "@common/logger";

export interface Command {}

export abstract class CommandHandler<T extends Command, R> {
  readonly logger = Logger.create(this.constructor.name);

  abstract handle(command: T): Promise<R> | R;
}
