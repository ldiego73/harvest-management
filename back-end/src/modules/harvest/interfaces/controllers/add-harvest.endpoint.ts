import { BaseController, Controller, Post } from "@shared/interface";
import {
  AddHarvestCommandHandler,
  HarvestNotFoundException,
} from "@modules/harvest/application";
import { HarvestInvalidException } from "@modules/harvest/domain/exceptions";

import { Context } from "elysia";
import { HarvestRequestDto } from "../dtos";

type IndexRoute = {
  body: {
    fruitId: string;
    varietyId: string;
    farmerId: string;
    fieldId: string;
    clientId: string;
    quantity: number;
    date: string;
  };
};

@Controller("/harvests", "Harvests")
export class AddHarvestEndpoint extends BaseController {
  constructor(private readonly commandHandler: AddHarvestCommandHandler) {
    super();
  }

  @Post({ path: "/", description: "Add a harvest", body: HarvestRequestDto })
  async index(ctx: Context<IndexRoute>) {
    const { fruitId, varietyId, farmerId, fieldId, clientId, quantity, date } =
      ctx.body;
    const resultOrError = await this.commandHandler.handle({
      fruitId,
      varietyId,
      farmerId,
      fieldId,
      clientId,
      quantity,
      date: new Date(date),
    });

    if (resultOrError.isErr()) {
      const error = resultOrError.error;

      if (error instanceof HarvestNotFoundException) {
        return this.notFound(error.code, error.message);
      }

      if (error instanceof HarvestInvalidException) {
        return this.unprocessableEntity(error.code, error.message);
      }

      return this.internalServerError(error.code, error.message);
    }

    ctx.set.status = 201;
  }
}
