import { Result, err, ok } from "@common/result";
import { QueryHandler, QueryHandlerException } from "@shared/application";
import { FarmerRepository } from "@modules/farmer/domain/repositories";
import { Farmer } from "@modules/farmer/domain/aggregates";
import { FarmerNotFoundException } from "../exceptions";
import { Query } from "@shared/application";

type Response = Result<FarmerNotFoundException | QueryHandlerException, Farmer>;

export interface FindByIdFarmer extends Query {
  id: string;
}

export class FindByIdFarmerHandler extends QueryHandler<
  FindByIdFarmer,
  Response
> {
  constructor(private readonly repository: FarmerRepository) {
    super();
  }

  async handle(query: FindByIdFarmer): Promise<Response> {
    try {
      const farmer = await this.repository.findById(query.id);

      if (farmer === null) {
        return err(new FarmerNotFoundException("FARMER_NOT_FOUND"));
      }

      return ok(farmer);
    } catch (error: any) {
      return err(QueryHandlerException.create(error.message));
    }
  }
}
