import { BaseController, Controller, Get } from "@shared/interface";

import {
  FindByNameAndLocationFieldHandler,
  FieldNotFoundException,
} from "@modules/farmer/application";
import { FieldResponseDto } from "@modules/farmer/interfaces/dtos";

import { Context } from "elysia";

type IndexRoute = {
  params: {
    name: string;
    location: string;
  };
};

@Controller("/fields", "Fields")
export class FindByNameAndLocationFieldEndpoint extends BaseController {
  constructor(
    private readonly queryhandler: FindByNameAndLocationFieldHandler,
  ) {
    super();
  }

  @Get({
    path: "/name/:name/location/:location",
    description: "Find by name and location",
    response: {
      200: FieldResponseDto,
    },
  })
  async index(ctx: Context<IndexRoute>) {
    const fieldOrError = await this.queryhandler.handle({
      name: ctx.params.name as string,
      location: ctx.params.location as string,
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
