import { Result, err, ok } from "@common/result";
import { QueryHandler, QueryHandlerException } from "@shared/application";
import { HarvestRepository } from "@modules/harvest/domain/repositories";
import { Harvest } from "@modules/harvest/domain/aggregates";

type Response = Result<QueryHandlerException, Harvest[]>;

export interface FindAllByClientIdQuery {
  id: string;
}

export class FindAllByClientIdQueryHandler extends QueryHandler<
  FindAllByClientIdQuery,
  Response
> {
  constructor(private readonly repository: HarvestRepository) {
    super();
  }

  async handle(query: FindAllByClientIdQuery): Promise<Response> {
    try {
      const harvests = await this.repository.findAllByClientId(query.id);

      return ok(harvests);
    } catch (error: any) {
      return err(QueryHandlerException.create(error.message));
    }
  }
}
