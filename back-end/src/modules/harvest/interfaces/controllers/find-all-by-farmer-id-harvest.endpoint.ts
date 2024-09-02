import { BaseController, Controller, Get } from "@shared/interface";

import { Context } from "elysia";

import { HarvestsListResponseDto } from "../dtos";
import { FindAllByFarmerIdQueryHandler } from "../../application";

type IndexRoute = {
  params: {
    farmerId: string;
  };
};

@Controller("/harvests", "Harvests")
export class FindAllByFarmerIdHarvestEndpoint extends BaseController {
  constructor(private readonly queryHandler: FindAllByFarmerIdQueryHandler) {
    super();
  }

  @Get({
    path: "/farmer/:farmerId",
    description: "Find all by farmer id",
    response: HarvestsListResponseDto,
  })
  async index(ctx: Context<IndexRoute>) {
    const { farmerId } = ctx.params;
    const resultOrError = await this.queryHandler.handle({
      id: farmerId as string,
    });

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
