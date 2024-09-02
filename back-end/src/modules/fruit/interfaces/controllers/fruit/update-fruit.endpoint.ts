import { BaseController, Controller, Put } from "@shared/interface";

import {
  FruitNotFoundException,
  FruitAlreadyExistsException,
  UpdateFruitCommandHandler,
} from "@modules/fruit/application";
import { FruitInvalidException } from "@modules/fruit/domain/exceptions";

import { Context } from "elysia";

import { FruitRequestDto } from "../../dtos";

type IndexRoute = {
  params: {
    id: string;
  };
  body: {
    name: string;
    varieties: {
      name: string;
    }[];
  };
};

@Controller("/fruits", "Fruits")
export class UpdateFruitEndpoint extends BaseController {
  constructor(private readonly commandHandler: UpdateFruitCommandHandler) {
    super();
  }

  @Put({
    path: "/",
    description: "Update a fruit",
    body: FruitRequestDto,
  })
  async index(ctx: Context<IndexRoute>) {
    const { id } = ctx.params;
    const { name, varieties } = ctx.body;
    const resultOrError = await this.commandHandler.handle({
      id,
      name,
      varieties,
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
