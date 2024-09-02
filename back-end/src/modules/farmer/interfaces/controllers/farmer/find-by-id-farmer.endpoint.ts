import { BaseController, Controller, Get } from "@shared/interface";

import { Context } from "elysia";

import { FarmerResponseDto } from "@modules/farmer/interfaces/dtos";
import {
  FindByIdFarmerHandler,
  FarmerNotFoundException,
} from "@modules/farmer/application";

type IndexRoute = {
  params: {
    id: string;
  };
};

@Controller("/farmers", "Farmers")
export class FindByIdFarmerEndpoint extends BaseController {
  constructor(private readonly queryhandler: FindByIdFarmerHandler) {
    super();
  }

  @Get({
    path: "/:id",
    description: "Find by id",
    response: FarmerResponseDto,
  })
  async index(ctx: Context<IndexRoute>) {
    const farmerOrError = await this.queryhandler.handle({
      id: ctx.params.id as string,
    });

    if (farmerOrError.isErr()) {
      const error = farmerOrError.error;

      if (error instanceof FarmerNotFoundException) {
        return this.notFound(error.code, error.message);
      }

      return this.internalServerError(
        farmerOrError.error.code,
        farmerOrError.error.message,
      );
    }

    const farmer = farmerOrError.value;

    ctx.set.status = 200;
    ctx.set.headers["Content-Type"] = "application/json";

    return {
      id: farmer.id.toValue(),
      email: farmer.email.value,
      name: farmer.name,
      lastName: farmer.lastName,
      fields: farmer.fields.map((field) => ({
        id: field.id.toValue(),
        name: field.name,
        location: field.location,
      })),
    };
  }
}
