import { Result, err, ok } from "@common/result";
import { QueryHandler, QueryHandlerException } from "@shared/application";
import { FieldRepository } from "@modules/farmer/domain/repositories";
import { Field } from "@modules/farmer/domain/entities";
import { FieldNotFoundException } from "../exceptions";
import { Query } from "@shared/application";

type Response = Result<FieldNotFoundException | QueryHandlerException, Field>;

export interface FindByNameAndLocationField extends Query {
  name: string;
  location: string;
}

export class FindByNameAndLocationFieldHandler extends QueryHandler<
  FindByNameAndLocationField,
  Response
> {
  constructor(private readonly repository: FieldRepository) {
    super();
  }

  async handle(query: FindByNameAndLocationField): Promise<Response> {
    try {
      const farmer = await this.repository.findByNameAndLocation(
        query.name,
        query.location,
      );

      if (farmer === null) {
        return err(new FieldNotFoundException("FIELD_NOT_FOUND"));
      }

      return ok(farmer);
    } catch (error: any) {
      return err(QueryHandlerException.create(error.message));
    }
  }
}
