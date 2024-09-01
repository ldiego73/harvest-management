import { Result, err, ok } from "@common/result";
import { QueryHandler, QueryHandlerException } from "@shared/application";
import { FruitRepository } from "@modules/fruit/domain/repositories";
import { Fruit } from "@modules/fruit/domain/aggregates";

type Response = Result<QueryHandlerException, Fruit[]>;

export interface FindAllFruitQuery {}

export class FindAllFruitQueryHandler extends QueryHandler<
  FindAllFruitQuery,
  Response
> {
  constructor(private readonly repository: FruitRepository) {
    super();
  }

  async handle(): Promise<Response> {
    try {
      const fruits = await this.repository.findAll();

      return ok(fruits);
    } catch (error: any) {
      return err(QueryHandlerException.create(error.message));
    }
  }
}
