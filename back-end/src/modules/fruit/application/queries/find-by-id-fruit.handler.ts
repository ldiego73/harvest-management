import { Result, err, ok } from "@common/result";
import { QueryHandler, QueryHandlerException } from "@shared/application";
import { FruitRepository } from "@modules/fruit/domain/repositories";
import { Fruit } from "@modules/fruit/domain/aggregates";
import { FruitNotFoundException } from "../exceptions";

type Response = Result<FruitNotFoundException | QueryHandlerException, Fruit>;

export interface FindByIdFruitQuery {
  id: string;
}

export class FindByIdFruitQueryHandler extends QueryHandler<
  FindByIdFruitQuery,
  Response
> {
  constructor(private readonly repository: FruitRepository) {
    super();
  }

  async handle(query: FindByIdFruitQuery): Promise<Response> {
    try {
      const fruit = await this.repository.findById(query.id);

      if (fruit === null) {
        return err(new FruitNotFoundException("Fruit not found"));
      }

      return ok(fruit);
    } catch (error: any) {
      return err(QueryHandlerException.create(error.message));
    }
  }
}
