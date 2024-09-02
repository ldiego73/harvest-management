import { BaseController, Controller, Put } from "@shared/interface";
import {
  UpdateClientCommandHandler,
  ClientNotFoundException,
  ClientAlreadyExistsException,
} from "@modules/client/application";
import { ClientInvalidException } from "@modules/client/domain/exceptions";
import { EmailInvalidException } from "@shared/domain/value-objects";

import { Context } from "elysia";

import { ClientRequestDto, ClientIdParamsDto } from "../dtos";

type IndexRoute = {
  body: {
    email: string;
    name: string;
    lastName: string;
  };
  params: {
    id: string;
  };
};
@Controller("/clients", "Clients")
export class UpdateClientEndpoint extends BaseController {
  constructor(
    private readonly updateClientCommandHandler: UpdateClientCommandHandler,
  ) {
    super();
  }

  @Put({
    path: "/:id",
    description: "Update a client",
    body: ClientRequestDto,
    params: ClientIdParamsDto,
  })
  async index(ctx: Context<IndexRoute>) {
    const { email, name, lastName } = ctx.body;
    const { id } = ctx.params;

    const resultOrError = await this.updateClientCommandHandler.handle({
      id,
      email,
      name,
      lastName,
    });

    if (resultOrError.isErr()) {
      const error = resultOrError.error;

      if (error instanceof ClientNotFoundException) {
        return this.notFound(error.code, error.message);
      }

      if (
        error instanceof ClientAlreadyExistsException ||
        error instanceof EmailInvalidException ||
        error instanceof ClientInvalidException
      ) {
        return this.badRequest(error.code, error.message);
      }

      return this.internalServerError(
        resultOrError.error.code,
        resultOrError.error.message,
      );
    }

    ctx.set.status = 204;

    return;
  }
}
