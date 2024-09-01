import { Result, err, ok } from "@common/result";
import { QueryHandler, QueryHandlerException } from "@shared/application";
import { HarvestRepository } from "@modules/harvest/domain/repositories";
import { Harvest } from "@modules/harvest/domain/aggregates";

import { HarvestNotFoundException } from "../exceptions";

type Response = Result<QueryHandlerException, Harvest>;

export interface FindByIdQuery {
  id: string;
}

export class FindByIdQueryHandler extends QueryHandler<
  FindByIdQuery,
  Response
> {
  constructor(private readonly repository: HarvestRepository) {
    super();
  }

  async handle(query: FindByIdQuery): Promise<Response> {
    try {
      const harvest = await this.repository.findById(query.id);

      if (!harvest) {
        return err(new HarvestNotFoundException("Harvest not found"));
      }

      return ok(harvest);
    } catch (error: any) {
      return err(QueryHandlerException.create(error.message));
    }
  }
}
