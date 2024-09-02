import { BaseController, Controller, Get } from "@shared/interface";
import { FindByIdQueryHandler } from "@modules/client/application";

import { Context } from "elysia";

import { ClientIdParamsDto, ClientResponseDto } from "../dtos";
import { QueryHandlerException } from "@shared/application";

type IndexRoute = {
  params: {
    id: string;
  };
};

@Controller("/clients", "Clients")
export class FindByIdEndpoint extends BaseController {
  constructor(private readonly queryHandler: FindByIdQueryHandler) {
    super();
  }

  @Get({
    path: "/:id",
    description: "Find by id",
    params: ClientIdParamsDto,
    response: ClientResponseDto,
  })
  async index(ctx: Context<IndexRoute>) {
    const clientOrError = await this.queryHandler.handle({
      id: ctx.params.id,
    });

    if (clientOrError.isErr()) {
      if (clientOrError.error instanceof QueryHandlerException) {
        this.internalServerError(
          clientOrError.error.code,
          clientOrError.error.message,
        );
      }

      this.notFound(clientOrError.error.code, clientOrError.error.message);
    }

    ctx.set.headers["content-type"] = "application/json";

    const client = clientOrError.value;

    return {
      id: client.id.toString(),
      email: client.email.value,
      name: client.name,
      lastName: client.lastName,
    };
  }
}
