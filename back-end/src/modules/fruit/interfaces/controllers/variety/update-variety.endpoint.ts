import { BaseController, Controller, Put } from "@shared/interface";

import {
  FruitNotFoundException,
  FruitAlreadyExistsException,
  UpdateVarietyCommandHandler,
} from "@modules/fruit/application";
import { FruitInvalidException } from "@modules/fruit/domain/exceptions";

import { Context } from "elysia";

import { VarietyRequestDto } from "../../dtos";

type IndexRoute = {
  params: {
    id: string;
  };
  body: {
    name: string;
    fruitId: string;
  };
};

@Controller("/varieties", "Varieties")
export class UpdateVarietyEndpoint extends BaseController {
  constructor(private readonly commandHandler: UpdateVarietyCommandHandler) {
    super();
  }

  @Put({
    path: "/",
    description: "Update a variety",
    body: VarietyRequestDto,
  })
  async index(ctx: Context<IndexRoute>) {
    const { id } = ctx.params;
    const { name, fruitId } = ctx.body;
    const resultOrError = await this.commandHandler.handle({
      id,
      name,
      fruitId,
    });

    if (resultOrError.isErr()) {
      const error = resultOrError.error;

      if (error instanceof FruitAlreadyExistsException) {
        return this.conflict(error.code, error.message);
      }

      if (error instanceof FruitNotFoundException) {
        return this.notFound(error.code, error.message);
      }

      if (error instanceof FruitInvalidException) {
        return this.unprocessableEntity(error.code, error.message);
      }

      return this.internalServerError(error.code, error.message);
    }

    ctx.set.status = 200;
  }
}
