import { BaseController, Controller, Get } from "@shared/interface";

import { Context } from "elysia";

import { HarvestsListResponseDto } from "../dtos";
import { FindAllByFruitIdQueryHandler } from "../../application";

type IndexRoute = {
  params: {
    fruitId: string;
  };
};

@Controller("/harvests", "Harvests")
export class FindAllByFruitIdHarvestEndpoint extends BaseController {
  constructor(private readonly queryHandler: FindAllByFruitIdQueryHandler) {
    super();
  }

  @Get({
    path: "/fruit/:fruitId",
    description: "Find all by fruit id",
    response: HarvestsListResponseDto,
  })
  async index(ctx: Context<IndexRoute>) {
    const { fruitId } = ctx.params;
    const resultOrError = await this.queryHandler.handle({
      id: fruitId as string,
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
