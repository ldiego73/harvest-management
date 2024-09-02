import { BaseController, Controller, Get } from "@shared/interface";

import { FarmerListResponseDto } from "@modules/farmer/interfaces/dtos";
import { FindAllFarmerHandler } from "@modules/farmer/application";

import { Context } from "elysia";

@Controller("/farmers", "Farmers")
export class FindAllFarmerEndpoint extends BaseController {
  constructor(private readonly queryhandler: FindAllFarmerHandler) {
    super();
  }

  @Get({
    path: "/",
    description: "Find all farmers",
    response: FarmerListResponseDto,
  })
  async index(ctx: Context) {
    const farmersOrError = await this.queryhandler.handle();

    if (farmersOrError.isErr()) {
      return this.internalServerError(
        farmersOrError.error.code,
        farmersOrError.error.message,
      );
    }

    const farmers = farmersOrError.value;

    ctx.set.status = 200;
    ctx.set.headers["Content-Type"] = "application/json";

    return farmers.map((farmer) => ({
      id: farmer.id.toValue(),
      email: farmer.email.value,
      name: farmer.name,
      lastName: farmer.lastName,
      fields: farmer.fields.map((field) => ({
        id: field.id.toValue(),
        name: field.name,
        location: field.location,
      })),
    }));
  }
}
