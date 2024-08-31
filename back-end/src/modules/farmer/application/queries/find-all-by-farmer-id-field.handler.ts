import { Result, err, ok } from "@common/result";
import { QueryHandler, QueryHandlerException } from "@shared/application";
import { FieldRepository } from "@modules/farmer/domain/repositories";
import { Field } from "@modules/farmer/domain/entities";

type Response = Result<QueryHandlerException, Field[]>;

export interface FindAllByFamerIdFieldQuery {
  id: string;
}

export class FindAllByFamerIdFieldQueryHandler extends QueryHandler<
  FindAllByFamerIdFieldQuery,
  Response
> {
  constructor(private readonly repository: FieldRepository) {
    super();
  }

  async handle(query: FindAllByFamerIdFieldQuery): Promise<Response> {
    try {
      const fields = await this.repository.findAllByFarmerId(query.id);

      return ok(fields);
    } catch (error: any) {
      return err(QueryHandlerException.create(error.message));
    }
  }
}
