import { Result, err, ok } from "@common/result";
import { QueryHandler, QueryHandlerException } from "@shared/application";
import { HarvestRepository } from "@modules/harvest/domain/repositories";
import { Harvest } from "@modules/harvest/domain/aggregates";

type Response = Result<QueryHandlerException, Harvest[]>;

export interface FindAllByFarmerIdQuery {
  id: string;
}

export class FindAllByFarmerIdQueryHandler extends QueryHandler<
  FindAllByFarmerIdQuery,
  Response
> {
  constructor(private readonly repository: HarvestRepository) {
    super();
  }

  async handle(query: FindAllByFarmerIdQuery): Promise<Response> {
    try {
      const harvests = await this.repository.findAllByFarmerId(query.id);

      return ok(harvests);
    } catch (error: any) {
      return err(QueryHandlerException.create(error.message));
    }
  }
}
