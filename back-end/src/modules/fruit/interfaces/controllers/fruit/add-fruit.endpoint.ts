import { BaseController, Controller, Post } from "@shared/interface";

import {
  AddFruitCommandHandler,
  FruitAlreadyExistsException,
} from "@modules/fruit/application";
import {
  FruitInvalidException,
  VarietyInvalidException,
} from "@modules/fruit/domain/exceptions";

import { Context } from "elysia";

type IndexRoute = {
  body: {
    name: string;
    varieties: {
      name: string;
    }[];
  };
};

@Controller("/fruits", "Fruits")
export class AddFruitEndpoint extends BaseController {
  constructor(private readonly commandHandler: AddFruitCommandHandler) {
    super();
  }

  @Post({ path: "/", description: "Add a fruit" })
  async index(ctx: Context<IndexRoute>) {
    const { name, varieties } = ctx.body;
    const resultOrError = await this.commandHandler.handle({
      name,
      varieties,
    });

    if (resultOrError.isErr()) {
      const error = resultOrError.error;

      if (error instanceof FruitAlreadyExistsException) {
        return this.conflict(error.code, error.message);
      }

      if (
        error instanceof FruitInvalidException ||
        error instanceof VarietyInvalidException
      ) {
        return this.badRequest(error.code, error.message);
      }

      return this.internalServerError(
        resultOrError.error.code,
        resultOrError.error.message,
      );
    }

    ctx.set.status = 201;
  }
}
