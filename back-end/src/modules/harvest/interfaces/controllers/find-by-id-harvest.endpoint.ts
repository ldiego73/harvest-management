import { BaseController, Controller, Get } from "@shared/interface";

import { Context } from "elysia";

import { HarvestResponseDto } from "../dtos";
import { FindByIdQueryHandler } from "../../application";

type IndexRoute = {
  params: {
    id: string;
  };
};

@Controller("/harvests", "Harvests")
export class FindByIdHarvestEndpoint extends BaseController {
  constructor(private readonly queryHandler: FindByIdQueryHandler) {
    super();
  }

  @Get({
    path: "/:id",
    description: "Find by id",
    response: HarvestResponseDto,
  })
  async index(ctx: Context<IndexRoute>) {
    const { id } = ctx.params;
    const resultOrError = await this.queryHandler.handle({
      id: id as string,
    });

    if (resultOrError.isErr()) {
      return this.internalServerError(
        resultOrError.error.code,
        resultOrError.error.message,
      );
    }

    ctx.set.status = 200;
    ctx.set.headers["Content-Type"] = "application/json";

    const harvest = resultOrError.value;

    return {
      fruitId: harvest.fruitId.toValue(),
      varietyId: harvest.varietyId.toValue(),
      farmerId: harvest.farmerId.toValue(),
      fieldId: harvest.fieldId.toValue(),
      clientId: harvest.clientId.toValue(),
      quantity: harvest.quantity,
      date: harvest.date.toISOString(),
    };
  }
}
