import { BaseController, Controller, Get } from "@shared/interface";

import {
  FindByIdVarietyQueryHandler,
  VarietyNotFoundException,
} from "@modules/fruit/application";

import { Context } from "elysia";

type IndexRoute = {
  params: {
    id: string;
  };
};

@Controller("/varieties", "Varieties")
export class FindByIdVarietyEndpoint extends BaseController {
  constructor(private readonly commandHandler: FindByIdVarietyQueryHandler) {
    super();
  }

  @Get({
    path: "/:id",
    description: "Find a variety by id",
  })
  async index(ctx: Context<IndexRoute>) {
    const { id } = ctx.params;
    const resultOrError = await this.commandHandler.handle({
      id,
    });

    if (resultOrError.isErr()) {
      const error = resultOrError.error;

      if (error instanceof VarietyNotFoundException) {
        return this.notFound(error.code, error.message);
      }

      return this.internalServerError(error.code, error.message);
    }

    ctx.set.status = 200;
    ctx.set.headers["Content-Type"] = "application/json";

    return {
      id: resultOrError.value.id.toValue(),
      name: resultOrError.value.name,
      fruitId: resultOrError.value.fruitId.toValue(),
    };
  }
}
