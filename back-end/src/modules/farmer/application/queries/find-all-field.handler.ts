import { Result, err, ok } from "@common/result";
import { QueryHandler, QueryHandlerException } from "@shared/application";
import { FieldRepository } from "@modules/farmer/domain/repositories";
import { Field } from "@modules/farmer/domain/entities";

type Response = Result<QueryHandlerException, Field[]>;

export interface FiendAllField {}

export class FiendAllFieldHandler extends QueryHandler<
  FiendAllField,
  Response
> {
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
