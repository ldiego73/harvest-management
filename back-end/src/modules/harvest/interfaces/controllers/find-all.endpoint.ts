import { BaseController, Controller, Get } from "@shared/interface";

import { Context } from "elysia";

import { FindAllQueryHandler } from "../../application";

@Controller("/harvests", "Harvests")
export class FindAllHarvestEndpoint extends BaseController {
  constructor(private readonly queryHandler: FindAllQueryHandler) {
    super();
  }

  @Get({ path: "/", description: "Find all" })
  async index(ctx: Context) {
    const resultOrError = await this.queryHandler.handle();

    if (resultOrError.isErr()) {
      return this.internalServerError(
        resultOrError.error.code,
        resultOrError.error.message,
      );
    }

    ctx.set.status = 200;
    ctx.set.headers["Content-Type"] = "application/json";

    return resultOrError.value.map((harvest) => ({
      fruitId: harvest.fruitId.toValue(),
      varietyId: harvest.varietyId.toValue(),
      farmerId: harvest.farmerId.toValue(),
      fieldId: harvest.fieldId.toValue(),
      clientId: harvest.clientId.toValue(),
      quantity: harvest.quantity,
      date: harvest.date.toISOString(),
    }));
  }
}
