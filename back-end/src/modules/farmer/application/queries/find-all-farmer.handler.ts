import { Result, err, ok } from "@common/result";
import { QueryHandler, QueryHandlerException } from "@shared/application";
import { FarmerRepository } from "@modules/farmer/domain/repositories";
import { Farmer } from "@modules/farmer/domain/aggregates";

type Response = Result<QueryHandlerException, Farmer[]>;

export interface FindAllFarmer {}

export class FindAllFarmerHandler extends QueryHandler<
  FindAllFarmer,
  Response
> {
  constructor(private readonly repository: FarmerRepository) {
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
