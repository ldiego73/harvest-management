import { Result, err, ok } from "@common/result";
import { QueryHandler, QueryHandlerException } from "@shared/application";
import { VarietyRepository } from "@modules/fruit/domain/repositories";
import { Variety } from "@modules/fruit/domain/entities";

type Response = Result<QueryHandlerException, Variety[]>;

export interface FindAllByFruitIdVarietyQuery {
  id: string;
}

export class FindAllByFruitIdVarietyQueryHandler extends QueryHandler<
  FindAllByFruitIdVarietyQuery,
  Response
> {
  constructor(private readonly repository: VarietyRepository) {
    super();
  }

  async handle(query: FindAllByFruitIdVarietyQuery): Promise<Response> {
    try {
      const fruits = await this.repository.findAllByFruitId(query.id);

      return ok(fruits);
    } catch (error: any) {
      return err(QueryHandlerException.create(error.message));
    }
  }
}
