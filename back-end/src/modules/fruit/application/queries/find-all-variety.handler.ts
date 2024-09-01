import { Result, err, ok } from "@common/result";
import { QueryHandler, QueryHandlerException } from "@shared/application";
import { VarietyRepository } from "@modules/fruit/domain/repositories";
import { Variety } from "@modules/fruit/domain/entities";

type Response = Result<QueryHandlerException, Variety[]>;

export interface FindAllVarietyQuery {}

export class FindAllVarietyQueryHandler extends QueryHandler<
  FindAllVarietyQuery,
  Response
> {
  constructor(private readonly repository: VarietyRepository) {
    super();
  }

  async handle(): Promise<Response> {
    try {
      const varieties = await this.repository.findAll();

      return ok(varieties);
    } catch (error: any) {
      return err(QueryHandlerException.create(error.message));
    }
  }
}
