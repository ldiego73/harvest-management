import { BaseController, Controller, Get } from "@shared/interface";

import {
  FindByIdFruitQueryHandler,
  FruitNotFoundException,
} from "@modules/fruit/application";

import { Context } from "elysia";

type IndexRoute = {
  params: {
    id: string;
  };
};

@Controller("/fruits", "Fruits")
export class FindByIdFruitEndpoint extends BaseController {
  constructor(private readonly commandHandler: FindByIdFruitQueryHandler) {
    super();
  }

  @Get({
    path: "/:id",
    description: "Find a fruit by id",
  })
  async index(ctx: Context<IndexRoute>) {
    const { id } = ctx.params;
    const resultOrError = await this.commandHandler.handle({
      id,
    });

    if (resultOrError.isErr()) {
      const error = resultOrError.error;

      if (error instanceof FruitNotFoundException) {
        return this.notFound(error.code, error.message);
      }

      return this.internalServerError(error.code, error.message);
    }

    ctx.set.status = 200;
    ctx.set.headers["Content-Type"] = "application/json";

    return resultOrError.value;
  }
}
