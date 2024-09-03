import { BaseController, Controller, Get } from "@shared/interface";

import { Context } from "elysia";

import { HarvestsListResponseDto } from "../dtos";
import { FindAllByDatesQueryHandler } from "../../application";

type IndexRoute = {
  params: {
    startDate: string;
    endDate: string;
  };
};

@Controller("/harvests", "Harvests")
export class FindAllByDatesHarvestEndpoint extends BaseController {
  constructor(private readonly queryHandler: FindAllByDatesQueryHandler) {
    super();
  }

  @Get({
    path: "/dates/:startDate/:endDate",
    description: "Find all by dates",
    response: HarvestsListResponseDto,
  })
  async index(ctx: Context<IndexRoute>) {
    const { startDate, endDate } = ctx.params;
    const resultOrError = await this.queryHandler.handle({
      startDate: new Date(startDate),
      endDate: new Date(endDate),
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
      id: harvest.id.toValue(),
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
