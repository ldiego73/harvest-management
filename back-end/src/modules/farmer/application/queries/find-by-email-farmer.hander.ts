import { Result, err, ok } from "@common/result";
import { QueryHandler, QueryHandlerException } from "@shared/application";
import { FarmerRepository } from "@modules/farmer/domain/repositories";
import { Farmer } from "@modules/farmer/domain/aggregates";
import { FarmerNotFoundException } from "../exceptions";

type Response = Result<FarmerNotFoundException | QueryHandlerException, Farmer>;

export interface FindByEmailFarmer {
  email: string;
}

export class FindByEmailFarmerHandler extends QueryHandler<
  FindByEmailFarmer,
  Response
> {
  constructor(private readonly repository: FarmerRepository) {
    super();
  }

  async handle(query: FindByEmailFarmer): Promise<Response> {
    try {
      const farmer = await this.repository.findByEmail(query.email);

      if (farmer === null) {
        return err(new FarmerNotFoundException("FARMER_NOT_FOUND"));
      }

      return ok(farmer);
    } catch (error: any) {
      return err(QueryHandlerException.create(error.message));
    }
  }
}
