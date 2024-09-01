import { Result, err, ok } from "@common/result";
import { QueryHandler, QueryHandlerException } from "@shared/application";
import { HarvestRepository } from "@modules/harvest/domain/repositories";
import { Harvest } from "@modules/harvest/domain/aggregates";

type Response = Result<QueryHandlerException, Harvest[]>;

export interface FindAllByDatesQuery {
  startDate: Date;
  endDate: Date;
}

export class FindAllByDatesQueryHandler extends QueryHandler<
  FindAllByDatesQuery,
  Response
> {
  constructor(private readonly repository: HarvestRepository) {
    super();
  }

  async handle(query: FindAllByDatesQuery): Promise<Response> {
    try {
      const harvests = await this.repository.findByDates(
        query.startDate,
        query.endDate,
      );

      return ok(harvests);
    } catch (error: any) {
      return err(QueryHandlerException.create(error.message));
    }
  }
}
