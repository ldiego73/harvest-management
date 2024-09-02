import { Result, err, ok } from "@common/result";
import { QueryHandler, QueryHandlerException } from "@shared/application";
import { FieldRepository } from "@modules/farmer/domain/repositories";
import { Field } from "@modules/farmer/domain/entities";
import { Query } from "@shared/application";

type Response = Result<QueryHandlerException, Field[]>;

export interface FindAllByFamerIdFieldQuery extends Query {
  id: string;
}

export class FindAllByFamerIdFieldHandler extends QueryHandler<
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
