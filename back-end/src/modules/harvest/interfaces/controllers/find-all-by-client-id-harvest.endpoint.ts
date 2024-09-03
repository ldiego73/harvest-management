import { BaseController, Controller, Get } from "@shared/interface";

import { Context } from "elysia";

import { HarvestsListResponseDto } from "../dtos";
import { FindAllByClientIdQueryHandler } from "../../application";

type IndexRoute = {
  params: {
    clientId: string;
  };
};

@Controller("/harvests", "Harvests")
export class FindAllByClientIdHarvestEndpoint extends BaseController {
  constructor(private readonly queryHandler: FindAllByClientIdQueryHandler) {
    super();
  }

  @Get({
    path: "/client/:clientId",
    description: "Find all by client id",
    response: HarvestsListResponseDto,
  })
  async index(ctx: Context<IndexRoute>) {
    const { clientId } = ctx.query;
    const resultOrError = await this.queryHandler.handle({
      id: clientId as string,
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
