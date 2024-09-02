import { Result, err, ok } from "@common/result";
import {
  Query,
  QueryHandler,
  QueryHandlerException,
} from "@shared/application";
import { FieldRepository } from "@modules/farmer/domain/repositories";
import { Field } from "@modules/farmer/domain/entities";

type Response = Result<QueryHandlerException, Field[]>;

export interface FindAllField extends Query {}

export class FindAllFieldHandler extends QueryHandler<FindAllField, Response> {
  constructor(private readonly repository: FieldRepository) {
    super();
  }

  async handle(): Promise<Response> {
    try {
      const fields = await this.repository.findAll();

      return ok(fields);
    } catch (error: any) {
      return err(QueryHandlerException.create(error.message));
    }
  }
}
