import { Result, err, ok } from "@common/result";
import { QueryHandler, QueryHandlerException } from "@shared/application";
import { HarvestRepository } from "@modules/harvest/domain/repositories";
import { Harvest } from "@modules/harvest/domain/aggregates";

type Response = Result<QueryHandlerException, Harvest[]>;

export interface FindAllByFruitIdQuery {
  id: string;
}

export class FindAllByFruitIdQueryHandler extends QueryHandler<
  FindAllByFruitIdQuery,
  Response
> {
  constructor(private readonly repository: HarvestRepository) {
    super();
  }

  async handle(query: FindAllByFruitIdQuery): Promise<Response> {
    try {
      const harvests = await this.repository.findAllByFruitId(query.id);

      return ok(harvests);
    } catch (error: any) {
      return err(QueryHandlerException.create(error.message));
    }
  }
}
