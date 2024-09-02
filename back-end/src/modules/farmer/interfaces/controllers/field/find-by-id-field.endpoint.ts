import { BaseController, Controller, Get } from "@shared/interface";

import { FieldResponseDto } from "@modules/farmer/interfaces/dtos";
import {
  FindByIdFieldHandler,
  FieldNotFoundException,
} from "@modules/farmer/application";

import { Context } from "elysia";

type IndexRoute = {
  params: {
    id: string;
  };
};

@Controller("/fields", "Fields")
export class FindByIdFieldEndpoint extends BaseController {
  constructor(private readonly queryhandler: FindByIdFieldHandler) {
    super();
  }

  @Get({
    path: "/:id",
    description: "Find by id",
    response: FieldResponseDto,
  })
  async index(ctx: Context<IndexRoute>) {
    const fieldOrError = await this.queryhandler.handle({
      id: ctx.params.id as string,
    });

    if (fieldOrError.isErr()) {
      const error = fieldOrError.error;

      if (error instanceof FieldNotFoundException) {
        return this.notFound(error.code, error.message);
      }

      return this.internalServerError(error.code, error.message);
    }

    const field = fieldOrError.value;

    ctx.set.status = 200;
    ctx.set.headers["Content-Type"] = "application/json";

    return {
      id: field.id.toValue(),
      name: field.name,
      location: field.location,
    };
  }
}
