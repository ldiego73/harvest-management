import { Logger } from "@common/logger";

export interface Query {}

export abstract class QueryHandler<T extends Query, R> {
  readonly logger = Logger.create(this.constructor.name);

  abstract handle(query: T): Promise<R> | R;
}
