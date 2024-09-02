import { BaseController, Controller, Post } from "@shared/interface";

import {
  AddVarietyCommandHandler,
  FruitAlreadyExistsException,
} from "@modules/fruit/application";
import { FruitInvalidException } from "@modules/fruit/domain/exceptions";

import { Context } from "elysia";

import { VarietyRequestDto } from "../../dtos";

type IndexRoute = {
  body: {
    name: string;
    fruitId: string;
  };
};

@Controller("/varieties", "Varieties")
export class AddVarietyEndpoint extends BaseController {
  constructor(private readonly commandHandler: AddVarietyCommandHandler) {
    super();
  }

  @Post({
    path: "/",
    description: "Add a variety",
    body: VarietyRequestDto,
  })
  async index(ctx: Context<IndexRoute>) {
    const { name, fruitId } = ctx.body;
    const resultOrError = await this.commandHandler.handle({
      name,
      fruitId,
    });

    if (resultOrError.isErr()) {
      const error = resultOrError.error;

      if (error instanceof FruitAlreadyExistsException) {
        return this.conflict(error.code, error.message);
      }

      if (error instanceof FruitInvalidException) {
        return this.unprocessableEntity(error.code, error.message);
      }

      return this.internalServerError(error.code, error.message);
    }

    ctx.set.status = 201;
  }
}
