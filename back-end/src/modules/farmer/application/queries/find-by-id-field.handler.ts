import { Result, err, ok } from "@common/result";
import { QueryHandler, QueryHandlerException } from "@shared/application";
import { FieldRepository } from "@modules/farmer/domain/repositories";
import { Field } from "@modules/farmer/domain/entities";
import { FieldNotFoundException } from "../exceptions";

type Response = Result<FieldNotFoundException | QueryHandlerException, Field>;

export interface FindByIdField {
  id: string;
}

export class FindByIdFieldHandler extends QueryHandler<
  FindByIdField,
  Response
> {
  constructor(private readonly repository: FieldRepository) {
    super();
  }

  async handle(query: FindByIdField): Promise<Response> {
    try {
      const farmer = await this.repository.findById(query.id);

      if (farmer === null) {
        return err(new FieldNotFoundException("FIELD_NOT_FOUND"));
      }

      return ok(farmer);
    } catch (error: any) {
      return err(QueryHandlerException.create(error.message));
    }
  }
}
