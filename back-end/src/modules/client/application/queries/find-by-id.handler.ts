import {
  type Query,
  QueryHandler,
  QueryHandlerException,
} from "@shared/application";
import { type ClientRepository } from "@modules/client/domain/repositories";
import { Client } from "@modules/client/domain/aggregates";

import { Result, err, ok } from "@common/result";
import { ClientNotFoundException } from "../exceptions";

type Response = Result<ClientNotFoundException | QueryHandlerException, Client>;

export interface FindByIdQuery extends Query {
  id: string;
}

export class FindByIdQueryHandler extends QueryHandler<
  FindByIdQuery,
  Response
> {
  constructor(private readonly repository: ClientRepository) {
    super();
  }

  async handle(query: FindByIdQuery): Promise<Response> {
    try {
      const client = await this.repository.findById(query.id);

      if (client === null) {
        return err(new ClientNotFoundException("Client not found"));
      }

      return ok(client);
    } catch (error: any) {
      return err(QueryHandlerException.create(error.message));
    }
  }
}
