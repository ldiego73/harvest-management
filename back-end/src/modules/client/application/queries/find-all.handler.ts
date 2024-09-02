import {
  type Query,
  QueryHandler,
  QueryHandlerException,
} from "@shared/application";
import { type ClientRepository } from "@modules/client/domain/repositories";
import { Client } from "@modules/client/domain/aggregates";

import { Result, err, ok } from "@common/result";

type Response = Result<QueryHandlerException, Client[]>;

export interface FindAllQuery extends Query {}

export class FindAllQueryHandler extends QueryHandler<FindAllQuery, Response> {
  constructor(private readonly repository: ClientRepository) {
    super();
  }

  async handle(): Promise<Response> {
    try {
      return ok(await this.repository.findAll());
    } catch (error: any) {
      return err(QueryHandlerException.create(error.message));
    }
  }
}
