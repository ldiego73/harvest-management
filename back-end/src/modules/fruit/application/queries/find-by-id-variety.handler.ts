import { Result, err, ok } from "@common/result";
import { QueryHandler, QueryHandlerException } from "@shared/application";
import { VarietyRepository } from "@modules/fruit/domain/repositories";
import { Variety } from "@modules/fruit/domain/entities";

import { VarietyNotFoundException } from "../exceptions";

type Response = Result<QueryHandlerException, Variety>;

export interface FindByIdVarietyQuery {
  id: string;
}

export class FindByIdVarietyQueryHandler extends QueryHandler<
  FindByIdVarietyQuery,
  Response
> {
  constructor(private readonly repository: VarietyRepository) {
    super();
  }

  async handle(query: FindByIdVarietyQuery): Promise<Response> {
    try {
      const variety = await this.repository.findById(query.id);

      if (variety === null) {
        return err(new VarietyNotFoundException("Variety not found"));
      }

      return ok(variety);
    } catch (error: any) {
      return err(QueryHandlerException.create(error.message));
    }
  }
}
