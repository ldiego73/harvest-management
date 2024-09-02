import { BaseController, Controller, Get } from "@shared/interface";

import { FindAllByFamerIdFieldQueryHandler } from "@modules/farmer/application";
import { FieldListResponseDto } from "@modules/farmer/interfaces/dtos";

import { Context } from "elysia";

type IndexRoute = {
  params: {
    farmerId: string;
  };
};

@Controller("/fields", "Fields")
export class FindAllByFarmerIdFieldEndpoint extends BaseController {
  constructor(
    private readonly queryhandler: FindAllByFamerIdFieldQueryHandler,
  ) {
    super();
  }

  @Get({
    path: "/farmer/:farmerId",
    description: "Find all by farmer id",
    response: FieldListResponseDto,
  })
  async index(ctx: Context<IndexRoute>) {
    const resultOrError = await this.queryhandler.handle({
      id: ctx.params.farmerId as string,
    });

    if (resultOrError.isErr()) {
      return this.internalServerError(
        resultOrError.error.code,
        resultOrError.error.message,
      );
    }

    ctx.set.status = 200;
    ctx.set.headers["Content-Type"] = "application/json";

    return resultOrError.value.map((field) => ({
      id: field.id.toValue(),
      name: field.name,
      location: field.location,
    }));
  }
}
